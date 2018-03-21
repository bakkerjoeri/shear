const path = require('path');
const glob = require('glob');
const fs =   require('fs');

function prune(templatePatterns, fromPatterns) {
    let fromPaths = [];
    fromPatterns.forEach((pattern) => {
        fromPaths = [
            ...fromPaths,
            ...glob.sync(path.resolve(process.cwd(), pattern)),
        ];
    });
    
    let fromContents = fromPaths.map((filepath) => {
        return fs.readFileSync(filepath, 'utf8');
    });
    
    let templatePaths = [];
    templatePatterns.forEach((pattern) => {
        templatePaths = [
            ...templatePaths, 
            ...glob.sync(path.resolve(process.cwd(), pattern)),
        ];
    });
    
    let unusedTemplatePaths = [...templatePaths];
    
    console.log(`Checking usage of ${templatePaths.length} templates...`);
    fromContents.forEach((contents) => {
        unusedTemplatePaths = unusedTemplatePaths.filter((filepath) => {
            let filename = path.basename(filepath).split('.')[0];
            
            return contents.indexOf(filename) === -1;
        });
    });
    
    if (unusedTemplatePaths.length) {
        console.log(`Found ${unusedTemplatePaths.length} potentially unused templates:`);
        
        unusedTemplatePaths.forEach((unusedTemplatePath) => {
            console.log(`- ${path.basename(unusedTemplatePath)}`);
        });
    }
}

function inspect(templatePath, fromPatterns) {
    if (typeof templatePath !== 'string') {
        console.error(`Expected templatePath to be a 'string', but found '${typeof templatePath}'.`);
        return;
    }
    
    if (!fs.existsSync(templatePath)) {
        console.error(`No file '${templatePath}' found.`);
        return;
    }
    
    console.log(`Inspecting file ${templatePath}`);

    let fromPaths = [];
    fromPatterns.forEach((pattern) => {
        fromPaths = [
            ...fromPaths,
            ...glob.sync(path.resolve(process.cwd(), pattern)),
        ];
    });
    
    let fromTemplates = fromPaths.map((filepath) => {
        return {
            path: filepath,
            contents: fs.readFileSync(filepath, 'utf8')
        };
    });
    
    sourcesUsingTemplate = fromTemplates.filter((fromTemplate) => {
        let filename = path.basename(templatePath).split('.')[0];
        
        return fromTemplate.contents.indexOf(filename) !== -1;
    })
    
    if (sourcesUsingTemplate.length === 0) {
        console.log(`${templatePath} seems te be unused.`);
    } else {
        console.log(`Used in ${sourcesUsingTemplate.length} templates:`);
        
        sourcesUsingTemplate.forEach((source) => {
            console.log(`- ${path.basename(source.path)}`);
        });
    }
    
}

module.exports = {
    prune: prune,
    inspect: inspect,
};