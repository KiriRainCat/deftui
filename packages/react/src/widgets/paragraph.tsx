"use client";

import type { ComponentPropsWithoutRef, CSSProperties } from "react";

import { cn } from "cn";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

const ELLIPSIS = "…";
const segmenter = new Intl.Segmenter();

// Canvas 2D context for text measurement, created lazily.
let canvasCtx: CanvasRenderingContext2D | null = null;

function textWidth(text: string, font: string): number {
  canvasCtx ??= document.createElement("canvas").getContext("2d");
  if (!canvasCtx) return 0;
  canvasCtx.font = font;
  return canvasCtx.measureText(text).width;
}

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

  // A keepEnd past the text's end falls back to the even split, as before.
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

type MiddleView = { head: string; clipped: boolean };

/** The longest head prefix that fits `width` next to the tail and ellipsis. */
function measureMiddle(
  el: HTMLElement,
  width: number,
  children: string,
  keepAfter: TextProps["keepAfter"],
  keepEnd: number | undefined,
): MiddleView {
  const cs = getComputedStyle(el);
  const font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;

  const tail = getTail(children, keepAfter, keepEnd);
  const head = children.slice(0, children.length - tail.length);
  const tailW = textWidth(tail, font);

  if (textWidth(head, font) + tailW <= width) return { head, clipped: false };

  const avail = width - tailW - textWidth(ELLIPSIS, font);
  let lo = 0;
  let hi = head.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (textWidth(head.slice(0, mid), font) <= avail) lo = mid;
    else hi = mid - 1;
  }

  return { head: head.slice(0, lo), clipped: true };
}

/** Text truncation. The middle mode measures in canvas and cuts between characters — no dead zone before the ellipsis, no half-cut glyphs. */
export function Text({ children, truncate, lines, keepEnd, keepAfter, className, style, ...props }: TextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [view, setView] = useState<MiddleView | null>(null);

  const measure = useCallback(
    (width: number) => {
      const el = containerRef.current;
      if (el) setView(measureMiddle(el, width, children, keepAfter, keepEnd));
    },
    [children, keepAfter, keepEnd],
  );

  useLayoutEffect(() => {
    if (truncate !== "middle") return;
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => measure(entry.contentRect.width));
    ro.observe(el);

    // A late webfont changes every width; measure again once it settles.
    void document.fonts?.ready.then(() => {
      const cs = getComputedStyle(el);
      measure(el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight));
    });

    return () => ro.disconnect();
  }, [truncate, measure]);

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
    const head = view?.head ?? children.slice(0, children.length - tail.length);

    return (
      <span ref={containerRef} className={cn("flex min-w-0 items-baseline", className)} style={style} title={children} {...props}>
        <span className="overflow-hidden whitespace-nowrap">{head}</span>
        <span className="shrink-0 whitespace-nowrap">
          {view?.clipped ? ELLIPSIS : null}
          {tail}
        </span>
      </span>
    );
  }

  return (
    <span className={cn("block truncate", className)} style={style} title={children} {...props}>
      {children}
    </span>
  );
}
