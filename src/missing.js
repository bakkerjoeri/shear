const fs                      = require('fs');
const getAllFilesFromPatterns = require('./utilities/getAllFilesFromPatterns.js');
const path                    = require('path');

function missing(sourcePatterns, root = '') {
    let sources = getAllFilesFromPatterns(sourcePatterns);
    
    let includePaths = [];
    sources.forEach((source) => {
        let inclusionPattern = /(?:{% (?:include|extends|embed) ['"])([^'"~%}]*)(?:['"])(?! ~)/gm;
        let inclusions = [];
        let patternResult;
        
        do {
            patternResult = inclusionPattern.exec(source.getContents());
            
            if (patternResult) {
                inclusions.push(patternResult[1]);
            }
        } while (patternResult);
        
        inclusions.forEach((inclusion) => {
            if (!fs.existsSync(path.resolve(root, inclusion + '.html.twig'))) {
                console.log(`Couldn't find file ${inclusion} (expected in ${source.filepath})`);
            }
        });
    });
}

module.exports = missing;
