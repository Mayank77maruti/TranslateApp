import { LanguageTranslator } from "@/components/language-translator";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function Home() {
  return (
    <>
    <div>
      
    </div>
      <CopilotKit runtimeUrl="/api/copilotkit">
        <div className="min-h-screen flex items-center justify-center">
          <LanguageTranslator />
        </div>
        <CopilotPopup
          instructions="As a language translator, your role is to assist users in converting text between different languages."
          labels={{
            title: "Translator",
            initial: "Hello! I'm here to assist you. I can help you translate text from one language to another.",
          }}
        />
      </CopilotKit>
    </>
  );
}
