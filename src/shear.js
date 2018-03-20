const path = require('path');
const glob = require('glob');
const fs =   require('fs');

function shear(includers = '/Users/bakkerjoeri/De Correspondent/src/publishers/decorrespondent.nl/app', includes = '/Users/bakkerjoeri/De Correspondent/src/publishers/decorrespondent.nl/app/web/components') {
    let pathsOfIncluders = glob.sync(path.resolve(__dirname, includers, '**/*.twig'));
    let contentOfIncluders = pathsOfIncluders.map((filepath) => {
        return fs.readFileSync(filepath, 'utf8');
    });
    
    let pathsOfIncludes = glob.sync(path.resolve(__dirname, includes, '**/*.twig'));
    let unusedIncludes = [...pathsOfIncludes];
    
    contentOfIncluders.forEach((contents) => {
        unusedIncludes = unusedIncludes.filter((filepath) => {
            let filename = path.basename(filepath, '.html.twig');
            
            return contents.indexOf(filename) === -1;
        });
    });
    
    if (unusedIncludes.length) {
        console.log(`Found ${unusedIncludes.length} potentially unused templates:`);
        
        unusedIncludes.forEach((unusedInclude) => {
            console.log(`- ${path.basename(unusedInclude)}`);
        });
    }
}

module.exports = shear;