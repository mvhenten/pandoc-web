"use strict";

const spawn = require('child_process').spawn;

const OUTPUT_FORMATS = [
    "asciidoc", "beamer", "commonmark", "context", "docbook", "docbook5", "docx", 
    "dokuwiki", "dzslides", "epub", "epub3", "fb2", "haddock", "html", "html5", 
    "icml", "json", "latex", "man", "markdown", "markdown_github", "markdown_mmd", 
    "markdown_phpextra", "markdown_strict", "mediawiki", "native", "odt", 
    "opendocument", "opml", "org", "pdf", "plain", "revealjs", "rst", "rtf", 
    "s5", "slideous", "slidy", "tei", "texinfo", "textile", "zimwiki",
];

const INPUT_FORMATS = [
    "commonmark", "docbook", "docx", "epub", "haddock", "html", "json", "latex,", 
    "markdown", "markdown_github", "markdown_mmd", "markdown_phpextra,", 
    "markdown_strict", "mediawiki", "native", "odt", "opml", "org", "rst", 
    "t2t", "textile", "twiki",
];

function convert(source, from, to, done) {
    if (!INPUT_FORMATS.includes(from))
        return done(new Error(`Invalid input format ${from}, input must be one of: ${INPUT_FORMATS.join(", ")}`));

    if (!OUTPUT_FORMATS.includes(to))
        return done(new Error(`Invalid output format ${to}, input must be one of: ${OUTPUT_FORMATS.join(", ")}`));

    const pd = spawn('pandoc', ['-f', from, '-t', to]);

    pd.stdin.write(source);
    pd.stdin.end();

    let data = "";

    pd.stdout.on("data", (buf) => {
        data = data + buf.toString();
    });

    pd.on('close', (code) => {
        if (code !== 0)
            return done(new Error(`pandoc process exited with code ${code}`));

        done(null, data);
    });
}

module.exports = {
    convert: convert,
    get inputFormats() {
        return INPUT_FORMATS;
    },
    get outputFormats() {
        return OUTPUT_FORMATS;
    }
};