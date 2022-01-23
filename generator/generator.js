const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

const filename = path.join(__dirname, './template.ejs')

const number = process.argv[2];
const year = process.argv[3] || 2021;
const pathToOutput = path.join(__dirname, `../${year}/${number}`);

/**
 * Renders a new file.
 * @Input format: node generator.js [task [year]]
 */
ejs.renderFile(filename, { data : { number } }, {}, (err, fileContent) => {
    if (!fs.existsSync(`${pathToOutput}/solution.ts`)) {
        fs.mkdirSync(pathToOutput, { recursive: true });

        fs.writeFileSync(`${pathToOutput}/solution.ts`, fileContent);
        fs.writeFileSync(`${pathToOutput}/input`, '');

        console.log('Files are successfully created:\n', `${pathToOutput}/solution.ts`, '\n', `${pathToOutput}/input`);
    }
});


