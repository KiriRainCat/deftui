import type { ComponentProps } from "react";

export type Options<V extends string> = readonly { label: string; value: V; disabled?: boolean }[];

export type OnValueChange = ((value: unknown, eventDetails: unknown) => void) | undefined;

export type InputControlProps = Pick<ComponentProps<"input">, "id" | "aria-invalid" | "aria-describedby">;
