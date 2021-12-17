/**
 * 希望的用法
 * 传入组件的相对路径
 * 相对于 docs/.vuepress/components
 * 
 * 能够自动生成
 */

const path = require('path')
const fs = require('fs')
const Prism = require('prismjs')


/**
 * 拿到文件内容
 * @param {String} rootDir 文档根路径
 * @param {String} filePath 文件相对路径
 * @returns {String}
 * 
 */
const getFileContent = (rootDir, filePath) => {
  const componentsPath = path.resolve(rootDir, '.vuepress/components')
  const componentFilePath = path.resolve(componentsPath, filePath)

  return fs.readFileSync(componentFilePath, 'utf-8')
}

/**
 * 根据文件内容，返回高亮后的html
 * @param {String} content 文件内容
 * @returns {String} 
 */
const highlightCode = content => {
  const lang = 'markup'
  const html = Prism.highlight(content, Prism.languages[lang], lang)
  return `<pre v-pre class="language-vue"><code>${html}</code></pre>`
}

/**
 * 根据文件路径，解析出对应的组件名称。
 * @param {String} filePath 
 */
const resolveComponentName = filePath => filePath.slice(0, -4).replace(/\//g, '-')


module.exports = (opts, ctx) => {
  const type = 'code-example'

  return {
    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js')
    ],
    plugins: [
      [
        'container',
        {
          type,
          render (tokens, index) {
            const token = tokens[index]

            const componentPath = token.info.trim().slice(type.length).trim()
            // 文件内容
            const source = componentPath ? getFileContent(ctx.sourceDir, componentPath) : ''
            // 美化后的代码
            const code = highlightCode(source)
            // 组件名称
            const componentName = resolveComponentName(componentPath)
            if (token.nesting === 1) {
              return `<div>
                      <Example raw-source="${encodeURIComponent(source)}" component="${componentName}">${code}</Example>`
            } else {
              return '</div>'
            }

          }
        }
      ]
    ]
  }
}