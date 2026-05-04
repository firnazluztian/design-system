import { Node } from "@tiptap/core";

const HTML_BLOCK_DATA_ATTR = "data-html-block";

/**
 * Protected HTML block node. Stores raw HTML in an attribute and does not
 * allow TipTap to reinterpret the markup. Use for advanced layouts (e.g.
 * custom divs, flex/grid) so editor.getHTML() preserves the content.
 *
 * Architecture: atomic block; never inject arbitrary HTML into the editor
 * without wrapping it in this node.
 */
export const HtmlBlock = Node.create({
  name: "htmlBlock",

  group: "block",
  atom: true,
  selectable: true,
  defining: false,

  addAttributes() {
    return {
      html: {
        default: "",
        parseHTML: (element) => (element as HTMLElement).innerHTML?.trim() ?? "",
        renderHTML: () => ({}),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `div[${HTML_BLOCK_DATA_ATTR}]`,
        getAttrs: (dom) => ({
          html: (dom as HTMLElement).innerHTML?.trim() ?? "",
        }),
      },
    ];
  },

  renderHTML({ node }) {
    const html = (node.attrs as { html?: string }).html ?? "";
    if (typeof document === "undefined") {
      return [
        "div",
        { [HTML_BLOCK_DATA_ATTR]: "true", "data-placeholder": "HTML block" },
        0,
      ];
    }
    const div = document.createElement("div");
    div.setAttribute(HTML_BLOCK_DATA_ATTR, "true");
    div.innerHTML = html;
    return div;
  },
});
