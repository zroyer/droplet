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
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <div>
            {
              this.state.files.map(f => <div key={f.name}>{f.name} - {f.size} bytes</div>)
            }
          </div>
        </aside>
      </section>
    );
  }
}

<ImageDropzone />

export default ImageDropzone
