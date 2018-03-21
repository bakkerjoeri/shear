/**
 * Check whether template is used in a given source file.
 * 
 * @param  {File}    template
 * @param  {File}    source
 * 
 * @return {Boolean}
 */
function isTemplateUsedInSource(template, source) {
    return source.getContents().indexOf(template.getName()) !== -1;
}

module.exports = isTemplateUsedInSource;