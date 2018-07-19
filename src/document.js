/**
 * @file Sets up a rich text editor and handles text editing.
 * @author Raj Kane
 * @author Jon Lee
 * @author Ninja Gaskin
 * @author Anshul Nanda
 */

import React from 'react';
import {Editor, EditorState, RichUtils, convertFromRaw, convertToRaw} from 'draft-js';
import ColorPicker, {colorPickerPlugin} from 'draft-js-color-picker';
import HomeBar from './homebar.js';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const styleMap = {
  'UPPERCASE': {
    textTransform: 'uppercase'
  },
  'LOWERCASE': {
    textTransform: 'lowercase'
  },
};

const presetColors = [
  '#ff00aa',
  '#F5A623',
  '#F8E71C',
  '#8B572A',
  '#7ED321',
  '#417505',
  '#BD10E0',
  '#9013FE',
  '#4A90E2',
  '#50E3C2',
  '#B8E986',
  '#000000',
  '#4A4A4A',
  '#9B9B9B',
  '#FFFFFF',
];

export default class Document extends React.Component {
  /**
   * @class Document - Represents the rich text editor.
  */
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      documentName: props.options.doc.title
    };
    this.onChange = (editorState) => {
      this.setState({editorState}, () => {
        socket.emit('syncDocument', {
          docId: this.props.options.doc._id,
          rawState: convertToRaw(editorState.getCurrentContent())
        })
      });
    }
    if(props.options.doc.content === '') this.state.editorState = EditorState.createEmpty();
    else {
      this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(props.options.doc.content)));
    }
    this.getEditorState = () => this.state.editorState;
    this.picker = colorPickerPlugin(this.onChange, this.getEditorState);
    this.remoteStateChange = this.remoteStateChange.bind(this);
  };

  toggleInlineStyle(e, inlineStyle) {
    /**
     * @function toggleInlineStyle - Toggle a selected text's inline style, which
     * can be bold, italic, underline, strikethrough, or case.
     * @param e - An onMouseDown event.
     * @param inlineStyle - The selected text's inline style.
     */
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  };

  toggleBlockType(e, blockType) {
    /**
     * @function toggleBlockStyle - Toggle a selected text's block type, which
     * can be unordered or ordered list, or header size.
     * @param e - An onMouseDown event.
     * @param blockType - The selected text's block type.
     */
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  setDocumentName(e) {
    this.setState({documentName: e.target.value});
  };

  save(e) {
    fetch('http:localhost:3000/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        newContent: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())),
        id: this.props.options.doc._id
      })
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        if(res.success) {
            alert('saved')
        } else {
            alert('error in saving')
        }
      })
        .catch(err => console.log('Error ', err));
  };

  remoteStateChange(res) {
    debugger;
    this.setState({editorState: EditorState.createWithContent(convertFromRaw(res.rawState))});
  }

  componentDidMount() {
    socket.emit('openDocument', {docId: this.props.options.doc._id}, () => {
      socket.on('syncDocument', this.remoteStateChange)
    });
  };

  render() {
    const {editorState} = this.state;
    return(

      <div className="entire">

        <HomeBar redirect={this.props.redirect}/>
        <input onChange={e => this.setDocumentName(e)} value={this.state.documentName}/>
        <h2 className="documenteditor">Document Title</h2>
        <button onClick={e => this.save(e)}>Save</button>
        <div className="editor">
          <div className="toolbar">
            <button onMouseDown={(e) => this.toggleInlineStyle(e, 'BOLD')}><i className="material-icons">format_bold</i></button>
            <button onMouseDown={(e) => this.toggleInlineStyle(e, 'ITALIC')}><i className="material-icons">format_italic</i></button>
            <button onMouseDown={(e) => this.toggleInlineStyle(e, 'UNDERLINE')}><i className="material-icons">format_underline</i></button>
            <button onMouseDown={(e) => this.toggleInlineStyle(e, 'STRIKETHROUGH')}><i className="material-icons">format_strikethrough</i></button>
            <button onMouseDown={(e) => this.toggleInlineStyle(e, 'UPPERCASE')}><i className="material-icons">format_size</i></button>

            <button onMouseDown={(e) => this.toggleBlockType(e, 'unordered-list-item')}><i className="material-icons">format_list_bulleted</i></button>
            <button onMouseDown={(e) => this.toggleBlockType(e, 'ordered-list-item')}><i className="material-icons">format_list_numbered</i></button>

            <button onMouseDown={(e) => this.toggleBlockType(e, 'header-one')}>h1</button>
            <button onMouseDown={(e) => this.toggleBlockType(e, 'header-two')}>h2</button>
            <button onMouseDown={(e) => this.toggleBlockType(e, 'header-three')}>h3</button>
            <button onMouseDown={(e) => this.toggleBlockType(e, 'header-four')}>h4</button>
            <button onMouseDown={(e) => this.toggleBlockType(e, 'header-five')}>h5</button>
            <button onMouseDown={(e) => this.toggleBlockType(e, 'header-six')}>h6</button>

            <ColorPicker toggleColor={(color) => this.picker.addColor(color)}
              presetColors={presetColors}
              color={this.picker.currentColor(this.state.editorState)}
            />

            <button onMouseDown={this.picker.removeColor}><i className="material-icons">format_color_reset</i></button>
          </div>
        <div className="editorbox">
          <Editor editorState={editorState}
            onChange={this.onChange}
            customStyleMap={styleMap}
            customStyleFn={this.picker.customStyleFn}
          />
        </div>
        </div>
      </div>

    );
  };
};
