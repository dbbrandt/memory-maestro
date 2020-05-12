import React from "react";
import PropTypes from "prop-types";

const headers = {
  'Cache-Control': 'no-cache'
};

const getFilenamePart = filename => filename.match(/.*\/(.*)$/)[1];

const toDataURL = url =>
  fetch(url, { headers })
    .then(response => {
      console.log("toDataURL: url: ", url);
      console.log("toDataURL: fetch response: ", response);
      return response.blob()
    })
    .then(
      blob =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

const readFileAsDataURL = file =>
  new Promise(resolve => {
    const reader = new FileReader();

    reader.onload = event => {
      resolve(event.target.result);
    };

    reader.readAsDataURL(file);
  });

const resizeImage = (imageURL, canvas, maxHeight) =>
  new Promise(resolve => {
    const image = new Image();

    image.onload = () => {
      const context = canvas.getContext("2d");

      if (image.height > maxHeight) {
        image.width *= maxHeight / image.height;
        image.height = maxHeight;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = image.width;
      canvas.height = image.height;

      context.drawImage(image, 0, 0, image.width, image.height);

      resolve(canvas.toDataURL("image/jpeg"));
    };

    image.src = imageURL;
  });

/**
 * A custom <input> that dynamically reads and resizes image files before
 * submitting them to the server as data URLs. Also, shows a preview of the image.
 */
class ImageInput extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    maxHeight: PropTypes.number,
    handleImageChange: PropTypes.func,
    value: PropTypes.string
  };

  state = {
    value: "",
    filename: ""
  };

  handleValueChange = (data_url, filename) => {
    this.setState({ value: data_url });
    this.props.handleImageChange(data_url, filename);
  };

  handleFileChange = event => {
    const file = event.target.files[0];
    const filename = file.name;
    this.setState({ filename: filename });
    console.log('ImageInput new filename: ', filename);

    if (file && file.type.match(/^image\//)) {
      readFileAsDataURL(file).then(originalURL => {
        resizeImage(originalURL, this.canvas, this.props.maxHeight).then(
          url => {
            this.handleValueChange(url, filename);
          }
        );
      });
    } else {
      this.handleValueChange("");
    }
  };

  handleFormReset = () => {
    this.handleValueChange("");
  };

  componentDidMount() {
    this.canvas = document.createElement("canvas");
    this.fileInput.form.addEventListener("reset", this.handleFormReset);
    // Added feature to convert any URL passed in to a dataURL for preloading the canvas.
    console.log("ImageInput props: ", this.props);
    if (!!this.props.value)
      toDataURL(this.props.value)
        .then(dataUrl => {
          console.log("toDataURL: dataURL: ", dataUrl);
          const filename = getFilenamePart(this.props.value);
          this.setState({ value: dataUrl, filename: filename });
          resizeImage(dataUrl, this.canvas, this.props.maxHeight).then(
            url => {
              this.setState({ value: url });
            }
          );
        });
  }

  componentWillUnmount() {
    this.fileInput.form.removeEventListener("reset", this.handleFormReset);
  }

  render() {
    const { className } = this.props;
    const { value } = this.state;

    const style = {
      position: "relative"
    };

    if (value) {
      style.backgroundImage = `url("${value}")`;
      style.backgroundRepeat = "no-repeat";
      style.backgroundPosition = "center";
      style.backgroundSize = "cover";
    }

    return (
      <div className={className} style={style}>
        <input
          ref={node => (this.fileInput = node)}
          type="file"
          onChange={this.handleFileChange}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0
          }}
        />
      </div>
    );
  }
}

export default ImageInput;
