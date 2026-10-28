import { cn } from "cn";
import { useState } from "react";

import * as CarouselUI from "@/vendor/shadcn/carousel";

function CarouselAST(props: React.ComponentProps<typeof CarouselUI.CarouselContent>) {
  return (
    <Carousel>
      <Carousel.Content {...props} />
      <Carousel.Previous />
      <Carousel.Next />
    </Carousel>
  );
}

export const Carousel = Object.assign(CarouselUI.Carousel, {
  AST: CarouselAST,
  Root: CarouselUI.Carousel,

  Content: CarouselUI.CarouselContent,
  Previous: CarouselUI.CarouselPrevious,
  Next: CarouselUI.CarouselNext,

  Item: CarouselUI.CarouselItem,
});

export function FadeImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      {...props}
      onLoad={(event) => (setLoaded(true), props.onLoad?.(event))}
      className={cn("object-cover transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0", props.className)}
    />
  );
}
