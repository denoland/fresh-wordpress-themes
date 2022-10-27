import { Plugin } from "fresh/server.ts";

const cssText = `
a {
  text-decoration-line: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}
a:hover {
  text-decoration-style: dashed;
}
`;

const globalStyle: Plugin = {
  name: "globalStyle",
  render(ctx) {
    const _res = ctx.render();
    return {
      styles: [{ cssText, id: "global-style" }],
    };
  },
};

export default globalStyle;
