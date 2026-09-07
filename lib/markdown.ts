import "server-only";
import fs from "fs";
import path from "path";

/** A deliberately small Markdown parser for the two legal documents in
 * `content/legal/`.
 *
 * WHY NOT A LIBRARY. These documents use four constructs between them —
 * headings, paragraphs, `- ` bullets and `**bold**` — with no tables,
 * links, images, code, blockquotes or nested lists. `parseMarkdown`
 * asserts that, so anything outside the supported set fails the build
 * rather than being silently dropped. Silently dropping a clause from a
 * legal page is the failure mode that actually matters here, and a
 * general-purpose renderer would hide it behind "best effort" output.
 *
 * Output is React-renderable data, never HTML strings, so the document
 * text is escaped by React and can never inject markup into the page.
 *
 * If a future document needs links or tables, add them here with the same
 * assert-don't-drop discipline, or switch to a real Markdown pipeline —
 * but do not let unsupported syntax pass through unrendered. */

export type InlineNode =
  | { type: "text"; value: string }
  | { type: "strong"; value: string }
  /** `[like this]` — an unresolved blank in the source document. Rendered
   * conspicuously so it cannot go unnoticed on a live legal page. */
  | { type: "placeholder"; value: string };

export type Block =
  | { type: "heading"; level: 2; text: InlineNode[] }
  | { type: "paragraph"; text: InlineNode[] }
  | { type: "list"; items: InlineNode[][] };

export type LegalDocument = {
  /** The `# ` heading, used as the page's own <h1>. */
  title: string;
  blocks: Block[];
  /** Every unresolved `[...]` blank found, for the build-time report. */
  placeholders: string[];
};

const UNSUPPORTED = [
  { re: /^\s*>/, name: "blockquote" },
  { re: /^\s*```/, name: "code fence" },
  { re: /^\s*\|/, name: "table" },
  { re: /^\s*\d+\.\s/, name: "ordered list" },
  { re: /!\[[^\]]*\]\(/, name: "image" },
  // A markdown link is `[text](url)`; a bare `[blank]` is a placeholder,
  // so only flag the bracket-paren pair.
  { re: /\[[^\]]*\]\(/, name: "link" },
];

function parseInline(raw: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  // Split on **bold** and [placeholder] while keeping the delimiters.
  const parts = raw.split(/(\*\*[^*]+\*\*|\[[^\]]+\])/g);

  for (const part of parts) {
    if (!part) continue;

    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      // `**[48 hours]**` — bold wrapping a blank. The blank wins, since
      // the point is to surface it.
      if (inner.startsWith("[") && inner.endsWith("]")) {
        nodes.push({ type: "placeholder", value: inner.slice(1, -1) });
      } else {
        nodes.push({ type: "strong", value: inner });
      }
      continue;
    }

    if (part.startsWith("[") && part.endsWith("]")) {
      nodes.push({ type: "placeholder", value: part.slice(1, -1) });
      continue;
    }

    nodes.push({ type: "text", value: part });
  }

  return nodes;
}

export function parseMarkdown(source: string, label: string): LegalDocument {
  const lines = source.replace(/\r\n/g, "\n").split("\n");

  for (const [i, line] of lines.entries()) {
    for (const { re, name } of UNSUPPORTED) {
      if (re.test(line)) {
        throw new Error(
          `[markdown] ${label}:${i + 1} uses an unsupported construct (${name}). ` +
            `lib/markdown.ts only handles headings, paragraphs, bullets and bold — ` +
            `extend it rather than letting the content render incorrectly.`,
        );
      }
    }
  }

  let title = "";
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push({ type: "paragraph", text: parseInline(paragraph.join(" ")) });
    paragraph = [];
  };
  const flushList = () => {
    if (list.length === 0) return;
    blocks.push({ type: "list", items: list.map(parseInline) });
    list = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === "") {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed.startsWith("# ")) {
      flushParagraph();
      flushList();
      title = trimmed.slice(2).trim();
      continue;
    }

    // Every other heading level renders as an h2: these documents only use
    // `##`, and the page supplies the single h1 itself, so promoting or
    // skipping levels here would break the one-h1 / no-skipped-levels rule.
    const headingMatch = /^#{2,6}\s+(.*)$/.exec(trimmed);
    if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: 2, text: parseInline(headingMatch[1]) });
      continue;
    }

    const bulletMatch = /^[-*+]\s+(.*)$/.exec(trimmed);
    if (bulletMatch) {
      flushParagraph();
      list.push(bulletMatch[1]);
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  if (!title) {
    throw new Error(`[markdown] ${label} has no "# " title heading.`);
  }

  const placeholders = [...source.matchAll(/\[([^\]]+)\]/g)].map((m) => m[1]);

  return { title, blocks, placeholders };
}

export function loadLegalDocument(slug: string): LegalDocument {
  const filePath = path.join(process.cwd(), "content/legal", `${slug}.md`);
  return parseMarkdown(fs.readFileSync(filePath, "utf8"), `${slug}.md`);
}
