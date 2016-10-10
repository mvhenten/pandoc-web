"use strict";

const React = require('react');

const store = require("../../store/pandoc");

const AceEditor = require("./ace");

class Editor extends React.Component {
    constructor(){
        super();
    }

    change(value) {
        store.set("input", value);
    }

    render() {
        let {input, output} = this.props;

        return (
            <div id="editor">
                <input type="hidden" name="source" value={input}/>
                <AceEditor convert={this.props.convert} onChange={this.change} mode="markdown" code={input} />
                <AceEditor readonly={true} mode="text" code={output} />
            </div>
        );
    }
}

module.exports = Editor;

