import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      editorState: EditorState.createEmpty()};
    }

    onChange(editorState) {
      this.setState({editorState});
    }

    makeBold(){
      this.onChange(RichUtils.toggleInlineStyle(
        this.state.editorState,
        'BOLD'
      ));
    }

    render() {
      // const raw = convertToRaw(this.state.editorState.getCurrentContent());
      return <div>
        <button onClick={() => {this.makeBold();}}>Bold</button>
        <Editor
          onChange={(editorState) => {this.onChange(editorState)}}
          editorState={this.state.editorState}
        />
        {/* <div>
          {JSON.stringify(raw)}
        </div> */}
        {/* above is for raw data  */}
      </div>;
    }
  }
