import React from "react";
import styled from "styled-components";
import { Label, ErrorText } from "./Text";
import { font_family, font } from "../design-system/font";
import { color } from "../design-system/color";
import { border_color } from "../design-system/border";
import { Icon } from "./Icon/icons";

export function convertArrayToObj(options) {
  var optionsObj = options.map(item => {
    var obj = { label: item, value: item };
    return obj;
  });

  return optionsObj;
}

const DropdownDiv = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: ${props => props.marginTop};

  .select-container {
    position: relative;
  }

  select {
    ${font.regular_body};
    font-family: ${font_family};
    display: inline-block;
    width: 100%;
    border-color: ${props =>
      props.isInvalid ? border_color.error : border_color.normal};
    border-width: 2px;
    outline: 0;
    border-radius: 4px;
    cursor: pointer;
    padding: 10px 15px;
    appearance: none;
    height: 48px;
    background-color: white;
    color: ${color.gray.primary} !important;

    /* option[disabled] {
      display: none;
      color: gray;
    } */

    &::-ms-expand {
      display: none;
    }

    &:hover {
      border-color: ${props =>
        props.isInvalid ? border_color.error : border_color.hover};
      box-shadow: none;
    }

    &:focus {
      border-color: ${border_color.active};
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  .select-arrow {
    position: absolute !important;
    top: 16px !important;
    right: 16px !important;
    line-height: 0 !important;
    pointer-events: none !important;
  }
`;

function getValueWithLabel(value, options) {
  if (value && value.hasOwnProperty("label")) {
    return value;
  }
  return options.find(x => x.value === value);
}

class DropdownNative extends React.Component {
  onChange = e => {
    this.props.onChange(e.target.value);
  };
  render() {
    const {
      name,
      label,
      className,
      marginTop,
      errorMessage,
      value,
      isDisabled,
      isInvalid,
      placeholder,
      options,
      innerRef,
      ...rest
    } = this.props;
    return (
      <DropdownDiv
        className={`Dropdown ${className}`}
        marginTop={marginTop}
        isInvalid={isInvalid}
      >
        {label && <Label>{label}</Label>}
        <div className="select-container">
          <select
            onBlur={this.onChange}
            disabled={isDisabled}
            name={name}
            ref={innerRef}
            data-test={rest["data-test"] || ""}
            defaultValue={value && value.value ? value.value : value}
          >
            <option
              selected={
                value && value.value
                  ? Boolean(value.value) === false
                  : Boolean(value) === false
              }
            >
              {placeholder}
            </option>
            {options.map(option => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Icon name="down-arrow" className="select-arrow" />
        </div>
        {isInvalid && errorMessage && <ErrorText errorMessage={errorMessage} />}
      </DropdownDiv>
    );
  }
}

DropdownNative.defaultProps = {
  label: null,
  // value: "",
  name: "dropdown",
  className: "",
  isDisabled: false,
  isInvalid: false,
  placeholder: "Select...",
  options: convertArrayToObj(["one", "two", "three"]),
  errorMessage: "This field is required",
  marginTop: "0px",
  onChange: selectedOption => {
    console.log(selectedOption);
  }
};

export default DropdownNative;
