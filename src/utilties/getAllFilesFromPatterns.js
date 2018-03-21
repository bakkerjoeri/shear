const File = require('./File.js');
const glob = require('glob');

/**
 * Creates an array of File instances for a given list of filepatterns.
 * 
 * @param  {String[]} patterns
 * 
 * @return {File[]}
 */
function getAllFilesFromPatterns(patterns) {
    let paths = [];

    patterns.forEach((pattern) => {
        paths = [...paths, ...glob.sync(pattern)];
    });
    
    let files = paths.map((path) => {
        return new File(path);
    });
    
    return files;
}

module.exports = getAllFilesFromPatterns;