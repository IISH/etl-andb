const fs = require('fs')
const factory = require('rdf-ext')
const ParserN3 = require('@rdfjs/parser-n3')
const SHACLValidator = require('rdf-validate-shacl')
async function loadDataset (filePaths : string[]) {
  const parser = new ParserN3({factory})
  const dataset = factory.dataset();
  for (const filePath of filePaths) {
    await dataset.import(parser.import( fs.createReadStream(filePath)))
  }
  return dataset;
}
const validate = async (dataFiles : string[], shapesFiles : string[]) => {
  console.log(`Validating ${dataFiles}`);
  const data = await loadDataset(dataFiles)
  const shapes = await loadDataset(shapesFiles)
  const validator = new SHACLValidator(shapes, {factory})
  const report = await validator.validate(data)
  console.log('conforms', report.conforms)
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
const run = async () => {
  return validate(['data/patterns.trig'], ['shsh.ttl'])
    .then(() => validate(['data/instances.trig'],
                         ['data/patterns.trig','data/patterns-enrichment.trig']))
}
run().catch(console.error)
