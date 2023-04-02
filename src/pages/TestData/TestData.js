import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './TestData.module.scss';

const cx = classNames.bind(styles);

class TestData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            files: [],
            imagePreviewUrls: [],
            uploadStatus: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleImageChange(event) {
        let files = event.target.files;
        let imagePreviewUrls = [];

        for (let i = 0; i < files.length; i++) {
            let reader = new FileReader();
            reader.onloadend = () => {
                imagePreviewUrls.push(reader.result);
                this.setState({
                    files: files,
                    imagePreviewUrls: imagePreviewUrls,
                });
            };
            reader.readAsDataURL(files[i]);
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        let formData = new FormData();

        formData.append('name', this.state.name);

        for (let i = 0; i < this.state.files.length; i++) {
            formData.append('images[]', this.state.files[i]);
        }

        axios
            .post('https://httpbin.org/post', formData)
            .then((response) => {
                this.setState({ uploadStatus: 'Upload successful!' });
            })
            .catch((error) => {
                this.setState({ uploadStatus: 'Upload failed.' });
            });

        fetch('https://httpbin.org/post', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        let imagePreview = null;
        if (this.state.imagePreviewUrls.length > 0) {
            imagePreview = (
                <div className={cx('image-preview')}>
                    {this.state.imagePreviewUrls.map((url, index) => (
                        <img key={index} src={url} alt="Preview" width="200" />
                    ))}
                </div>
            );
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit} className={cx('form-container')}>
                    <label>
                        Name:
                        <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                    </label>
                    <br />
                    <label>
                        Images:
                        <input type="file" multiple onChange={this.handleImageChange} />
                    </label>
                    <br />
                    <input type="submit" className={cx('upload-status')} value="Upload" />
                </form>
                {imagePreview}
                {this.state.uploadStatus}
            </div>
        );
    }
}

export default TestData;
