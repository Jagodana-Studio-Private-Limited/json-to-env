export const siteConfig = {
  // ====== CUSTOMIZE THESE FOR EACH TOOL ======
  name: "JSON to ENV Converter",
  title: "JSON to ENV Converter — Convert JSON to .env and .env to JSON Free",
  description:
    "Instantly convert JSON objects to .env file format and .env files back to JSON. Supports nested key flattening, copy to clipboard, and file download. 100% client-side — no data leaves your browser.",
  url: "https://json-to-env.tools.jagodana.com",
  ogImage: "/opengraph-image",

  // Header
  headerIcon: "FileCode2",
  brandAccentColor: "#6366f1", // indigo-500

  // SEO
  keywords: [
    "json to env",
    "env to json",
    "json to dotenv converter",
    "convert json to env file",
    "dotenv to json",
    "environment variables converter",
    "json env converter online",
    "dotenv generator",
    "json to .env online",
    ".env to json converter",
    "flatten json to env",
    "developer tools",
  ],
  applicationCategory: "DeveloperApplication",

  // Theme
  themeColor: "#3b82f6", // blue-500

  // Branding
  creator: "Jagodana",
  creatorUrl: "https://jagodana.com",
  twitterHandle: "@jagodana",

  // Social Profiles (for Organization schema sameAs)
  socialProfiles: [
    "https://twitter.com/jagodana",
  ],

  // Links
  links: {
    github:
      "https://github.com/Jagodana-Studio-Private-Limited/json-to-env",
    website: "https://jagodana.com",
  },

  // Footer
  footer: {
    about:
      "JSON to ENV Converter is a free, client-side developer tool that converts JSON objects to .env format and vice versa. Your data never leaves your browser.",
    featuresTitle: "Features",
    features: [
      "JSON → .env conversion",
      ".env → JSON conversion",
      "Nested key flattening",
      "Copy to clipboard",
      "Download output file",
    ],
  },

  // Hero Section
  hero: {
    badge: "Free Developer Tool",
    titleLine1: "Convert JSON to .env",
    titleGradient: "Instantly & Free",
    subtitle:
      "Paste a JSON object and get a ready-to-use .env file in seconds. Or go the other way — convert .env variables back to JSON. Nested keys are flattened automatically. 100% in-browser, nothing uploaded.",
  },

  // Feature Cards (shown on homepage)
  featureCards: [
    {
      icon: "🔄",
      title: "Bidirectional",
      description:
        "Convert JSON → .env and .env → JSON with one click. Switch modes instantly.",
    },
    {
      icon: "📦",
      title: "Nested Flattening",
      description:
        "Deep JSON objects are flattened with underscore-separated keys: { db: { host } } → DB_HOST.",
    },
    {
      icon: "🔒",
      title: "100% Private",
      description:
        "All conversion happens in your browser. No uploads, no servers, no tracking.",
    },
  ],

  // Related Tools (cross-linking to sibling Jagodana tools for internal SEO)
  relatedTools: [
    {
      name: "JSON Formatter",
      url: "https://json-formatter.tools.jagodana.com",
      icon: "📋",
      description: "Format, validate, and prettify JSON in seconds.",
    },
    {
      name: "YAML ↔ JSON Converter",
      url: "https://yaml-json-converter.tools.jagodana.com",
      icon: "📄",
      description: "Convert between YAML and JSON formats instantly.",
    },
    {
      name: "TOML Converter",
      url: "https://toml-converter.tools.jagodana.com",
      icon: "📝",
      description: "Convert TOML to JSON, YAML, and more.",
    },
    {
      name: "ENV Validator",
      url: "https://env-validator.tools.jagodana.com",
      icon: "✅",
      description: "Validate and lint your .env files against a schema.",
    },
    {
      name: "JSON Schema Generator",
      url: "https://json-schema-generator.tools.jagodana.com",
      icon: "🧩",
      description: "Auto-generate JSON Schema from any JSON object.",
    },
    {
      name: "Base64 Image Encoder",
      url: "https://base64-image-encoder.tools.jagodana.com",
      icon: "🖼️",
      description: "Encode images to Base64 data URIs for inline use.",
    },
  ],

  // HowTo Steps (drives HowTo JSON-LD schema for rich results)
  howToSteps: [
    {
      name: "Paste your JSON",
      text: "Paste a JSON object into the left panel. The tool accepts any valid JSON.",
      url: "",
    },
    {
      name: "Click Convert",
      text: "Press the Convert button (or use the keyboard shortcut). The .env output appears instantly in the right panel.",
      url: "",
    },
    {
      name: "Copy or Download",
      text: "Click Copy to copy the .env file to your clipboard, or click Download to save it as a .env file.",
      url: "",
    },
  ],
  howToTotalTime: "PT1M",

  // FAQ (drives both the FAQ UI section and FAQPage JSON-LD schema)
  faq: [
    {
      question: "What does this tool do?",
      answer:
        "This tool converts a JSON object into a .env file format — one KEY=VALUE line per entry. It also works in reverse: paste .env variables and get a JSON object back.",
    },
    {
      question: "How are nested JSON objects handled?",
      answer:
        'Nested JSON objects are flattened using underscore-separated keys. For example, { "database": { "host": "localhost", "port": 5432 } } becomes DATABASE_HOST=localhost and DATABASE_PORT=5432.',
    },
    {
      question: "Are values with spaces quoted automatically?",
      answer:
        'Yes. If a value contains spaces, special characters, or is a multi-word string, it is automatically wrapped in double quotes in the .env output (e.g., APP_NAME="My Application").',
    },
    {
      question: "Is my data safe?",
      answer:
        "Completely. All conversion logic runs in your browser using JavaScript. No data is sent to any server. You can even use this tool offline after the page loads.",
    },
    {
      question: "Can I convert .env back to JSON?",
      answer:
        "Yes — switch to .env → JSON mode, paste your environment variables, and get a clean JSON object. Underscore-separated keys are kept as flat keys in the JSON output.",
    },
    {
      question: "What file can I download?",
      answer:
        "You can download the output as a .env file (for JSON → .env mode) or as a .json file (for .env → JSON mode) with one click.",
    },
  ],

  // ====== PAGES (for sitemap + per-page SEO) ======
  pages: {
    "/": {
      title:
        "JSON to ENV Converter — Convert JSON to .env and .env to JSON Free",
      description:
        "Instantly convert JSON objects to .env file format and .env files back to JSON. Supports nested key flattening, copy to clipboard, and file download. 100% client-side.",
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
