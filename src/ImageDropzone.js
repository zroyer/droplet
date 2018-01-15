import React from 'react';
import Dropzone from 'react-dropzone'
import axios from 'axios'

class ImageDropzone extends React.Component {
  constructor() {
    super()
    this.state = {
      imgurUrl: '',
    }
  }

  onDrop(files) {
    var form = new FormData()
    form.append('image', files[0])
    form.append('name', files[0].name)

    const config = {
      baseURL: 'https://api.imgur.com',
      headers: {
        'Authorization': 'Client-ID 37266d00d3ab6ea'
      }
    }
    axios.post('/3/image', form, config)
    .then((result) => {
      console.log('image post success')
      this.setState({
        imgurUrl: result.data.data.link.replace('https://', '')
      });
      console.log(result)
    })
    .catch((error) => {
      console.log('image post error')
      console.log(error)
    })
  }

  render() {
    return (
      <div>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <h2>Last file uploaded:</h2>
        <p><a href={this.state.imgurUrl}>{this.state.imgurUrl}</a></p>
      </div>
    );
  }
}

<ImageDropzone />

export default ImageDropzone
