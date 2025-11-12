import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"

/**
 * Keep only paragraphs (and other content) that appear
 * under headings containing "#show". Everything else is removed.
 */
export const ShowOnly = (): QuartzTransformerPlugin => ({
  name: "ShowOnly",
  markdownPlugins() {
    return [
      () => {
        return (tree) => {
          let keepMode = false
          const newChildren: any[] = []

          for (const node of tree.children) {
            if (node.type === "heading") {
              const text = node.children
                ?.map((c: any) => c.value || "")
                .join("")
                .toLowerCase()

              // Enter keep mode when we hit a #show header
              keepMode = text.includes("#show")
              continue // Don’t include the header itself
            }

            // Only keep nodes that are inside a #show section
            if (keepMode) {
              newChildren.push(node)
            }
          }

          tree.children = newChildren
        }
      },
    ]
  },
})
