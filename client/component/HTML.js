"use strict";

var React = require('react');
var Page  = require("./Page");

function HTML(...props) {
    return (
        <html>
            <head>
                <meta charset="UTF-8"/>
                <link href="./css/index.css" rel="stylesheet"/>
                <title>{props.title}</title>
                <script src="//cdnjs.cloudflare.com/ajax/libs/ace/1.2.2/ace.js" />
            </head>
            <body>
                <div id="app">
                    <Page />
                </div>
                <script src="./index.js"></script>
            </body>
        </html>
    );
}

module.exports = HTML;