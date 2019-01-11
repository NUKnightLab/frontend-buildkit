const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const Handlebars = require('handlebars');
const fs = require('fs-extra');
const _ = require('lodash');
const globby = require('globby');
const fm = require('front-matter');
const path = require('path');

let isDirectory = source => lstatSync(source).isDirectory()
let getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory)


let isFile = source => lstatSync(source).isFile();
let getFiles = source => readdirSync(source).map(name => join(source, name)).filter(isFile);

let getFilesRecursively = (source) => {
    let dirs = getDirectories(source);
    let files = dirs
        .map(dir => getFilesRecursively(dir)) // go through each directory
        .reduce((a,b) => a.concat(b), []);    // map returns a 2d array (array of file arrays) so flatten
    return files.concat(getFiles(source));
};

let getFoldersRecursively = (source) => {
    let dirs = getDirectories(source);
    let files = dirs
        .map(dir => getFoldersRecursively(dir)) // go through each directory
        .reduce((a,b) => a.concat(b), []);    // map returns a 2d array (array of file arrays) so flatten
    return files.concat(getFiles(source));
};

/**
 * getDirectories: parses all files in view and returns a list of files that are directories
 *
 * @returns {Array} list of all directories in src/templates/
 */
let getDirectoryNames = function() {
	return fs.readdirSync('src/templates').filter(function(file) {

		return fs.statSync('src/templates/' + file).isDirectory();
	})
}

let named_directories = getDirectoryNames('src/templates');

/**
 * getHelpers: registers a helper and renders the associated partial
 *
 * @param {function} Handlebars
 * @param {Array} directories
 * @returns {String} Handlebars rendered partial snippet
 */
var renderHelperPartial = function(Handlebars, directories) {
	directories.map(function(dir, index) {
		Handlebars.registerHelper(dir, function() {
			partialName = arguments[0];
			let filePath = `./src/templates/${dir}/${partialName}.hbs` //'./src/templates/' + dir + "/" + partialName + '.hbs';
			frontMatter = fm(fs.readFileSync(filePath, 'utf8'))
			template = frontMatter.body
			data = arguments[1] || {};
			let func = Handlebars.compile(template)
			return new Handlebars.SafeString(func(data))
		})
	})
}

renderHelperPartial(Handlebars, named_directories)
