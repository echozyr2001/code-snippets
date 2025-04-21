import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  code: string;
  lang: string;
  title: string;
  theme: string;
}

const useStore = create(
  persist<StoreState>(
    () => ({
      code: "",
      lang: "ts",
      title: "",
      theme: "andromeeda",
    }),
    {
      name: "store",
    }
  )
);

export default useStore;
