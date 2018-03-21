const path = require('path');
const glob = require('glob');
const fs =   require('fs');

class File {
    constructor(filepath) {
        if (!fs.existsSync(filepath)) {
            throw new Error(`No file '${filepath}' found.`);
        }
        
        this.filepath = filepath;
    }
    
    getName() {
        return path.basename(this.filepath).split('.')[0];
    }
    
    getContents() {
        if (!this.contents) {
            this.contents = fs.readFileSync(this.filepath, 'utf8');
        }
        
        return this.contents;
    }
}

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

function foundUsageOfTemplateInContents(template, sourceTemplate) {
    return sourceTemplate.contents.indexOf(templateName) !== -1;
}

function isTemplateUsedInSource(template, source) {
    return source.getContents().indexOf(template.getName()) !== -1;
}

function getAllPathsFromPatterns(patterns) {
    let paths = [];
    
    patterns.forEach((pattern) => {
        paths = [...paths, ...glob.sync(pattern)];
    });
    
    return paths;
}

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

module.exports = {
    prune: prune,
    inspect: inspect,
};