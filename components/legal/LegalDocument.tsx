import type { Block, InlineNode, LegalDocument as Doc } from "@/lib/markdown";

/** Renders a parsed legal document.
 *
 * Unresolved `[...]` blanks from the source are rendered as a visible
 * warning chip rather than as plain text. A live legal page that reads
 * "Cancellations made more than [48 hours] before..." is worse than one
 * that visibly flags the gap: a customer could reasonably take the
 * bracketed text as the actual policy. The chip makes the gap unmissable
 * to anyone reviewing the page, and the pages carry `noindex` until the
 * blanks are filled (see the route files). */
function Inline({ nodes }: { nodes: InlineNode[] }) {
  return (
    <>
      {nodes.map((node, i) => {
        if (node.type === "strong") {
          return (
            <strong key={i} className="font-normal text-ink">
              {node.value}
            </strong>
          );
        }
        if (node.type === "placeholder") {
          return (
            <mark
              key={i}
              title="This value has not been confirmed yet"
              className="rounded-sm bg-warning/15 px-1.5 py-0.5 text-warning"
            >
              [{node.value}]
            </mark>
          );
        }
        return <span key={i}>{node.value}</span>;
      })}
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  if (block.type === "heading") {
    return (
      <h2 className="mt-10 text-heading-2 font-normal text-ink first:mt-0">
        <Inline nodes={block.text} />
      </h2>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="flex list-disc flex-col gap-2 pl-5 text-body-base leading-[1.7] text-text">
        {block.items.map((item, i) => (
          <li key={i}>
            <Inline nodes={item} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className="text-body-base leading-[1.7] text-text">
      <Inline nodes={block.text} />
    </p>
  );
}

export function LegalDocumentView({ doc }: { doc: Doc }) {
  return (
    <article className="flex max-w-[760px] flex-col gap-5">
      {doc.blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </article>
  );
}
