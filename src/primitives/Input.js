import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import { spacing } from "../design-system/spacing";
import { font_family, font_weight, getFont } from "../design-system/font";
import {
  border_color,
  border_radius,
  border_thickness
} from "../design-system/border";
import { Icon } from "./Icon/icons";
import { color } from "../design-system/color";
import { Label, ErrorText } from "./Text";

const form_spacing = spacing.form;

// Function to generate padding depending on whether there is a left or right icon

function generatePadding(iconBefore, iconAfter) {
  if (iconBefore !== null && iconAfter !== null) {
    return `padding: ${form_spacing.regular.left_and_right_icon}`;
  } else if (iconBefore !== null && iconAfter === null) {
    return `padding: ${form_spacing.regular.left_icon}`;
  } else if (iconBefore === null && iconAfter !== null) {
    return `padding: ${form_spacing.regular.right_icon}`;
  } else {
    return `padding: ${form_spacing.regular.normal}`;
  }
}

function generateBorderRadius(addonBefore, addonAfter) {
  if (addonBefore !== null && addonAfter !== null) {
    return `border-radius: 0`;
  } else if (addonBefore !== null && addonAfter === null) {
    return `border-radius: 0 4px 4px 0`;
  } else if (addonBefore === null && addonAfter !== null) {
    return `border-radius: 4px 0 0 4px`;
  } else {
    return `border-radius: ${border_radius.default}`;
  }
}

const StyledInput = styled.input`
  font-family: ${font_family};
  ${getFont({ type: "regular_body" })}
  color: ${color.gray.primary};

  ${props => generatePadding(props.iconBefore, props.iconAfter)};
  ${props => generateBorderRadius(props.addonBefore, props.addonAfter)};

  border-width: ${border_thickness};
  border-style: solid;
  border-color: ${props =>
    props.isInvalid ? border_color.error : border_color.normal};

  margin: 0;
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  transition: all 0.1s cubic-bezier(0.4, 0, 0.23, 1);

  &:hover {
    border-color: ${props =>
      props.isInvalid ? border_color.error : border_color.hover};
  }

  &:focus {
    border-color: ${props =>
      props.isInvalid ? border_color.error : border_color.active};
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${border_color.normal};
    color: ${color.gray.faint};

    &::placeholder {
      color: ${color.gray.faint};
    }

    &:hover {
      border-color: ${border_color.normal};
    }
  }
`;

const InputDiv = styled.div`

    margin-top: ${props => props.marginTop};

  .Input__Addon-wrapper {
    display: flex;
    align-items: center;
  }

  .Input__Icon-and-Input-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;



    & .Icon {
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
    }

    & .icon-before {
      left: 12px;
    }

    & .icon-after {
      right: 12px;
    }
  }
  }
`;

const AddonDiv = styled.div`
  font-size: 16px;
  line-height: 46px;
  height: 48px;
  font-weight: ${font_weight.regular};
  display: inline-block;
  border-style: solid;
  padding: ${spacing.form.regular.normal};
  box-sizing: border-box;
  background-color: ${color.gray.ui_04};

  ${props =>
    props.isBefore &&
    `border-color: ${border_color.normal} transparent ${border_color.normal} ${
      border_color.normal
    };
      border-width: ${border_thickness} 0px ${border_thickness} ${border_thickness} ;
      border-radius: ${border_radius.addonBefore};`};

  ${props =>
    props.isAfter &&
    `border-color: ${border_color.normal} ${border_color.normal} ${
      border_color.normal
    } transparent;
      border-width: ${border_thickness}  ${border_thickness}  ${border_thickness}  0;
      border-radius: ${border_radius.addonAfter};`};

  ${props => props.isInvalid && `border-color: ${border_color.error}`};
`;

export function Input(props) {
  const {
    name,
    type,
    label,
    className,
    placeholder,
    value,
    errorMessage,
    iconBefore,
    iconAfter,
    marginTop,
    autoComplete,
    addonBefore,
    addonAfter,
    isInvalid,
    isDisabled,
    autoFocus,
    onChange,
    onBlur,
    innerRef,
    ...rest
  } = props;
  let extraProps = props.onKeyDown
    ? {
        onKeyDown: e => {
          if (e.keyCode === 13) {
            e.preventDefault();
            props.onKeyDown(e);
          }
        }
      }
    : {};
  return (
    <InputDiv marginTop={marginTop} className="InputWrapper">
      {label && <Label htmlFor={label}> {label} </Label>}

      <div className="Input__Addon-wrapper">
        {addonBefore && (
          <AddonDiv isBefore isInvalid={isInvalid}>
            {addonBefore}
          </AddonDiv>
        )}
        <div className="Input__Icon-and-Input-wrapper">
          {iconBefore && (
            <Icon
              className="icon-before"
              name={iconBefore}
              color={color.gray.faint}
            />
          )}
          <StyledInput
            id={label}
            addonBefore={addonBefore}
            className={`Input ${className}`}
            addonAfter={addonAfter}
            placeholder={placeholder}
            name={name}
            type={type}
            defaultValue={value}
            iconBefore={iconBefore}
            iconAfter={iconAfter}
            isInvalid={isInvalid}
            disabled={isDisabled}
            onChange={onChange}
            autoComplete={autoComplete ? "on" : "do-not-autoFill"}
            innerRef={innerRef}
            onBlur={onBlur}
            {...extraProps}
            spellCheck="false"
            {...rest}
          />
          {iconAfter && (
            <Icon
              className="icon-after"
              name={iconAfter}
              color={color.gray.faint}
            />
          )}
        </div>
        {addonAfter && <AddonDiv isAfter>{addonAfter}</AddonDiv>}
      </div>
      {isInvalid && <ErrorText errorMessage={errorMessage} />}
    </InputDiv>
  );
}

Input.defaultProps = {
  autoFocus: false,
  autoComplete: false,
  addonBefore: null,
  addonAfter: null,
  iconBefore: null,
  iconAfter: null,
  label: null,
  className: "",
  isDisabled: false,
  isInvalid: false,
  name: "form",
  placeholder: "Placeholder",
  errorMessage: "This field is required",
  type: "text",
  marginTop: "24px"
};

Input.propTypes = {
  iconBefore: propTypes.oneOfType([propTypes.string, propTypes.object]),
  iconAfter: propTypes.oneOfType([propTypes.string, propTypes.object]),
  label: propTypes.oneOfType([propTypes.string, propTypes.object]),
  isDisabled: propTypes.bool,
  isInvalid: propTypes.bool,
  name: propTypes.string,
  placeholder: propTypes.string,
  errorMessage: propTypes.string,
  type: propTypes.string,
  addonBefore: propTypes.oneOfType([
    propTypes.string,
    propTypes.node,
    propTypes.object
  ])
};
