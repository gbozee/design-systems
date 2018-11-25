import React from "react";
import styled, { injectGlobal } from "styled-components";
import { Manager, Reference, Popper } from "react-popper";
import propTypes from "prop-types";
import { color } from "../design-system/color";
import { font_family, font_weight } from "../design-system/font";
import { CSSTransition } from "react-transition-group";
import Portal from "./Portal";

injectGlobal`

.Tooltip-enter {
      opacity: 0.01;
      transform: scale(0.1)
    }

    .Tooltip-enter-active {
      opacity: 1;
      transform: scale(1);
      transition: opacity 300ms cubic-bezier(0.2, 0, 0, 1);
    }

    .Tooltip-exit {
      opacity: 1;
      transform: scale(1);
    }

    .Tooltip-exit-active {
      opacity: 0.01;
      transform: scale(0.1);
      transition: opacity 300ms cubic-bezier(0.2, 0, 0, 1);
    }

`;

const modifiers = {
  preventOverflow: { enabled: true }
};

const Tip = styled.div`
  border-radius: 2px;
  padding: 4px 6px;
  background-color: ${props => props.bgColor};
  color: #fff;
  border-radius: 3px;
  font-family: ${font_family};
  font-size: 13px;
  font-weight: ${font_weight.regular};
  line-height: 16px;
  user-select: none;

  @media (max-width: 768px) {
    display: none;
  }

  &[data-placement^="top"] {
    margin-bottom: ${props => (props.showTip ? "10px" : "5px")};
  }

  &[data-placement^="left"] {
    margin-right: ${props => (props.showTip ? "10px" : "5px")};
  }

  &[data-placement^="right"] {
    margin-left: ${props => (props.showTip ? "10px" : "5px")};
  }

  &[data-placement^="bottom"] {
    margin-top: ${props => (props.showTip ? "10px" : "5px")};
  }

  &[data-x-out-of-boundaries] {
    display: none;
  }

  .Popper__arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
  }

  .Popper__arrow {
    &[data-placement^="left"] {
      border-width: 5px 0 5px 5px;
      border-color: transparent transparent transparent
        ${props => props.bgColor};
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }

    &[data-placement^="top"] {
      border-width: 5px 5px 0 5px;
      border-color: ${props => props.bgColor} transparent transparent
        transparent;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }

    &[data-placement^="right"] {
      border-width: 5px 5px 5px 0;
      border-color: transparent ${props => props.bgColor} transparent
        transparent;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }

    &[data-placement^="bottom"] {
      border-width: 0 5px 5px 5px;
      border-color: transparent transparent ${props => props.bgColor}
        transparent;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }
`;

class Tooltip extends React.Component {
  state = {
    showTooltip: false
  };

  showTooltip = () => {
    setTimeout(() => this.setState({ showTooltip: true }), this.props.delay);
  };

  hideTooltip = () => {
    setTimeout(() => this.setState({ showTooltip: false }), this.props.delay);
  };

  render() {
    const {
      content,
      children,
      placement,
      showTip,
      bgColor,
      hideTooltipOnClick
    } = this.props;
    const { showTooltip } = this.state;
    console.log(children.props);
    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <span
              ref={ref}
              onMouseOver={this.showTooltip}
              onMouseLeave={this.hideTooltip}
              onKeyDown={() => {
                if (hideTooltipOnClick) {
                  this.hideTooltip();
                }
              }}
              onFocus={this.showTooltip}
              onBlur={this.hideTooltip}
              onClick={() => {
                if (hideTooltipOnClick) {
                  this.hideTooltip();
                }
              }}
              role="tooltip"
            >
              {children}
            </span>
          )}
        </Reference>
        <Portal>
          <CSSTransition
            classNames="Tooltip"
            in={showTooltip}
            timeout={300}
            unmountOnExit
          >
            <Popper
              className="Tooltip"
              placement={placement}
              modifiers={modifiers}
              eventsEnabled={true}
            >
              {({ ref, style, placement, arrowProps, outOfBoundaries }) => (
                <Tip
                  innerRef={ref}
                  data-placement={placement}
                  style={style}
                  bgColor={bgColor}
                  showTip={showTip}
                >
                  {content}
                  {showTip && (
                    <div
                      data-placement={placement}
                      className="Popper__arrow"
                      ref={arrowProps.ref}
                      style={arrowProps.style}
                    />
                  )}
                </Tip>
              )}
            </Popper>
          </CSSTransition>
        </Portal>
      </Manager>
    );
  }
}

Tooltip.defaultProps = {
  content: "This is the tooltip",
  placement: "bottom",
  children: <button>Welcome</button>,
  showTip: false,
  delay: 100,
  hideTooltipOnClick: true,
  bgColor: color.gray.primary
};

Tooltip.propTypes = {
  placement: propTypes.oneOf([
    "left",
    "right",
    "bottom",
    "auto",
    "top",
    "right-end",
    "right-start",
    "left-end",
    "left-start",
    "bottom-end",
    "bottom-start",
    "top-end",
    "top-start",
    "auto-start",
    "auto-end"
  ])
};

export default Tooltip;
