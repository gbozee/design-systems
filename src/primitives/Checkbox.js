import React from "react";
import styled, { css } from "styled-components";
import propTypes from "prop-types";
import { font } from "../design-system/font";
import { spacing } from "../design-system/spacing";
import { border_color } from "../design-system/border";
import { color } from "../design-system/color";

function generateSize(props) {
  if (props.size === "small") {
    return css`
      width: 18px;
      height: 18px;
      border-radius: 2px;
    `;
  } else if (props.size === "regular") {
    return css`
      width: 24px;
      height: 24px;
      border-radius: 4px;
    `;
  } else {
    return;
  }
}

function generateCheckmarkPosition(props) {
  if (props.size === "small") {
    return css`
      left: 3px;
      top: 9px;
    `;
  } else if (props.size === "regular") {
    return css`
      left: 6px;
      top: 12px;
    `;
  } else {
    return;
  }
}

const CheckboxDiv = styled.div.attrs({ className: "Checkbox" })`
  display: flex;
  align-items: center;
  margin-top: ${props => props.marginTop};
  
  & .checkbox-input {
    position: absolute;
    opacity: 0;

    & + label {
      position: relative;
      padding: 4px;
      padding-left: 0px;
      display: flex;
      cursor: pointer;
      ${props =>
        props.size === "small" ? font.small_body : font.regular_body};
      width: 100%;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);

      /* &:hover {
        background-color: ${color.gray.ui_04};
      } */

      &:before {
        content: "";
        margin-right: ${spacing.xxs};
        margin-bottom: 0;
        display: inline-block;

        ${props => generateSize(props)};
       
       flex-shrink: 0;
        background-color: #fff;
        border: 2px solid;
        border-color: ${props =>
          props.isInvalid ? border_color.error : border_color.normal};
          transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);
      }
    }

    &:hover {
      + label:before {
        border-color: ${color.gray.ui_01};
      }
    }

    &:disabled:not(:checked) {
      + label {
        color: ${color.gray.faint};
        cursor: not-allowed;

        &:before {
          border: transparent;
          background-color: ${color.gray.ui_02};
          cursor: not-allowed;
        }
      }
    }

    &:disabled:checked {
      + label {
        color: ${color.gray.faint};
        cursor: not-allowed;

        &:before {
          background-color: ${color.cyan.faint};
          border-color: ${color.cyan.faint};
          cursor: not-allowed;
        }
      }
    }

    &:focus {
      + label:before {
        box-shadow: 0 0 0 2px ${color.cyan.faint};
        border-color: ${color.cyan.primary};
      }
    }

    &:checked {
      + label:before {
        background-color: ${color.cyan.primary};
        border-color: ${color.cyan.primary};
      }

      + label:after {
        content: "";
        position: absolute;
        height: 6px;
        width: 12px;
        border-left: 2px solid;
        border-bottom: 2px solid;
        transform: rotate(-45deg);

        ${props => generateCheckmarkPosition(props)};
        
        border-color: white;
        border-radius: 0 2px;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);
      }
    }
  }
`;

export function Checkbox(props) {
  const {
    name,
    size,
    children,
    isInvalid,
    isChecked,
    isDisabled,
    onChange,
    marginTop,
    innerRef
  } = props;
  return (
    <CheckboxDiv {...{ isInvalid, marginTop, size }}>
      <input
        id={name}
        type="checkbox"
        className="checkbox-input"
        defaultChecked={isChecked}
        onChange={onChange}
        disabled={isDisabled}
        name={name}
        ref={innerRef}
      />
      <label htmlFor={name} id={name}>
        {children}
      </label>
    </CheckboxDiv>
  );
}

Checkbox.defaultProps = {
  children: "Checkbox Label",
  marginTop: "0",
  size: "regular",
  isChecked: false,
  isInvalid: false,
  isDisabled: false,
  onChange: () => {}
};

Checkbox.propTypes = {
  isChecked: propTypes.bool,
  size: propTypes.oneOf(["small", "regular"]),
  isInvalid: propTypes.bool,
  marginTop: propTypes.string,
  onChange: propTypes.func,
  isDisabled: propTypes.bool,
  name: propTypes.string.isRequired,
  children: propTypes.oneOfType([propTypes.node, propTypes.string])
};
