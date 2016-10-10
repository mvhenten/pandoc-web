"use strict";

const React = require('react');
const pandoc = require("../action/pandoc");
const store = require("../store/pandoc");

const Editor = require("./editor/input");

function Select({options, name, onChange}) {
    let attr = {onChange, name};
    
    let Options = options.map((option) => 
        (<option key={"option-" + (option.value||option)} value={option.value||option}>{option.title||option.value||option}</option>)
    );
    
    let {value} = options.find((o) => o.selected);

    return (
        <select defaultValue={value} {...attr}>
            {Options}
        </select>
    );
}

class Form  extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submit = this.submit.bind(this);
        this.convert = this.convert.bind(this);
    }

    componentDidMount() {
        store.observe(this.setState.bind(this));
        pandoc.formats();        
    }
    
    convert() {
        let data = new FormData(this._form);
        pandoc.convert(data);
    }
    
    submit(evt) {
        evt.preventDefault();
        this.convert();        
    }
    
    render() {
        if (!this.state.formats)
            return (<div>Loading</div>);
            
        return (
            <form ref={(e) => this._form = e} onSubmit={this.submit}>
                <Select name="input" options={store.inputOptions} />
                <Select name="output" options={store.outputOptions} />
                <button>convert</button>
                <Editor convert={this.convert} {...this.state} />
            </form>
        );
    }
}

class Page extends React.Component {
    render() {
        return <div><Form /></div>;
    }
}

module.exports = Page;