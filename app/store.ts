import { BundledLanguage, BundledTheme } from "shiki/bundle/web";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  code: string;
  lang: BundledLanguage;
  title: string;
  theme: BundledTheme;
}

const useStore = create(
  persist<StoreState>(
    () => ({
      code: 'int main() {\n printf("Hello, World!");\n  return 0;\n}',
      lang: "c",
      title: "main",
      theme: "andromeeda",
    }),
    {
      name: "store",
    }
  )
);

export default useStore;
