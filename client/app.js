"use strict";

const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require("react-dom/server");

const HTML = require("./component/HTML");
const Page = require("./component/Page");

if (typeof document !== 'undefined') {
    ReactDOM.render(React.createElement(Page), document.getElementById('app'));
}
 
module.exports = function render(locals, callback) {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(HTML, locals));

  callback(null, "<!DOCTYPE html>\n" + html, {});
};