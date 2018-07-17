/**
 * @file Sets up a rich text editor and handles text editing.
 * @author Raj Kane
 * @author Jon Lee
 * @author Ninja Gaskin
 * @author Anshul Nanda
 */

import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import ColorPicker, {colorPickerPlugin} from 'draft-js-color-picker';
import HomeBar from './homebar.js';

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
   * @class Represents the rich text editor.
  */
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState})
    this.getEditorState = () => this.state.editorState;
    this.picker = colorPickerPlugin(this.onChange, this.getEditorState);
  };

  toggleInlineStyle(e, inlineStyle) {
    /**
     * Toggle a selected text's inline style, which can be bold, italic, underline,
     * strikethrough, or case.
     * @param e - An onMouseDown event.
     * @param inlineStyle - The selected text's inline style.
     */
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  };

  toggleBlockType(e, blockType) {
    /**
     * Toggle a selected text's block type, which can be unordered or ordered
     * list, or header size.
     * @param e - An onMouseDown event.
     * @param blockType - The selected text's block type.
     */
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  render() {
    const {editorState} = this.state;
    return(
      <div>
        <HomeBar redirect={this.props.redirect}/>
        <h2>Document Editor</h2>
        <div className="editor">
          <div className="toolbar">
            <button onMouseDown={(e) => this.toggleInlineStyle(e, 'BOLD')}>B</button>
            <button onMouseDown={(e) => this.toggleInlineStyle(e, 'ITALIC')}>I</button>
            <button onMouseDown={(e) => this.toggleInlineStyle(e, 'UNDERLINE')}>U</button>
            <button onMouseDown={(e) => this.toggleInlineStyle(e, 'STRIKETHROUGH')}>S</button>

            <button onMouseDown={(e) => this.toggleInlineStyle(e, 'UPPERCASE')}>ABC</button>
            <button onMouseDown={(e) => this.toggleInlineStyle(e, 'LOWERCASE')}>abc</button>

            <button onMouseDown={(e) => this.toggleBlockType(e, 'unordered-list-item')}>Unordered List</button>
            <button onMouseDown={(e) => this.toggleBlockType(e, 'ordered-list-item')}>Ordered List</button>

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
            <button onMouseDown={this.picker.removeColor}>Clear color</button>
          </div>

          <Editor editorState={editorState}
            onChange={this.onChange}
            customStyleMap={styleMap}
            customStyleFn={this.picker.customStyleFn}
          />
        </div>
      </div>
    );
  };
};
