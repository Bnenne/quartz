import { QuartzTransformerPlugin } from "../types"

export const ShowOnly: QuartzTransformerPlugin = () => ({
  name: "ShowOnly",
  htmlPlugins() {
    return [
      {
        name: "ShowOnlyFilter",
        transform: (html: string) => {
          // Match headers and their following content until the next header
          // Example: <h2>Header #show</h2><p>keep me</p>...
          const sectionRegex =
            /<h([1-6])[^>]*>[^<]*#show[^<]*<\/h\1>[\s\S]*?(?=(<h[1-6][^>]*>|$))/gi

          const matches = [...html.matchAll(sectionRegex)]
          if (matches.length === 0) return "" // nothing matched

          // Combine all #show sections
          const keptContent = matches.map(m => m[0]).join("\n")

          // Remove "#show" from headers
          const cleaned = keptContent.replace(/#show/g, "").trim()

          return cleaned
        },
      },
    ]
  },
})
