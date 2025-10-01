
const { JSDOM } = require('jsdom');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const { getClassNames } = require('./webpack.utils')

const BUILD_DIR = ".build";
const classNames = getClassNames();


const getHTMLFiles = (cb) => {
	glob(`${BUILD_DIR}/**/*.html`, cb);
}

const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special characters for use in a regular expression
}

const replaceClassNamesInHeader = (header, classNames) => {
	Object.keys(classNames).map(className => {
		const escapedClassName = escapeRegExp(className);
		const encryptedClassName = classNames[className];

		const regex1 = new RegExp(`(classList\.)(.+)('${escapedClassName}')(.+)`, "g");

		header.innerHTML = header.innerHTML
			.replace(regex1, (match, p1, p2, p3, p4) => (
				`${p1}${p2}'${encryptedClassName}'${p4}`
			))
	})

	return header
}

const replaceClassNamesForNode = (node, classNames) => {
	if (node.childNodes && node.childNodes.length > 0) {
		node.childNodes.forEach(n => replaceClassNamesForNode(n, classNames))
	}

	if (!node.classList || node.classList.length === 0) {
		return node
	}

	const nodeClasses = node.classList.value.split(' ')
	nodeClasses.forEach(className => {
		const encryptedClassName = classNames[className]
		if (encryptedClassName) {
			node.classList.replace(className, encryptedClassName)
		}
	})

	return node
}

const transformHTMLFile = (htmlSrc) => {
	return new Promise(async (resolve, reject) => {
		const filePath = path.resolve(__dirname, '..', htmlSrc);
		const file = await JSDOM.fromFile(filePath, { contentType: 'text/html' });

		replaceClassNamesInHeader(file.window.document.head, classNames)
		replaceClassNamesForNode(file.window.document.documentElement, classNames)
		fs.writeFileSync(filePath, file.serialize())

		resolve(file)
	})
}

getHTMLFiles((err, result) => {
	if (err) throw new Error(err)

	Promise.all(result.map(src => transformHTMLFile(src)))
})