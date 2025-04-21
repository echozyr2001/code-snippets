"use client";

import useStore from "@/app/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bundledLanguages } from "shiki/bundle/web";

export default function LangSelect() {
  const lang = useStore((state) => state.lang);

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Language
      </label>
      <Select
        value={lang}
        onValueChange={(value) => useStore.setState({ lang: value })}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select Theme" />
        </SelectTrigger>
        <SelectContent className="dark">
          {Object.keys(bundledLanguages).map((lang) => (
            <SelectItem key={lang} value={lang}>
              <div className="flex gap-2 items-center">
                <span className="capitalize">{lang}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
