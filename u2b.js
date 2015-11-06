'use strict';

const filename = process.argv[2];

if (!filename) {
	console.log('Usage:\t\tnode u2b.js [filename]');
	console.log('');
	console.log('Example:\tnode u2b.js data.txt');
	console.log('');
	console.log('Options:');
	console.log(' --group\tgroups unique browsers by name and display count');
	console.log(' --userAgent\tdisplay (in paranthesis) original userAgent string');
	return;
}

const argsMap = {};
const args = process.argv.slice(3,process.argv.length);
args.forEach(arg => argsMap[arg.substring(2)] = true);
const useragent = require('useragent');
const rl = require('readline').createInterface({
	input: require('fs').createReadStream('data.txt')
});
const browsers = {};

rl.on('line', function (line) {
	let browser = useragent.parse(line).toString();

	if (argsMap.group) {
		browser = browser.replace(/\s/g, '_').replace(/\./g, '$');
		if (browsers[browser]	=== undefined) {
			browsers[browser] = 1;
		} else {
			browsers[browser]++;
		}
	} else {
		console.log(browser, argsMap.userAgent ? `\t(${line})` : '');
	}
}).on('close', () => {
	if (argsMap.group) {
		for (let browser in browsers) {
			let browserToPrint = browser.replace(/\_/g, ' ').replace(/\$/g, '.');
			console.log(browserToPrint, '\t', browsers[browser]);
		}
	}
});