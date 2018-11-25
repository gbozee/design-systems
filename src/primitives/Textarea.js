import React from "react";
import styled from "styled-components";
import { font_family, font } from "../design-system/font";
import { color } from "../design-system/color";
import { border_color, border_thickness } from "../design-system/border";
import { Label, ErrorText } from "./Text";
import propTypes from "prop-types";

const TextareaDiv = styled.div`
  margin-top: ${props => props.marginTop};

  > textarea {
    font-family: ${font_family};
    ${font.regular_body};
    padding: 16px;
    background-color: white;
    border-width: ${border_thickness} !important;
    border-style: solid !important;
    border-color: ${props =>
      props.isInvalid ? border_color.error : border_color.normal} !important;
    color: ${color.gray.primary};
    transition: all 0.1s cubic-bezier(0.4, 0, 0.23, 1);
    border-radius: 4px;
    height: ${props => props.height};
    min-height: 40px;
    overflow: auto;
    width: 100%;
    resize: vertical;

    &:hover {
      border-color: ${props =>
        props.isInvalid ? border_color.error : border_color.hover} !important;
    }

    &:focus {
      border-color: ${props =>
        props.isInvalid ? border_color.error : border_color.active} !important;
      outline: none;
    }
  }
`;

export function Textarea(props) {
  const {
    placeholder,
    onChange,
    value,
    className,
    onFocus,
    onBlur,
    isInvalid,
    height,
    label,
    innerRef,
    errorMessage,
    marginTop,
    isDisabled
  } = props;
  return (
    <TextareaDiv
      {...{
        marginTop,
        isInvalid,
        height,
        className: `TextEditor ${className}`
      }}
    >
      {label && <Label htmlFor={label}> {label} </Label>}
      <textarea
        {...{
          onFocus,
          onBlur,
          ref: innerRef,
          disabled: isDisabled,
          placeholder,
          isInvalid,
          onChange,
          defaultValue: value,
          height,
          rows: 1
        }}
      />
      {isInvalid && <ErrorText errorMessage={errorMessage} />}
    </TextareaDiv>
  );
}

Textarea.defaultProps = {
  placeholder: "Type something",
  isInvalid: false,
  className: "",
  height: "240px",
  marginTop: "32px",
  errorMessage: "This field is required"
};

Textarea.propTypes = {
  label: propTypes.string,
  placeholder: propTypes.string,
  value: propTypes.string,
  className: propTypes.string,
  onFocus: propTypes.func,
  onBlur: propTypes.func,
  onChange: propTypes.func,
  height: propTypes.string,
  innerRef: propTypes.func,
  errorMessage: propTypes.string,
  marginTop: propTypes.string,
  isInvalid: propTypes.bool,
  isDisabled: propTypes.bool
};

export default Textarea;
