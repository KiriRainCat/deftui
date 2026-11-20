import type { ComponentPropsWithoutRef, CSSProperties } from "react";

import { cn } from "cn";

const segmenter = new Intl.Segmenter();

/** The tail from the last `separator` on, e.g. keepAfter "." keeps ".xlsx". */
function tailFromSeparator(text: string, separator: string): string | undefined {
  const at = text.lastIndexOf(separator);
  return at > 0 ? text.slice(at) : undefined;
}

/** The fixed tail of a middle truncation. */
function getTail(text: string, keepAfter: TextProps["keepAfter"], keepEnd: number | undefined): string {
  if (keepAfter !== undefined) {
    const tail = typeof keepAfter === "function" ? keepAfter(text) : tailFromSeparator(text, keepAfter);
    if (tail && tail !== text && text.endsWith(tail)) return tail;
  }

  const graphemes = Array.from(segmenter.segment(text), (s) => s.segment);

  // A `keepEnd` past the text's end falls back to the even split.
  const keep = keepEnd !== undefined && keepEnd > 0 && keepEnd < graphemes.length ? keepEnd : Math.floor(graphemes.length / 2);
  const tail = graphemes.slice(-keep).join("");
  return tail && tail !== text ? tail : "";
}

export type TextProps = Omit<ComponentPropsWithoutRef<"span">, "children"> & {
  /** The text content to display. */
  children: string;

  /**
   * @kind `end` ends an overflowing line with "…".
   * @kind `middle` keeps the tail and squeezes the head.
   * @default "end"
   */
  truncate?: "end" | "middle";

  /** Anchor the middle-truncation tail at the last `separator` (e.g. "." keeps ".xlsx"); a function returns the tail itself, `undefined` = no match. */
  keepAfter?: string | ((text: string) => string | undefined);

  /** Keep at least this many graphemes at the end when no `keepAfter` matches. */
  keepEnd?: number;

  /** Clamp to at most this many lines, ending the last one with "…". Takes precedence over `truncate`. */
  lines?: number;
};

/** One-line or clamped text truncation. */
export function Text({ children, truncate, lines, keepEnd, keepAfter, className, style, ...props }: TextProps) {
  if (lines !== undefined) {
    return (
      <span
        className={cn("line-clamp-(--text-lines)", className)}
        style={{ "--text-lines": String(lines), ...style } as CSSProperties}
        title={children}
        {...props}
      >
        {children}
      </span>
    );
  }

  if (truncate === "middle") {
    const tail = getTail(children, keepAfter, keepEnd);
    const head = children.slice(0, children.length - tail.length);

    return (
      <span className={cn("flex min-w-0 items-baseline", className)} title={children} {...props}>
        <span className="truncate">{head}</span>
        <span className="shrink-0 whitespace-nowrap">{tail}</span>
      </span>
    );
  }

  return (
    <span className={cn("block truncate", className)} title={children} {...props}>
      {children}
    </span>
  );
}
