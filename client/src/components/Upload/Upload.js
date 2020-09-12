import React from 'react';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UploadApi } from '../../api/api';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.refFile = React.createRef();

    this.state = {
      selectedFile: null,
      loaded: 0,
      isUploading: false 
    }
  }

  checkMimeType = (event) => {
    let file = event.target.files[0];

    let err = '';
    const supportedFileTypes = ['text/csv'];

    if (supportedFileTypes.every(type => file.type !== type)) {
      err = 'File type is not a supported format\n';
    }

    if (err) {
      toast.error(err);
      event.target.value = null;
    }

    return true;
  }

  checkFileSize = (event) => {
    let file = event.target.files[0];
    let size = 2000000;
    let err = '';
    if (file.size > size) {
      err = 'File is too large, please pick a smaller file\n';
    }

    if (err) {
      toast.error(err);
      event.target.value = null;
    }

    return true;
  }

  onChangeHandler = event => {
    var file = event.target.files[0];
    if (this.checkMimeType(event) && this.checkFileSize(event)) {
      this.setState({
        selectedFile: file,
        loaded: 0
      })
    }
  }

  onClickHandler = (event) => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    this.setState({ isUploading: true });

    UploadApi.uploadCsv(data, {
      onUploadProgress: ProgressEvent => {
        setTimeout(() => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
          })
        }, 100)

      },
    })
      .then(res => {
        toast.success('upload success')
        console.log('oplya');

        this.setState({ avatar: res.data.url, uploadPercentage: 100 }, () => {
          this.setState({ loaded: 0, isUploading: false });
          this.refFile.current.value = null;
        })
      })
      .catch(err => {
        toast.error('upload fail')
      })
  }

  render() {
    return (
      <div className="container">
        <div className="mt-3  files col-sm-6">
          <h1 className="text-primary mb-3">Upload CSV file</h1><br />
          <div className="form-group files">
            <div className="form-group">
              <div className="input-group mb-3">
                <div className="custom-file">
                  <input type="file" className="custom-file-input" onChange={this.onChangeHandler} ref={this.refFile} />
                  <label className="custom-file-label">Choose file</label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <ToastContainer />
            <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded, 2)}%</Progress>
          </div>
          <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler} disabled={this.state.isUploading}>Upload</button>
        </div>
      </div>
    );
  }
}

export default Upload;
