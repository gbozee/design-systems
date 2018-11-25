import React from "react";
import styled, { css, createGlobalStyle } from "styled-components";
import ReactModal from "react-modal";
import { Button, EmptyButton } from "./Button";
import { Icon } from "./Icon/icons";
import { Heading, Text } from "./Text";
import { breakpoints } from "../design-system/breakpoints";
import { focus_states } from "../design-system/border";
import { color } from "../design-system/color";
import { z_index } from "../design-system/z-index";
ReactModal.setAppElement("#root");

const GlobalStyle = createGlobalStyle`
.ReactModal__Body--open{
  overflow: hidden;
}

.ReactModalPortal{
  & .ReactModal__Content {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity .3s ease-in-out, transform .6s cubic-bezier(0,0,0,1);
    
    &--after-open {
      transform: scale(1);
      opacity: 1;
    }
    
    &--before-close {
      transform: scale(1);
      opacity: 0;
    }
  }
  
  & .ReactModal__Overlay {
    opacity: 0;
    overflow-y: auto;
    background: rgba(0, 0, 0, 0.6) !important;
    transition: opacity 200ms ease-in-out;
    padding: 40px 0;
    z-index: ${z_index.modal}

    &--after-open {
      opacity: 1;
    }

    &--before-close {
      opacity: 0;
    }

  }

  .confirm{
    &__btn-group {
      display: flex;
      justify-content: flex-end;
      margin-top: 24px;

      &__primary-btn {
        margin-left: 16px;
      }
    }
  }  
}
`;

const modalSize = {
  l: "800px",
  m: "640px",
  default: "560px",
  s: "480px"
};

function getModalWidth(props) {
  switch (props.size) {
    case "small":
      return css`
        ${modalSize.s};
      `;
    case "medium":
      return css`
        ${modalSize.m};
      `;
    case "big":
      return css`
        ${modalSize.l};
      `;
    default:
      return css`
        ${modalSize.default};
      `;
  }
}

const fullWidthModal = `
  border-radius: 0;
    max-width: 100%;
    height: 100vh;
    margin: -40px 0;
`;

export const StyledModal = styled(ReactModal)`
  background-color: ${props => props.bgColor};
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: none;
  overflow: auto;
  border-radius: 4px;
  margin: 0 auto;
  max-width: ${props => getModalWidth(props)};

  &:focus {
    outline: none;
  }

  ${props =>
    props.isFullScreenOnMobile &&
    `
      @media (max-width: ${breakpoints.mobile}) {
        ${fullWidthModal};
      }
  `};

  ${props =>
    props.isFullScreen &&
    `
      ${fullWidthModal}
  `};

  & .modal-header {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    padding: 24px 20px 24px 32px;
    border-bottom: 1px solid #ebebeb;

    &__title {
      flex: 1;
      font-size: 20px;
    }

    &__close-btn {
      border-radius: 100%;
      padding: 8px;

      ${focus_states.modal_close_button};

      ${props =>
        props.isFullScreen &&
        `
        position: absolute;
        z-index: 200;
        right: 24px;
        top: 24px;
      `};

      ${props =>
        !props.showCloseIcon &&
        `
        display: none;
      `};
    }
  }

  ${props =>
    !props.isFullScreen &&
    `
    & .modal-body {
      padding: 24px 32px 40px;
    }
  
  `};
`;

export class Modal extends React.Component {
  render() {
    const {
      className,
      size,
      heading,
      children,
      bgColor,
      closeIconColor,
      showModal,
      showCloseIcon,
      isFullScreen,
      onCloseModal,
      isFullScreenOnMobile,
      domNode
    } = this.props;
    const closeIcon = (
      <EmptyButton onClick={onCloseModal} className="modal-header__close-btn">
        <Icon color={closeIconColor} name="close" size={24} />
      </EmptyButton>
    );
    let RComponent = domNode ? StyledModal.withComponent(domNode) : StyledModal;
    return (
      <>
        <GlobalStyle />
        <RComponent
          isOpen={showModal}
          className={className}
          contentLabel="Modal Example"
          onRequestClose={onCloseModal}
          shouldCloseOnOverlayClick={false}
          closeTimeoutMS={150}
          role="dialog"
          {...{
            isFullScreenOnMobile,
            showCloseIcon,
            isFullScreen,
            size,
            bgColor
          }}
        >
          {!isFullScreen ? (
            <div className="modal-header">
              <Heading size="small" isBold className="modal-header__title">
                {heading}
              </Heading>

              {closeIcon}
            </div>
          ) : (
            closeIcon
          )}

          <div className="modal-body">{children}</div>
        </RComponent>
      </>
    );
  }
}

Modal.defaultProps = {
  heading: "Modal Heading",
  children: <Text>This is the default Modal content</Text>,
  isFullScreenOnMobile: true,
  size: "regular",
  bgColor: "white",
  closeIconColor: color.gray.primary,
  showCloseIcon: true,
  domNode: null
};

/*
 *  Confirm Modal Component
 */

export class Confirm extends React.Component {
  render() {
    const {
      heading,
      showModal,
      description,
      onCloseModal,
      onConfirm
    } = this.props;
    return (
      <div className="confirm">
        <Modal
          heading={heading}
          showModal={showModal}
          onCloseModal={onCloseModal}
          isFullScreenOnMobile={false}
        >
          <Text>{description}</Text>
          <div className="confirm__btn-group">
            <Button
              className="confirm__btn-group__secondary-btn"
              appearance="gray"
              onClick={onCloseModal}
            >
              Cancel
            </Button>
            <Button
              appearance="secondary"
              className="confirm__btn-group__primary-btn"
              onClick={() => {
                onConfirm();
                onCloseModal();
              }}
            >
              Delete
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

Confirm.defaultProps = {
  heading: "Title",
  description: "Are you sure?",
  onCancelClick: () => {},
  onConfirm: () => {}
};

export class ToggleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  onOpenModal = () => {
    this.setState({ showModal: true });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.children(
          this.state.showModal,
          this.onOpenModal,
          this.onCloseModal
        )}
      </React.Fragment>
    );
  }
}
