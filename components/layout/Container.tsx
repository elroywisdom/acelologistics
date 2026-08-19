import { clsx } from "@/lib/clsx";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** Override the default 1200px content max-width for sections that use a
   * wider measure in Figma (e.g. the fleet grid at 1280px). */
  maxWidth?: string;
};

export function Container({
  children,
  className,
  maxWidth = "max-w-[1200px]",
}: ContainerProps) {
  return (
    <div
      className={clsx(
        "mx-auto w-full px-6 sm:px-10 lg:px-[100px]",
        maxWidth,
        className,
      )}
    >
      {children}
    </div>
  );
}
