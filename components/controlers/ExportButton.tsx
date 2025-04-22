"use client";

import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ExportButtonProps {
  elementId: string;
}

export function ExportButton({ elementId }: ExportButtonProps) {
  const handleExport = () => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const editor = element.querySelector(".shiki-editor") as HTMLElement;
    if (!editor) return;

    // 保存原始样式
    const originalHeight = editor.style.height;
    const originalOverflow = editor.style.overflowY;

    // 临时移除高度限制和滚动
    editor.style.height = "auto";
    editor.style.overflowY = "visible";

    // 等待样式应用
    requestAnimationFrame(() => {
      toPng(element)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `code-snippet-${Date.now()}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error("Error exporting image:", error);
        })
        .finally(() => {
          // 恢复原始样式
          editor.style.height = originalHeight;
          editor.style.overflowY = originalOverflow;
        });
    });
  };

  return (
    <Button
      variant="outline"
      className="gap-2 bg-neutral-800 hover:bg-neutral-700"
      onClick={handleExport}
    >
      <Download className="h-4 w-4" />
      Export
    </Button>
  );
}
