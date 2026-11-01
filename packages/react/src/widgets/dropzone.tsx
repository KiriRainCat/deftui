"use client";

import type { ComponentProps } from "react";
import type { DropzoneOptions } from "react-dropzone";

import { cn } from "cn";
import { UploadIcon } from "lucide-react";
import { useId, useImperativeHandle } from "react";
import { useDropzone } from "react-dropzone";

import { buttonVariants } from "@/vendor/shadcn/button";

type DropzoneProps = DropzoneOptions & Omit<ComponentProps<"div">, keyof DropzoneOptions>;

export function formatSize(bytes: number) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  const index = bytes > 0 ? Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1) : 0;
  return `${Number((bytes / 1024 ** index).toFixed(1))} ${units[index]}`;
}

export function Dropzone({
  accept,
  minSize,
  maxSize,
  maxFiles,
  multiple,
  disabled,
  preventDropOnDocument,
  noClick,
  noKeyboard,
  noDrag,
  noDragEventsBubbling,
  noPaste,
  onDrop,
  onDropAccepted,
  onDropRejected,
  onDragEnter,
  onDragOver,
  onDragLeave,
  getFilesFromEvent,
  onFileDialogCancel,
  onFileDialogOpen,
  onError,
  validator,
  getErrorMessage,
  useFsAccessApi,
  autoFocus,
  children,
  className,
  ref,
  ...props
}: DropzoneProps) {
  const { getRootProps, getInputProps, rootRef, isDragActive, isDragReject, isProcessing } = useDropzone({
    accept,
    minSize,
    maxSize,
    maxFiles,
    multiple,
    disabled,
    preventDropOnDocument,
    noClick,
    noKeyboard,
    noDrag,
    noDragEventsBubbling,
    noPaste,
    onDrop,
    onDropAccepted,
    onDropRejected,
    onDragEnter,
    onDragOver,
    onDragLeave,
    getFilesFromEvent,
    onFileDialogCancel,
    onFileDialogOpen,
    onError,
    validator,
    getErrorMessage,
    useFsAccessApi,
    autoFocus,
  });

  useImperativeHandle(ref, () => rootRef.current as HTMLDivElement);

  const descriptionId = useId();

  const limits = [
    multiple === false ? "单个文件" : maxFiles && maxFiles > 0 ? `最多 ${maxFiles} 个文件` : undefined,
    maxSize !== undefined && Number.isFinite(maxSize) ? `每个不超过 ${formatSize(maxSize)}` : undefined,
  ].filter(Boolean);

  return (
    <div
      {...getRootProps({
        "role": "button",
        "aria-label": children == null ? "选择文件" : undefined,
        "data-slot": "dropzone",
        "data-state": isDragReject ? "reject" : isDragActive ? "active" : "idle",
        "data-disabled": disabled || undefined,
        ...props,
        "aria-describedby":
          children == null ? [props["aria-describedby"], descriptionId].filter(Boolean).join(" ") : props["aria-describedby"],
        "aria-busy": isProcessing || props["aria-busy"],
        "className": cn(
          "bg-background hover:bg-muted/30 focus-visible:border-ring focus-visible:ring-ring/50 data-[state=active]:border-ring data-[state=active]:bg-muted/50 data-[state=reject]:border-destructive data-[state=reject]:bg-destructive/5 data-[disabled]:hover:bg-background flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-6 text-center text-sm transition-colors outline-none focus-visible:ring-3 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
          className,
        ),
      })}
    >
      <input {...getInputProps({ disabled, "aria-hidden": true })} />
      {children ?? (
        <>
          <span data-slot="dropzone-icon" className="text-muted-foreground mb-2 grid size-11 place-items-center rounded-full border">
            <UploadIcon aria-hidden="true" className="size-5" />
          </span>

          <p data-slot="dropzone-title" className="font-medium">
            {isDragReject ? "暂不支持这些文件" : isDragActive ? "松开以添加文件" : "将文件拖到此处"}
          </p>

          <p id={descriptionId} data-slot="dropzone-description" className="text-muted-foreground mt-1 text-xs">
            或点击选择{limits.length > 0 && `（${limits.join("，")}）`}
          </p>

          {/* The root owns click and keyboard handling, so this action stays non-interactive. */}
          <span data-slot="dropzone-action" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4")}>
            选择文件
          </span>
        </>
      )}
    </div>
  );
}
