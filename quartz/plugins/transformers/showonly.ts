import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { Root, Content, Heading } from "mdast"

export const ShowOnly: QuartzTransformerPlugin = () => {
  return {
    name: "ShowOnly",
    markdownPlugins() {
      return [() => {
          return (tree: Root) => {
            const newChildren: Content[] = []
            let keep = true

            for (const node of tree.children) {
              if (node.type === "heading") {
                const heading = node as Heading
                const text = heading.children
                  .filter((c) => c.type === "text")
                  .map((c: any) => c.value)
                  .join(" ")

                // if header doesn't include !hide
                if (!text.includes("!hide")) {
                  keep = true
                  newChildren.push(node) // keep the heading itself
                  continue
                } else {
                  // reset when a new header that isn’t show appears
                  keep = false
                }
              }

              // if we’re in a "show" section, keep content
              if (keep) {
                newChildren.push(node)
              }
            }

            tree.children = newChildren
            return tree
          }
        },
      ]
    },
  }
}
