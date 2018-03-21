const fs   = require('fs');
const path = require('path');

class File {
    /**
     * @param {string} filepath
     */
    constructor(filepath) {
        if (!fs.existsSync(filepath)) {
            throw new Error(`No file '${filepath}' found.`);
        }
        
        this.filepath = filepath;
    }
    
    /**
     * Returns the name of the file without path or file extension.
     * 
     * @return {String} The filename
     */
    getName() {
        return path.basename(this.filepath).split('.')[0];
    }
    
    /**
     * Returns the full contents found in this File's filepath. Using `useCache`, 
     * the contents can be returned from memory if they are already present.
     * 
     * @param  {String}  [encoding = 'utf8']
     * @param  {Boolean} [useCache = true]
     * 
     * @return {String|Buffer|Array}
     */
    getContents(encoding = 'utf8', useCache = true) {
        if (!this.contents || !useCache) {
            this.contents = fs.readFileSync(this.filepath, encoding);
        }
        
        return this.contents;
    }
}

module.exports = File;