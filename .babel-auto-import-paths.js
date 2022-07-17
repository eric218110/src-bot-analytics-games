const config = require('./tsconfig.json')

module.exports = function autoImportPaths() {
  const { paths, rootDir } = config.compilerOptions
  let objPath
  const result = []
  let pathObject = {}
  for (
    objPath = paths;
    objPath !== null;
    objPath = Object.getPrototypeOf(objPath)
  ) {
    const resultPaths = result.concat(Object.getOwnPropertyNames(objPath))
    for (const path of resultPaths) {
      if (path.indexOf('@', 0) === 0) {
        let value = paths[path][0].replace(/[.]+/g, '')
        value = value.replace(/[*]+/g, '')
        value = `./${rootDir}${value}`
        let index = path.replace(/[*]+/g, '')
        index = index.replace(/[/]+/g, '')
        pathObject = {
          ...pathObject,
          [index]: value
        }
      }
    }
  }
  return pathObject
}
