import React from 'react';
import Dropzone from 'react-dropzone'
import axios from 'axios'

class ImageDropzone extends React.Component {
  constructor() {
    super()
    this.state = {
      imgurUrl: '',
      isUploading: false,
      hasErrored: false,
      hasUploaded: false
    }
  }

  onDrop(files) {
    this.setState({
      isUploading: true
    });

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
      let directUrl = result.data.data.link.replace('https://', '');
      this.setState({
        isUploading: false,
        imgurUrl: directUrl,
        hasUploaded: true
      });
      console.log(result)
    })
    .catch((error) => {
      this.setState({
        hasErrored: true,
        isUploading: false
      });
      console.log(error)
    })
  }

  render() {
    let message;

    if(this.state.isUploading) {
      message = (
        <p>Loading...</p>
      )
    } else if (!this.state.isUploading && this.state.imgurUrl) {
      message = (
        <p id='shortUrl'>{this.state.imgurUrl}</p>
      )
    } else if (this.state.hasErrored) {
      message = (
        <p>Woops...</p>
      )
    } else {
      message = (
        <p>Drop to upload</p>
      )
    }

    return (
      <div className="dropzone">
        <Dropzone onDrop={this.onDrop.bind(this)} className="dropzone-target">
          { message }
        </Dropzone>
      </div>
    );
  }
}

<ImageDropzone />

export default ImageDropzone
