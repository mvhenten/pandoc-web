"use strict";

const React = require('react');

class AceEditor extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func,
        convert: React.PropTypes.func,
        mode: React.PropTypes.string,
        content: React.PropTypes.string,
    };

    static defaultProps = {
        mode: 'javascript',
        code: '//write your code here',
    };

    componentWillReceiveProps(nextProps) {
        if (!this.props.readonly)
            return;

        if (nextProps.code == this.props.code)
            return;
    
        this._editor.getSession().setValue(nextProps.code);
    }

    componentDidMount() {
        /* globals ace: false */
        const editor = ace.edit(this._root);

        editor.setTheme("ace/theme/clouds_midnight");
        editor.getSession().setMode("ace/mode/" + this.props.mode);
        editor.getSession().setUseWrapMode(true);
        editor.setShowPrintMargin(false);
        editor.getSession().setValue(this.props.code);

        editor.commands.addCommand({
            name: 'convert',
            bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
            exec: (editor) => {
                this.props.convert && this.props.convert();
            },
            readOnly: true // false if this command should not apply in readOnly mode
        });

        this._editor = editor;
        
        if (!this.props.readonly) {
            editor.getSession().on('change', this.onChange.bind(this));
        }
    }
    
    onChange(evt) {
        let value = this._editor.getSession().getValue();
        this.props.onChange(value);
    }

    render() {
        return (
            <div id="ace-editor" ref={(e) => this._root = e}>
            </div>
        );
    }
}

module.exports = AceEditor;
