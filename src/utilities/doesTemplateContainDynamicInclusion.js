/**
 * Checks if a given template contains a dynamic include, embed or extends.
 * 
 * @param  {File} template
 * @return {Boolean}
 */
function doesTemplateContainDynamicInclusion(template) {
    let includePattern = /^{% (?:include|extends|embed).* ((?:[^'"]\w+[^'"])|~)+ .*%}$/gm;
    
    return includePattern.test(template.getContents());
}

module.exports = doesTemplateContainDynamicInclusion;