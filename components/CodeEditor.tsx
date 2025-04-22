"use client";

import useStore from "@/app/store";
import type { BundledLanguage, BundledTheme } from "shiki/bundle/web";
import { codeToHast } from "shiki/bundle/web";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { JSX, useLayoutEffect, useState } from "react";
import Editor from "react-simple-code-editor";

export function CodeEditor({
  initial,
  id,
}: {
  initial?: JSX.Element;
  id?: string;
}) {
  const store = useStore();
  const [nodes, setNodes] = useState(initial);

  useLayoutEffect(() => {
    void highlight(
      store.code,
      store.lang as BundledLanguage,
      store.theme as BundledTheme
    ).then(setNodes);
  }, [store.theme, store.lang, store.code]);

  return (
    <div
      id={id}
      className="border-2 rounded-xl shadow-2xl bg-black/75 border-gray-600/40"
    >
      <header className="grid grid-cols-6 gap-3 items-center px-4 py-3">
        <div className="flex gap-1.5">
          <div className="rounded-full h-2 w-2 bg-red-500"></div>
          <div className="rounded-full h-2 w-2 bg-yellow-500"></div>
          <div className="rounded-full h-2 w-2 bg-green-500"></div>
        </div>
        <div className="col-span-4 flex justify-center">
          <input
            type="text"
            value={store.title}
            onChange={(e) => useStore.setState({ title: e.target.value })}
            spellCheck={false}
            // onClick={(e) => e.target.select()}
            className="bg-transparent text-center text-gray-400 text-sm font-medium focus:outline-none"
          />
        </div>
      </header>

      <div className="px-4 pb-4 shiki-editor">
        <Editor
          value={store.code}
          onValueChange={(code) => {
            useStore.setState({ code });
            void highlight(
              code,
              store.lang as BundledLanguage,
              store.theme as BundledTheme
            ).then(setNodes);
          }}
          highlight={() => nodes || <Fragment />}
          textareaClassName="focus:outline-none"
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            backgroundColor: "transparent",
          }}
          padding={10}
        />
      </div>
    </div>
  );
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
