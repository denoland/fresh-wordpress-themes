// Copyright 2022 the Deno authors. All rights reserved. MIT license.

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

.post-content > .alignwide {
  width: 1000px;
  margin-left: min(0px, calc(50% - 500px));
  max-width: 1000px;
}

.post-content > .alignfull {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  max-width: none;
}

.post-content > .alignfull img {
  width: 100%;
}

.post-content .wp-block-cover {
  position: relative;
  clear: both;
  background-size: cover;
  background-position: center;
  min-height: 430px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  margin-bottom: 16px;
  padding: 16px;
  font-size: 32px;
  text-align: center;
  overflow: hidden;
}

.post-content .wp-block-cover.has-background-dim {
  background-color: #000;
}

.post-content .wp-block-cover.has-background-dim:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.5;
  background-color: inherit;
  z-index: 1;
}

.post-content .wp-block-cover .wp-block-cover-text {
  z-index: 1;
}

.post-content .wp-block-cover .wp-block-cover-text a {
  color: #fff;
}

.post-content .wp-block-cover.has-parallax {
  background-attachment: fixed;
}

.post-content .wp-block-cover .wp-block-cover__video-background {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  object-fit: cover;
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
