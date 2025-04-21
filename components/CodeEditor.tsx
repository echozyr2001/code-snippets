"use client";

import useStore from "@/app/store";
import type { BundledLanguage } from "shiki/bundle/web";
import { codeToHast } from "shiki/bundle/web";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { JSX, useLayoutEffect, useState } from "react";

export function CodeEditor({ initial }: { initial?: JSX.Element }) {
  const store = useStore();
  const [nodes, setNodes] = useState(initial);

  useLayoutEffect(() => {
    void highlight('console.log("Rendered on client")', "ts", store.theme).then(
      setNodes
    );
  }, [store.theme]);

  return nodes ?? <p>Loading...</p>;
}

export async function highlight(
  code: string,
  lang: BundledLanguage,
  theme: string
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
