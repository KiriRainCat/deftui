import type { ComponentProps, ReactNode } from "react";

import { cn } from "cn";
import { useEffect, useImperativeHandle, useRef, useState } from "react";

import * as CarouselUI from "@/vendor/shadcn/carousel";
import * as LightboxUI from "@/vendor/tailored/lightbox";

export type * from "@/vendor/tailored/lightbox";

export const Lightbox = /* @__PURE__ */ Object.assign(LightboxUI.Lightbox, {
  Trigger: LightboxUI.LightboxTrigger,
  Content: LightboxUI.LightboxContent,
});

export const Carousel = /* @__PURE__ */ Object.assign(CarouselUI.Carousel, {
  Content: CarouselUI.CarouselContent,
  Previous: CarouselUI.CarouselPrevious,
  Next: CarouselUI.CarouselNext,

  Item: CarouselUI.CarouselItem,
});

type ImageStatus = "idle" | "loading" | "loaded" | "error";

export type ImageProps = ComponentProps<"img"> & {
  fallback?: ReactNode;
  placeholder?: ReactNode;
  wrapperClassName?: string;
};

function ImageContent({
  src,
  srcSet,
  sizes,
  ref,
  onLoad,
  onError,
  className,
  placeholder,
  fallback,
  wrapperClassName,
  ...props
}: ImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<ImageStatus>(src || srcSet ? "loading" : "idle");

  useImperativeHandle(ref, () => imageRef.current!, [imageRef]);

  useEffect(() => {
    const image = imageRef.current;
    if (!image || (!src && !srcSet) || !image.complete) return;

    setStatus(image.naturalWidth > 0 ? "loaded" : "error");
  }, [src, srcSet, sizes]);

  return (
    <div className={cn("relative", wrapperClassName)} data-state={status} aria-busy={status === "loading"}>
      <img
        {...props}
        ref={imageRef}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        data-state={status}
        onLoad={(event) => {
          setStatus("loaded");
          onLoad?.(event);
        }}
        onError={(event) => {
          setStatus("error");
          onError?.(event);
        }}
        className={cn("block", status === "error" && fallback != null && "invisible", className)}
      />
      {status === "loading" && placeholder != null && <div className="absolute inset-0 grid place-items-center">{placeholder}</div>}
      {status === "error" && fallback != null && (
        <div role="status" className="absolute inset-0 grid place-items-center">
          {fallback}
        </div>
      )}
    </div>
  );
}

export function Image(props: ImageProps) {
  return <ImageContent key={JSON.stringify([props.src, props.srcSet])} {...props} />;
}
