"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import Image from "next/image";

// interface TextareaProps {
//   // Add necessary members here
//   placeholder?: string;
//   value?: string;
//   onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
//   className?: string;
// }

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "hi", name: "Hindi" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ru", name: "Russian" },
  { code: "pt", name: "Portuguese" },
  { code: "ar", name: "Arabic" },
  { code: "ko", name: "Korean" },
  { code: "nl", name: "Dutch" },
  { code: "tr", name: "Turkish" },
  { code: "pl", name: "Polish" },
  { code: "sv", name: "Swedish" },
  { code: "no", name: "Norwegian" },
  { code: "da", name: "Danish" },
  { code: "fi", name: "Finnish" },
  { code: "th", name: "Thai" },
];

export function LanguageTranslator() {
  const [inputLang, setInputLang] = useState("en");
  const [outputLang, setOutputLang] = useState("hi");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  useCopilotReadable({ description: "Available languages", value: JSON.stringify(languages) });
  useCopilotReadable({ description: "Input language", value: inputLang });
  useCopilotReadable({ description: "Output language", value: outputLang });
  useCopilotReadable({ description: "Input text", value: inputText });

  useCopilotAction({
    name: "Translate",
    description: "Translate input text",
    parameters: [
      { name: "inputLang", description: "Input language code", type: "string" },
      { name: "outputLang", description: "Output language code", type: "string" },
      { name: "inputText", description: "Text to translate", type: "string" },
    ],
    handler: async ({ inputLang, outputLang, inputText }) => {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputLang, outputLang, inputText }),
      });
      const data = await response.json();
      setOutputText(data.outputText);
    }
  });

  const handleTranslate = async () => {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputLang, outputLang, inputText }),
    });
    const data = await response.json();
    setOutputText(data.outputText);
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl bg-white rounded-lg shadow-lg">
      <Image
        src="/translate.jpeg"
        alt="Translation Globe"
        width={367}
        height={137}
        className="shadow-lg w-full mb-6"
      />
      <div className="flex items-center gap-6 mb-8">
        <Image
          src="/logo.png"
          alt="Translation Globe"
          width={120}
          height={120}
          className="shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Welcome to Language Translator</h1>
          <p className="text-gray-600 mt-2">
            Experience effortless communication by translating your text into multiple languages (Almost 20+ languages). 
            Whether you&apos;re traveling, studying, or connecting with friends worldwide, this tool helps 
            you overcome language barriers.
          </p>
        </div>
      </div>
      <div className="p-6 bg-blue-50 rounded-lg shadow-inner">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Select Languages</h2>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <Select value={inputLang} onValueChange={setInputLang}>
            <SelectTrigger className="bg-white text-blue-800 shadow">
              <SelectValue placeholder="Input Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={outputLang} onValueChange={setOutputLang}>
            <SelectTrigger className="bg-white text-blue-800 shadow">
              <SelectValue placeholder="Output Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Enter Your Text</h2>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <Textarea
            placeholder="Type text to translate..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="h-40 p-4 text-gray-800 border border-blue-300 rounded-lg"
          />
          <div
            className="border border-blue-300 rounded-lg p-4 h-40 overflow-auto bg-white text-gray-900 shadow-inner"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setOutputText(e.currentTarget.textContent || "")}
          >
            {outputText}
          </div>
        </div>
        <Button onClick={handleTranslate} className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
          Translate
        </Button>
      </div>
    </div>
  );
}