const getAllFilesFromPatterns = require('./utilities/getAllFilesFromPatterns.js');
const isTemplateUsedInSource  = require('./utilities/isTemplateUsedInSource.js');
const path                    = require('path');

function prune(templatePatterns, sourcePatterns) {
    let templates = getAllFilesFromPatterns(templatePatterns);
    let sources = getAllFilesFromPatterns(sourcePatterns);
    
    // Find any unused templates by filtering out any matches to source contents.
    let unusedTemplates = [...templates];
    sources.forEach((source) => {
        unusedTemplates = unusedTemplates.filter((template) => {
            return !isTemplateUsedInSource(template, source);
        });
    });
    
    // Report the results
    if (unusedTemplates.length === 0) {
        console.log('No unused templates found.');
    } else {
        console.log(`Found ${unusedTemplates.length} potentially unused templates:`);
        
        unusedTemplates.forEach((unusedTemplate) => {
            console.log(`- ${path.basename(unusedTemplate.filepath)}`);
        });
    }
}

module.exports = prune;