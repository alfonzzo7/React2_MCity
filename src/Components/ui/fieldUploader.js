import React, { Component } from 'react';
import FileUploader from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebase } from '../../firebase';

class Fielduploader extends Component {
    state = {
        name: '',
        isUploading: false,
        fileURL: '',
    }

    handleUploadStart = () => {
        this.setState({
            isUploading: true
        });
    }
    handleUploadError = () => {
        this.setState({
            isUploading: false
        });
    }
    handleUploadSuccess = (filename) => {
        this.setState({
            name: filename,
            isUploading: false,
        });

        firebase.storage().ref(this.props.dir)
            .child(filename)
            .getDownloadURL()
            .then((url) => {
                this.setState({
                    fileURL: url
                })
            });

        this.props.filename(filename);
    }

    removeImg = () => {
        this.setState({
            isUploading: true
        });

        firebase.storage().ref(this.props.dir)
            .child(this.state.name)
            .delete()
            .then(() => {
                this.setState({
                    name: '',
                    isUploading: false,
                    fileURL: '',
                });
            });
        

        this.props.resetImage();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.defaultImg) {
            return state = {
                name: props.defaultImgName,
                fileURL: props.defaultImg,
            }
        }

        return null;
    }

    render() {
        return (
            <div>
                {!this.state.fileURL ?
                    <div>
                        <div className="label_inputs">{this.props.tag}</div>
                        <FileUploader
                            accept='image/*'
                            name='image'
                            randomizeFilename
                            storageRef={firebase.storage().ref(this.props.dir)}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                        />
                    </div>   
                    :
                    <div className="image_upload_container">
                        <img 
                            style={{
                                width: '100%',
                            }}
                            src={this.state.fileURL}
                            alt={this.state.name}
                        />
                        <div className="remove" onClick={() => this.removeImg()} style={{cursor: 'pointer'}}>
                            Remove
                        </div>
                    </div>
                }
                <div className="progress" style={{textAlign: 'center', margin:'30px 0'}}>
                    {
                        this.state.isUploading ?
                        <CircularProgress thickness={5} style={{color: '#98c6e9'}}/>
                        : null
                    }
                </div>
            </div>
        );
    }
}

export default Fielduploader;