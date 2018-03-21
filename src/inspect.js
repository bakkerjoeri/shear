const File                    = require('./utilities/File.js');
const getAllFilesFromPatterns = require('./utilities/getAllFilesFromPatterns.js');
const isTemplateUsedInSource  = require('./utilities/isTemplateUsedInSource.js');
const path                    = require('path');

function inspect(templatePath, sourcePatterns) {
    let template = new File(templatePath);
    let sources = getAllFilesFromPatterns(sourcePatterns);
    
    // Find sources where the template is used.
    sourcesUsingTemplate = sources.filter((source) => {
        return isTemplateUsedInSource(template, source);
    });
    
    // Report the results.
    if (sourcesUsingTemplate.length === 0) {
        console.log(`${templatePath} seems te be unused.`);
    } else {
        console.log(`Usage of '${templatePath}' found in ${sourcesUsingTemplate.length} templates:`);
        
        sourcesUsingTemplate.forEach((source) => {
            console.log(`- ${path.basename(source.filepath)}`);
        });
    }
}

module.exports = inspect;