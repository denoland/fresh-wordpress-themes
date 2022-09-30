// Copyright 2022 the Deno authors. All rights reserved. MIT license.

const globalStyle = `
a {
  text-decoration-line: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}
a:hover {
  text-decoration-style: dashed;
}
`;

export function GlobalStyle() {
  return <style dangerouslySetInnerHTML={{ __html: globalStyle }} />;
}
