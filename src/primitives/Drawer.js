import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { EmptyButton } from "./Button";
import { breakpoints } from "../design-system/breakpoints";
import { Text } from "./Text";
import { color } from "../design-system/color";
import Portal from "./Portal";
import { Backdrop } from "./Backdrop/Backdrop";
import { z_index } from "../design-system/z-index";
import { Icon } from "./Icon/icons";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body.Drawer__Body--open{
  overflow: hidden;
  position: relative;
  height: 100%;
}
`;

const DrawerDiv = styled.div`
  position: relative;
  z-index: ${z_index.drawer};

  .Drawer {
    display: flex;
    flex-flow: column nowrap;
    width: ${props => props.width};
    height: 100vh;
    overflow: auto;
    /* box-shadow: 2px 0 12px 0px rgba(0, 0, 0, 0.2); */
    background-color: white;
    /* text-align: center; */
    position: fixed;
    left: 0;
    top: 0;

    &__Close {
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      display: flex;
      flex-shrink: 0;
      flex-flow: row nowrap;
      padding-top: 16px;
      padding-bottom: 18px;
      width: 100%;
      border-radius: 0;
      border-bottom: 2px solid ${color.gray.ui_02};

      &:focus {
        box-shadow: none;
        background-color: ${color.gray.ui_03};
      }

      &:hover {
        background-color: ${color.gray.ui_03};
      }

      .Icon {
        margin-right: 8px;
        margin-left: -16px;
      }
    }

    &__Content {
      padding-top: 24px;
      flex: 1 1 0%;
      overflow: auto;
    }

    @media (max-width: ${breakpoints.mobile}) {
      width: 100%;
      flex-direction: column-reverse;

      &__Close {
        border-bottom: none;
        box-shadow: 0px -4px 8px 0px #0000000d;
        z-index: 2;
      }
    }

    &-enter {
      transform: translateX(-100%);
    }

    &-enter-active {
      transform: translateX(0);
      transition: transform 220ms cubic-bezier(0.2, 0, 0, 1);
    }

    &-exit {
      transform: translateX(0);
    }

    &-exit-active {
      transform: translateX(-100%);
      transition: transform 220ms cubic-bezier(0.2, 0, 0, 1);
    }
  }
`;

export class Drawer extends React.Component {
  componentDidMount = () => {
    document.addEventListener("click", this.handleClickOutside, true);
    window.addEventListener("keydown", this.handleKeyDown);
  };

  componentDidUpdate(prevProps) {
    const { isOpen, preventBodyScrollOnMount } = this.props;

    if (isOpen === false) {
      document.body.classList.remove("Drawer__Body--open");
    } else {
      if (preventBodyScrollOnMount) {
        document.body.classList.add("Drawer__Body--open");
      }
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener("click", this.handleClickOutside, true);
    window.removeEventListener("keydown", this.handleKeyDown);
  };

  handleClickOutside = e => {
    const domNode = ReactDOM.findDOMNode(this);
    const { shouldCloseOnOutsideClick, onClose } = this.props;

    if (
      (!domNode || !domNode.contains(e.target)) &&
      shouldCloseOnOutsideClick
    ) {
      onClose();
    }
  };

  handleKeyDown = e => {
    // If User Presses Escape Key, Close the Drawer
    if (e.keyCode === 27) {
      this.props.onClose();
    }
  };

  render() {
    const {
      width,
      children,
      showCloseButton,
      closeText,
      className,
      isOpen,
      onClose,
      showBackdrop,
      preventBodyScrollOnMount
    } = this.props;

    return (
      <DrawerDiv {...{ width, className }}>
        <CSSTransition
          classNames="Drawer"
          in={isOpen}
          timeout={300}
          unmountOnExit
        >
          {status => (
            <div className="Drawer">
              {showCloseButton && (
                <EmptyButton className="Drawer__Close" onClick={onClose}>
                  <Icon name="left-arrow" />
                  <Text isBold>{closeText}</Text>
                </EmptyButton>
              )}
              <div className="Drawer__Content">
                {typeof children === "function" ? children(status) : children}
              </div>
            </div>
          )}
        </CSSTransition>

        <Portal>
          <Backdrop showBackdrop={showBackdrop} />
        </Portal>
        <GlobalStyle />
      </DrawerDiv>
    );
  }
}

Drawer.defaultProps = {
  width: "256px",
  preventBodyScrollOnMount: false,
  children: "Drawer Content",
  closeText: "Close Drawer",
  showBackdrop: false,
  isOpen: true,
  shouldCloseOnOutsideClick: true,
  showCloseButton: true
};

export default Drawer;
