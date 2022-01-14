const path = require("path");
const fs = require("fs");
const Prism = require("prismjs");
const getFileContent = (rootDir, filePath) => {
  const componentsPath = path.resolve(rootDir, ".vuepress/components");
  const componentFilePath = path.resolve(componentsPath, filePath);
  return fs.readFileSync(componentFilePath, "utf-8");
};
const highlightCode = (content) => {
  const lang = "markup";
  const html = Prism.highlight(content, Prism.languages[lang], lang);
  return `<pre v-pre class="language-vue"><code>${html}</code></pre>`;
};
const resolveComponentName = (filePath) => filePath.slice(0, -4).replace(/\//g, "-");
module.exports = (opts, ctx) => {
  const type = "code-example";
  return {
    enhanceAppFiles: [
      path.resolve(__dirname, "enhanceAppFile.js")
    ],
    plugins: [
      [
        "container",
        {
          type,
          render(tokens, index) {
            const token = tokens[index];
            const componentPath = token.info.trim().slice(type.length).trim();
            const source = componentPath ? getFileContent(ctx.sourceDir, componentPath) : "";
            const code = highlightCode(source);
            const componentName = resolveComponentName(componentPath);
            if (token.nesting === 1) {
              return `<div>
                      <Example raw-source="${encodeURIComponent(source)}" component="${componentName}">${code}</Example>`;
            } else {
              return "</div>";
            }
          }
        }
      ]
    ]
  };
};
