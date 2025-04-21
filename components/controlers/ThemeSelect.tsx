"use client";

import useStore from "@/app/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BundledTheme, bundledThemes } from "shiki/bundle/web";

export default function ThemeSelect() {
  const theme = useStore((state) => state.theme);

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Theme
      </label>
      <Select
        value={theme}
        onValueChange={(value: BundledTheme) =>
          useStore.setState({ theme: value })
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select Theme" />
        </SelectTrigger>
        <SelectContent className="dark">
          {Object.keys(bundledThemes)
            .sort((a, b) => a.localeCompare(b))
            .map((theme) => (
              <SelectItem key={theme} value={theme}>
                <div className="flex gap-2 items-center">
                  <span className="capitalize">{theme}</span>
                </div>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
