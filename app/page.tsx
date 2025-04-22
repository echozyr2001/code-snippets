import { CodeEditor } from "@/components/CodeEditor";
import LangSelect from "@/components/controlers/LanguageSelect";
import ThemeSelect from "@/components/controlers/ThemeSelect";
import { ExportButton } from "@/components/controlers/ExportButton";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="dark h-screen flex flex-col gap-4 justify-center items-center bg-neutral-950 text-white p-4">
      <CodeEditor id="code-editor" />
      <Card className="p-6 w-fit bg-neutral-900/90 backdrop-blur">
        <CardContent className="flex flex-wrap gap-4 sm:gap-6 p-0">
          <ThemeSelect />
          <LangSelect />
          <div className="place-self-center">
            <ExportButton elementId="code-editor" />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
