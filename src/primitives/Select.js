import React from "react";
import Select, { components } from "react-select";
import styled from "styled-components";
import { Label, ErrorText } from "./Text";
import { font_weight, font_family } from "../design-system/font";
import { color } from "../design-system/color";
import { border_color, border_thickness } from "../design-system/border";
import { box_shadow } from "../design-system/box-shadow";
import { Icon } from "./Icon/icons";

const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <Icon name="down-arrow" />
      </components.DropdownIndicator>
    )
  );
};
export const RegularSelect = styled.select`
  border-color: ${props =>
    props.isInvalid ? border_color.error : border_color.normal};
  border-width: ${border_thickness};
  font-size: 16px;
  line-height: 24px;
  box-shadow: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);
  min-height: unset;
  padding: 0 12px;
  height: 48px;
  background-color: white;

  &:hover {
    border-color: ${props =>
      props.isInvalid ? border_color.error : border_color.hover};
    box-shadow: none;
  }

  &--is-focused {
    border-color: ${border_color.active};

    &:hover {
      border-color: ${border_color.active};
    }
  }
`;
const StyledSelect = styled(Select)`
  font-family: ${font_family};

  .react-select {
    &__control {
      border-color: ${props =>
        props.isInvalid ? border_color.error : border_color.normal};
      border-width: ${border_thickness};
      font-size: 16px;
      line-height: 24px;
      box-shadow: none;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);
      min-height: unset;
      padding: 0 12px;
      height: 48px;
      background-color: white;

      &:hover {
        border-color: ${props =>
          props.isInvalid ? border_color.error : border_color.hover};
        box-shadow: none;
      }

      &--is-focused {
        border-color: ${border_color.active};

        &:hover {
          border-color: ${border_color.active};
        }
      }
    }

    &__indicator-separator {
      display: none;
    }

    &__option {
      cursor: pointer;
      padding: 16px 8px;
      color: ${color.gray.primary};
      font-weight: ${font_weight.regular} !important;

      &--is-focused {
        background-color: ${color.gray.ui_03} !important;
      }

      &--is-selected {
        background-color: ${color.gray.ui_03} !important;
      }
    }

    &__menu {
      border-radius: 4px;
      border: 0;
      box-shadow: ${box_shadow.dropdown};
    }

    &__value-container {
      padding: 0;

      > div {
        padding: 0;
        margin: 0;
      }
    }

    &__dropdown-indicator {
      padding: 0;
    }

    &__single-value {
      color: ${color.gray.primary};
      font-weight: ${font_weight.regular} !important;
    }

    &__placeholder {
      color: ${color.gray.light};
      font-weight: ${font_weight.regular} !important;
    }

    &__input {
      margin: 0;
      padding: 0;
      font-family: ${font_family};

      > input {
        font-family: ${font_family};
        color: ${color.gray.primary} !important;
        font-weight: ${font_weight.regular} !important;
        position: relative !important;
        top: -2px !important;
      }
    }
  }
`;

export function convertArrayToObj(options) {
  var optionsObj = options.map(item => {
    var obj = { label: item, value: item };
    return obj;
  });

  return optionsObj;
}

const DropdownDiv = styled.div`
  margin-top: ${props => props.marginTop};
`;

function getValueWithLabel(value, options) {
  if (value && value.hasOwnProperty("label")) {
    return value;
  }
  return options.find(x => x.value === value);
}
let noOptionsMessage = () => null;
let componentProps = { DropdownIndicator };
function Dropdown(props) {
  const {
    name,
    label,
    className,
    marginTop,
    errorMessage,
    value,
    onChange,
    isDisabled,
    isInvalid,
    isSearchable,
    placeholder,
    options,
    innerRef,
    ...rest
  } = props;
  return (
    <DropdownDiv
      {...rest}
      className={`Dropdown ${className}`}
      marginTop={marginTop}
    >
      {label && <Label>{label}</Label>}
      <StyledSelect
        name={name}
        onChange={onChange}
        className="Select"
        classNamePrefix="react-select"
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isMulti={false}
        placeholder={placeholder}
        isClearable={false}
        isSearchable={isSearchable}
        loadingMessage={null}
        options={options}
        minMenuHeight={200}
        menuPosition="relative"
        menuPlacement="auto"
        defaultValue={getValueWithLabel(value, options)}
        value={getValueWithLabel(value, options)}
        components={componentProps}
        noOptionsMessage={noOptionsMessage}
        innerRef={innerRef}
      />
      {isInvalid && errorMessage && <ErrorText errorMessage={errorMessage} />}
    </DropdownDiv>
  );
}

Dropdown.defaultProps = {
  label: null,
  value: null,
  name: "dropdown",
  className: "",
  isDisabled: false,
  isInvalid: false,
  isSearchable: false,
  placeholder: "Select...",
  options: convertArrayToObj(["one", "two", "three"]),
  errorMessage: "This field is required",
  marginTop: "0px",
  onChange: (selectedOption, actionMeta) => {
    console.log(selectedOption);
  }
};

export default Dropdown;
