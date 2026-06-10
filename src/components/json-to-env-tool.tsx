"use client";

import { useState, useCallback } from "react";
import { ArrowLeftRight, Copy, Download, RotateCcw, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ToolEvents } from "@/lib/analytics";

type Mode = "json-to-env" | "env-to-json";

function flattenJson(
  obj: Record<string, unknown>,
  prefix = "",
  result: Record<string, string> = {}
): Record<string, string> {
  for (const key of Object.keys(obj)) {
    const envKey = prefix ? `${prefix}_${key.toUpperCase()}` : key.toUpperCase();
    const value = obj[key];
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      flattenJson(value as Record<string, unknown>, envKey, result);
    } else if (Array.isArray(value)) {
      result[envKey] = JSON.stringify(value);
    } else {
      result[envKey] = String(value ?? "");
    }
  }
  return result;
}

function quoteIfNeeded(value: string): string {
  if (value === "") return '""';
  if (/[\s#"'\\$`]/.test(value)) {
    return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return value;
}

function jsonToEnv(input: string): { output: string; error: string | null } {
  try {
    const parsed = JSON.parse(input);
    if (typeof parsed !== "object" || Array.isArray(parsed) || parsed === null) {
      return { output: "", error: "Input must be a JSON object (not an array or primitive)." };
    }
    const flat = flattenJson(parsed as Record<string, unknown>);
    const lines = Object.entries(flat).map(([k, v]) => `${k}=${quoteIfNeeded(v)}`);
    return { output: lines.join("\n"), error: null };
  } catch {
    return { output: "", error: "Invalid JSON. Please check your input." };
  }
}

function envToJson(input: string): { output: string; error: string | null } {
  try {
    const result: Record<string, string> = {};
    const lines = input.split("\n");
    for (const raw of lines) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eqIdx = line.indexOf("=");
      if (eqIdx === -1) continue;
      const key = line.slice(0, eqIdx).trim();
      let value = line.slice(eqIdx + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      result[key] = value;
    }
    return { output: JSON.stringify(result, null, 2), error: null };
  } catch {
    return { output: "", error: "Failed to parse .env content." };
  }
}

const JSON_PLACEHOLDER = `{
  "app": {
    "name": "My Application",
    "port": 3000,
    "debug": true
  },
  "database": {
    "host": "localhost",
    "port": 5432,
    "name": "mydb"
  },
  "secret_key": "super-secret-value"
}`;

const ENV_PLACEHOLDER = `APP_NAME=My Application
APP_PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=mydb
SECRET_KEY=super-secret-value`;

export function JsonToEnvTool() {
  const [mode, setMode] = useState<Mode>("json-to-env");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const convert = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }
    const result = mode === "json-to-env" ? jsonToEnv(input) : envToJson(input);
    setOutput(result.output);
    setError(result.error);
    if (!result.error) {
      ToolEvents.toolUsed(mode);
    }
  }, [input, mode]);

  const handleSwitch = useCallback(() => {
    const next: Mode = mode === "json-to-env" ? "env-to-json" : "json-to-env";
    setMode(next);
    setInput("");
    setOutput("");
    setError(null);
  }, [mode]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    ToolEvents.resultCopied();
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const ext = mode === "json-to-env" ? ".env" : ".json";
    const mime = mode === "json-to-env" ? "text/plain" : "application/json";
    const blob = new Blob([output], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = mode === "json-to-env" ? ".env" : "output.json";
    a.click();
    URL.revokeObjectURL(url);
    ToolEvents.resultExported(ext);
  }, [output, mode]);

  const handleReset = useCallback(() => {
    setInput("");
    setOutput("");
    setError(null);
  }, []);

  const loadExample = useCallback(() => {
    setInput(mode === "json-to-env" ? JSON_PLACEHOLDER : ENV_PLACEHOLDER);
    setOutput("");
    setError(null);
  }, [mode]);

  const inputLabel = mode === "json-to-env" ? "JSON Input" : ".env Input";
  const outputLabel = mode === "json-to-env" ? ".env Output" : "JSON Output";
  const inputPlaceholder =
    mode === "json-to-env"
      ? '{\n  "key": "value",\n  "nested": {\n    "key": "value"\n  }\n}'
      : "KEY=value\nNESTED_KEY=value";

  return (
    <div className="space-y-4">
      {/* Mode bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-xl bg-muted/50 border border-border/50 p-1">
          <button
            onClick={() => { setMode("json-to-env"); setInput(""); setOutput(""); setError(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === "json-to-env"
                ? "bg-background text-foreground shadow-sm border border-border/50"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            JSON → .env
          </button>
          <button
            onClick={() => { setMode("env-to-json"); setInput(""); setOutput(""); setError(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === "env-to-json"
                ? "bg-background text-foreground shadow-sm border border-border/50"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            .env → JSON
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={loadExample}>
            Load Example
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {/* Panels */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">{inputLabel}</label>
            <span className="text-xs text-muted-foreground">
              {input.trim().split("\n").filter(Boolean).length} lines
            </span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={inputPlaceholder}
            spellCheck={false}
            className="w-full h-72 rounded-xl border border-border/60 bg-muted/30 p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand/50 transition-colors placeholder:text-muted-foreground/50"
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">{outputLabel}</label>
            {output && (
              <span className="text-xs text-muted-foreground">
                {output.split("\n").filter(Boolean).length} lines
              </span>
            )}
          </div>
          <div className="relative">
            <textarea
              readOnly
              value={error ? "" : output}
              placeholder={error ?? "Output will appear here…"}
              spellCheck={false}
              className={`w-full h-72 rounded-xl border p-4 font-mono text-sm resize-none focus:outline-none transition-colors ${
                error
                  ? "border-destructive/60 bg-destructive/5 text-destructive placeholder:text-destructive/60"
                  : "border-border/60 bg-muted/30 placeholder:text-muted-foreground/50"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          onClick={convert}
          size="lg"
          className="gap-2 bg-gradient-to-r from-brand to-brand-accent text-white shadow-lg shadow-brand/25 px-8"
        >
          <ArrowLeftRight className="h-4 w-4" />
          Convert
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={!output || !!error}
          >
            {copied ? (
              <Check className="h-4 w-4 mr-1 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 mr-1" />
            )}
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={!output || !!error}
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSwitch}
          >
            <ArrowLeftRight className="h-4 w-4 mr-1" />
            Swap Mode
          </Button>
        </div>
      </div>

      {/* Info strip */}
      <p className="text-xs text-muted-foreground text-center pt-1">
        🔒 All conversion happens in your browser — no data is ever uploaded.
      </p>
    </div>
  );
}
