const doesTemplateContainDynamicInclusion = require('./utilities/doesTemplateContainDynamicInclusion.js');
const getAllFilesFromPatterns             = require('./utilities/getAllFilesFromPatterns.js');
const path                                = require('path');

/**
 * Report templates with possible dynamic inclusions.
 * 
 * @param  {String[]} sourcePatterns
 */
function dynamic(sourcePatterns) {
    let sources = getAllFilesFromPatterns(sourcePatterns);
    
    let sourcesUsingDynamicInclusion = sources.filter((source) => {
        return doesTemplateContainDynamicInclusion(source);
    });
    
    // Report the results
    if (sourcesUsingDynamicInclusion.length === 0) {
        console.log(`No templates using dynamic inclusion found.`);
    } else {
        console.log(`Dynamic inclusion found in the following ${sourcesUsingDynamicInclusion.length} templates:`);
        
        sourcesUsingDynamicInclusion.forEach((source) => {
            console.log(`- ${path.basename(source.filepath)}`);
        });
    }
}

module.exports = dynamic;