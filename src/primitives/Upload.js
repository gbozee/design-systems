import React from "react";
import styled, { injectGlobal } from "styled-components";
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import { Text, Label } from "./Text";
import Spinner from "./Spinner";
import { Modal } from "./Modal";
import { Button, EmptyButton } from "./Button";
import Slider from "./Slider";
import { color } from "../design-system/color";
import { Icon } from "./Icon/icons";
import { spacing } from "../design-system/spacing";
import { uploadToCloudinary } from "./helpers";
import { border_color, border_radius } from "../design-system/border";
import { breakpoints } from "../design-system/breakpoints";
import placeholder from "../primitives/Avatar.png";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
.uploader__modal > .modal-body{
  padding-bottom: 24px;
}
`;

const PreviewDiv = styled.div`
  width: 120px;
  min-width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-color: ${color.gray.ui_03};
  background-position: center;
  border-radius: 100%;
`;

PreviewDiv.defaultProps = {
  bgImage:
    "https://cdn.resume.io/assets/avatar-blank-8dd0892f344fa2acba9f1d6acf96cb2366d2c824e816b3f2e8d7e05012ee2aae.png?version=fbc5a3846"
};

const ImageUploaderDiv = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: ${props => props.marginTop};

  .uploader__dropzone {
    display: flex;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding: ${spacing.default};
    border: 2px dashed ${border_color.normal};
    border-radius: ${border_radius.default};
    cursor: pointer;

    &:hover {
      border-color: ${border_color.hover};
    }

    .Spinner {
      margin: 0 auto;
    }

    @media (max-width: ${breakpoints.mobile}) {
      flex-direction: column;

      .Text {
        text-align: center;
      }
    }
  }

  .loading {
    display: flex;
    flex-flow: column nowrap;
  }

  .text-and-button {
    margin-left: ${spacing.m};

    @media (max-width: ${breakpoints.mobile}) {
      margin-left: 0;
      margin-top: 8px;
      max-width: 80%;

      button {
        width: 100%;
      }
    }
  }
`;

const DashboardImageUploaderContainer = styled(ImageUploaderDiv)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
  .uploader__dropzone {
    flex: 0 auto;
    padding: 0;
    border: none;
    border-radius: 0;
    flex: 0 295px;
    cursor: pointer;

    @media (max-width: ${breakpoints.mobile}) {
      flex: 0 auto;
    }

    .Spinner {
      margin: 0 auto;
    }

    .Button {
      margin-left: 32px;

      @media (max-width: ${breakpoints.mobile}) {
        margin-left: 0;
        margin-top: 8px;
      }
    }

    @media (max-width: ${breakpoints.mobile}) {
      flex-direction: column;
    }
  }
  .text-and-button {
    margin-left: 16px;
    flex: 1;

    @media (max-width: ${breakpoints.mobile}) {
      margin-left: 0;
    }
  }
`;

export class EmptyImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      showEditor: false,
      isLoading: false,
      image: this.props.image || null
    };
  }

  handleOpenModal = () => {
    this.setState({ showEditor: true });
  };

  handleCloseModal = () => {
    this.setState({ showEditor: false });
  };

  onDrop = files => {
    this.setState({
      files,
      showEditor: true
    });
  };

  handleSave = () => {
    this.setState({ showEditor: false, isLoading: true });
    const canvasScaled = this.imageEditor.getImageScaledToCanvas();
    let url = canvasScaled.toDataURL("image/png");
    this.handleUpload(url);
  };

  handleUpload = imgURL => {
    uploadToCloudinary(
      imgURL,
      cloudinaryURL => {
        this.setState({ image: cloudinaryURL, isLoading: false }, () => {
          this.props.onChange(this.state.image);
        });
      },
      error => {
        debugger;
        this.setState({ isLoading: false });
      }
    );
  };

  onDelete = () => {
    this.setState({
      image: ""
    });
  };

  render() {
    const { image, isLoading } = this.state;
    return (
      <React.Fragment>
        {this.props.render(image, isLoading, this.onDrop, this.onDelete)}
        <ImageEditor
          canvasRef={node => {
            this.imageEditor = node;
          }}
          onCloseEditor={this.handleCloseModal}
          showEditor={this.state.showEditor}
          image={this.state.files[0]}
          onClickSave={this.handleSave}
        />
      </React.Fragment>
    );
  }
}

export class DashboardImageUploader extends React.Component {
  render() {
    const { label, marginTop, image, onChange } = this.props;
    return (
      <EmptyImageUploader
        onChange={onChange}
        image={image || placeholder}
        render={(image, isLoading, onDrop, onDelete) => (
          <DashboardImageUploaderContainer marginTop={marginTop}>
            <Dropzone
              className="uploader__dropzone"
              onDrop={onDrop}
              accept="image/*"
              multiple={false}
            >
              <PreviewDiv bgImage={image || placeholder}>
                {isLoading && <Spinner size={40} color={color.cyan.primary} />}
              </PreviewDiv>

              <Button appearance="orange" onClick={e => e.preventDefault()}>
                Upload new
              </Button>
            </Dropzone>
            <div className="text-and-button">
              <Button
                appearance="gray"
                onClick={() => {
                  onDelete();
                  this.props.onDelete();
                }}
              >
                Delete
              </Button>
            </div>
          </DashboardImageUploaderContainer>
        )}
      />
    );
  }
}

DashboardImageUploader.defaultProps = {
  marginTop: "24px",
  label: "",
  onChange: () => {}
};

export class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      showEditor: false,
      isLoading: false,
      image: this.props.image || null
    };
  }

  handleOpenModal = () => {
    this.setState({ showEditor: true });
  };

  handleCloseModal = () => {
    this.setState({ showEditor: false });
  };

  onDrop = files => {
    this.setState({
      files,
      showEditor: true
    });
  };

  handleSave = () => {
    this.setState({ showEditor: false, isLoading: true });
    const canvasScaled = this.imageEditor.getImageScaledToCanvas();
    let url = canvasScaled.toDataURL("image/png");
    this.handleUpload(url);
  };

  handleUpload = imgURL => {
    uploadToCloudinary(
      imgURL,
      cloudinaryURL => {
        this.setState({ image: cloudinaryURL, isLoading: false }, () => {
          this.props.onChange(this.state.image);
        });
      },
      error => {
        debugger;
        this.setState({ isLoading: false });
      }
    );
  };

  render() {
    const { label, marginTop, render, children } = this.props;
    return (
      <ImageUploaderDiv marginTop={marginTop} className="ImageUploader">
        {label && <Label>{label}</Label>}
        <Dropzone
          className="uploader__dropzone"
          onDrop={this.onDrop}
          accept="image/*"
          multiple={false}
        >
          <PreviewDiv bgImage={this.state.image || this.props.image}>
            {this.state.isLoading && (
              <Spinner size={40} color={color.cyan.primary} />
            )}
          </PreviewDiv>

          <div className="text-and-button">
            {children}
            <Button
              onClick={e => e.preventDefault()}
              appearance="secondary"
              iconBefore="upload"
              marginTop="8px"
            >
              {this.state.image !== null ? "Change Photo" : "Upload Photo"}
            </Button>
          </div>
        </Dropzone>

        <ImageEditor
          canvasRef={node => {
            this.imageEditor = node;
          }}
          onCloseEditor={this.handleCloseModal}
          showEditor={this.state.showEditor}
          image={this.state.files[0]}
          onClickSave={this.handleSave}
        />
      </ImageUploaderDiv>
    );
  }
}

ImageUploader.defaultProps = {
  marginTop: "24px",
  label: "",
  children: <Text>Click to upload image or drag image here</Text>,
  onChange: () => {}
};

const ImageEditorDiv = styled.div`
  display: flex;
  justify-content: center;
  background-color: #000;
  width: calc(100% + 64px);
  margin-left: -32px;
  margin-top: -24px;

  .uploader__editor__cropper {
    transition: all 0.3s ease-in-out;

    &:hover {
      cursor: move;
    }
  }
