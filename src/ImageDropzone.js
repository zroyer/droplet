import React from 'react';
import Dropzone from 'react-dropzone'
import axios from 'axios'
import Spinner from 'react-spinkit'
import Clipboard from 'react-clipboard.js';

const initialState = {
  imgurUrl: '',
  isUploading: false,
  hasErrored: false,
  hasUploaded: false
};

class ImageDropzone extends React.Component {
  constructor() {
    super()
    this.state = initialState;

    this.refresh = this.refresh.bind(this);
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

  refresh() {
    this.setState(initialState);
  }

  render() {
    let message;

    if(this.state.isUploading) {
      message = (
        <Spinner name='wave' fadeIn='none'/>
      )
    } else if (!this.state.isUploading && this.state.imgurUrl) {
      message = (
        <Clipboard data-clipboard-text={this.state.imgurUrl} onClick={this.refresh} className='bg-button'>
          <p>{this.state.imgurUrl}</p>
          <p className="copy-notice">Click anywhere to copy your URL and start over</p>
        </Clipboard>
      )
    } else if (this.state.hasErrored) {
      message = (
        <p>Woops...</p>
      )
    } else {
      message = (
        <Dropzone onDrop={this.onDrop.bind(this)} className="dropzone-target">
          <p>Drop to upload</p>
        </Dropzone>
      )
    }

    return (
      <div className="dropzone">
        { message }
      </div>
    );
  }
}

<ImageDropzone />

export default ImageDropzone
