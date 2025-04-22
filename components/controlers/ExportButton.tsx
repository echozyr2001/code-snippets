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
    if (element) {
      toPng(element)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `code-snippet-${Date.now()}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error("Error exporting image:", error);
        });
    }
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
