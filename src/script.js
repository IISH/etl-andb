const fs = require('fs')
const factory = require('rdf-ext')
const ParserN3 = require('@rdfjs/parser-n3')
const SHACLValidator = require('rdf-validate-shacl')
async function loadDataset (filePath) {
  const stream = fs.createReadStream(filePath)
  const parser = new ParserN3({ factory })
  return factory.dataset().import(parser.import(stream))
}
const run = async () => {
  const shapes = await loadDataset('bag-shapes.trig')
  const data = await loadDataset('bag-voorbeeld.trig')
  const validator = new SHACLValidator(shapes, { factory })
  console.log(validator)
  const report = await validator.validate(data)
  console.log(report)
  for (const result of report.results) {
    console.log("  Message:\t" + result.message)
    console.log("  Path:\t\t" + result.path)
    console.log("  Focus node:\t" + result.focusNode)
    console.log("  Source shape:\t" + result.sourceShape)
    console.log("  Severity:\t" + result.severity)
    console.log("  Source constraint component: " + result.sourceConstraintComponent)
    console.log("")
  }
}
run()
