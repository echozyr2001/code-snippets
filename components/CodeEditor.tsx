"use client";

import useStore from "@/app/store";
import type { BundledLanguage, BundledTheme } from "shiki/bundle/web";
import { codeToHast } from "shiki/bundle/web";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { JSX, useLayoutEffect, useState } from "react";

export function CodeEditor({ initial }: { initial?: JSX.Element }) {
  const store = useStore();
  const [nodes, setNodes] = useState(initial);

  useLayoutEffect(() => {
    void highlight(
      'console.log("Rendered on client")',
      store.lang as BundledLanguage,
      store.theme as BundledTheme
    ).then(setNodes);
  }, [store.theme, store.lang]);

  return nodes ?? <p>Loading...</p>;
}

export async function highlight(
  code: string,
  lang: BundledLanguage,
  theme: BundledTheme
) {
  const out = await codeToHast(code, {
    lang,
    theme,
  });

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
  }) as JSX.Element;
}
