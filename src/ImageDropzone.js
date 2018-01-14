import React from 'react';
import Dropzone from 'react-dropzone'

class ImageDropzone extends React.Component {
  constructor() {
    super()
    this.state = { files: [] }
  }

  onDrop(files) {
    this.setState({
      files
    });

    console.log(files)
  }

  render() {
    return (
      <div>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <h2>Dropped files</h2>

          {
            this.state.files.map(f => <p key={f.name}>{f.name} - {f.size} bytes</p>)
          }

      </div>
    );
  }
}

<ImageDropzone />

export default ImageDropzone
