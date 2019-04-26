import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import axios from 'axios'
import Spinner from 'react-spinkit'
import Clipboard from 'react-clipboard.js';
import FadeIn from 'react-fade-in';

const initialState = {
  imgurUrl: '',
  isUploading: false,
  hasUploaded: false,
  hasErrored: false,
  errorMessage: '',
  copied: false,
};

class ImageDropzone extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.refresh = this.refresh.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
  }

  onDrop(files) {
    if (this.validateFiles(files)) {
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
        this.setState({
          isUploading: false,
          hasUploaded: true,
          imgurUrl: result.data.data.link.replace('https://', ''),
        });
      })
      .catch((error) => {
        this.setState({
          isUploading: false,
          hasErrored: true,
        });
        console.log(error)
      })
    } else {
      this.refresh();
    }
  }

  validateFiles(files) {
    const supported = ['image/jpeg', 'image/png', 'image/gif']

    if (files.length > 1) {
      this.setState({
        hasErrored: true,
        errorMessage: 'one at a time, please'
      })
      return false;
    } else if (supported.indexOf(files[0].type ) === -1) {
      this.setState({
        hasErrored: true,
        errorMessage: 'sorry, we only support images at this time'
      })
      return false;
    }
    return true;
  }

  handleCopy = () => {
    this.setState({
      copied: true
    });

    this.refresh();
  }

  refresh = () => {
    setTimeout(() => {
      this.setState(initialState);
    }, 2000)
  }

  render() {
    let message;

    if (this.state.isUploading) {
      message = (
        <Spinner
          name='ball-scale-ripple'
          fadeIn='none'
          color='#ffffff'
        />
      )
    }
    else if (!this.state.isUploading && this.state.imgurUrl) {
      message = (
        <Clipboard
          data-clipboard-text={this.state.imgurUrl}
          onClick={this.handleCopy}
          className='bg-button'
        >
          <span>
            <p>{this.state.imgurUrl}</p>
            {this.state.copied ?
              <FadeIn>
                <p className="message">copied!</p>
              </FadeIn>
              :
              <FadeIn>
                <p className="message">click anywhere to copy this link to your clipboard</p>
              </FadeIn>
            }
          </span>
        </Clipboard>
      )
    }
    else if (this.state.hasErrored) {
      message = (
        <p className="error">
          {this.state.errorMessage}
        </p>
      )
    }
    else {
      message = (
        <Dropzone
          onDrop={this.onDrop.bind(this)}
          className="dropzone-target">
          <FadeIn>
            <p>drop to upload</p>
          </FadeIn>
        </Dropzone>
      )
    }

    return (
      <div className="dropzone">
        {message}
      </div>
    );
  }
}

export default ImageDropzone;
