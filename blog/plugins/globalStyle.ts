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

.post-content figure {
  margin: 16px;
}

.post-content p {
  margin-top: 16px;
}

.post-content .alignleft {
  float: left;
}

.post-content .alignright {
  float: right;
}

.post-content figcaption {
  text-align: center;
  font-size: 12px;
  color: #999;
}

.post-content .alignwide {
  width: 1000px;
  margin-left: 50%;
  transform: translateX(-50%);
  max-width: 1000px;
}

.post-content .alignfull {
  width: 100vw;
  margin-left: 50%;
  transform: translateX(-50%);
  max-width: none;
}

.post-content .alignfull img {
  width: 100%;
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