`;

const ImageEditorControlDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 520px) {
    flex-direction: column;

    button,
    .Button {
      width: 100%;
    }
  }

  .uploader__editor__controls {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    justify-content: space-between;
    max-width: 420px;
    flex: 1;

    @media (max-width: 520px) {
      margin-bottom: 24px;
      max-width: unset;

      > .slider {
        width: 130% !important;
      }
    }

    .rotate-btn {
      flex-direction: column;
      padding: 12px;
      &:hover {
        background-color: ${color.gray.ui_03};
      }
    }

    > button:first-of-type {
      margin-right: 24px;
    }

    > .slider {
      max-width: 120px;
      margin-right: 24px;

      > label {
        font-size: 14px;
        line-height: normal;
      }
    }
  }
`;

export class ImageEditor extends React.Component {
  state = {
    zoomLevel: 1.2,
    orientation: 0
  };

  handleZoom = e => {
    const zoomLevel = e.target.value;
    this.setState({ zoomLevel });
  };

  handleRotateLeft = e => {
    e.preventDefault();
    this.setState(prevState => {
      return { orientation: prevState.orientation - 90 };
    });
  };

  handleRotateRight = e => {
    e.preventDefault();
    this.setState(prevState => {
      return { orientation: prevState.orientation + 90 };
    });
  };

  render() {
    const {
      image,
      canvasRef,
      width,
      height,
      onClickSave,
      cropperOverlayColor
    } = this.props;
    return (
      <React.Fragment>
        <Modal
          heading="Edit Photo"
          onCloseModal={this.props.onCloseEditor}
          showModal={this.props.showEditor}
          size="medium"
          className="uploader__modal"
        >
          <ImageEditorDiv>
            <AvatarEditor
              image={image}
              width={width}
              height={height}
              className="uploader__editor__cropper"
              borderRadius={250}
              ref={canvasRef}
              color={cropperOverlayColor}
              scale={this.state.zoomLevel}
              rotate={this.state.orientation}
            />
          </ImageEditorDiv>
          <br />
          <ImageEditorControlDiv>
            <div className="uploader__editor__controls">
              <Slider
                label="Zoom"
                step="0.01"
                min="1"
                max="2"
                name="zoom"
                defaultValue={this.state.zoomLevel}
                className="slider"
                onChange={this.handleZoom}
              />
              <EmptyButton
                className="rotate-btn"
                gray
                onClick={this.handleRotateLeft}
              >
                <Icon name="rotate-left" size={24} />
                <Text size="small" isBold align="center">
                  Rotate Left
                </Text>
              </EmptyButton>
              <EmptyButton
                className="rotate-btn"
                onClick={this.handleRotateRight}
              >
                <Icon name="rotate-right" size={24} />
                <Text size="small" isBold align="center">
                  Rotate Right
                </Text>
              </EmptyButton>
            </div>
            <Button className="save-btn" marginTop="0" onClick={onClickSave}>
              Save
            </Button>
          </ImageEditorControlDiv>
        </Modal>
        <GlobalStyle />
      </React.Fragment>
    );
  }
}

ImageEditor.defaultProps = {
  cropperOverlayColor: [0, 0, 0, 0.6],
  width: 250,
  height: 250
};
