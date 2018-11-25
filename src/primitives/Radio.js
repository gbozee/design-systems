import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import { font } from "../design-system/font";
import { spacing } from "../design-system/spacing";
import { border_color } from "../design-system/border";
import { color } from "../design-system/color";
import { Label } from "./Text";

const RadioDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  margin-top: ${props => props.marginTop};
  
  & .Radio__input {
    position: absolute;
    opacity: 0;

    & + .Radio__label {
      position: relative;
      padding: 4px;
      padding-left: 0px;
      display: flex;
      cursor: pointer;
      ${font.regular_body};
      width: 100%;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);

      &:hover {
        background-color: ${color.gray.ui_04};
      }

      &:before {
        content: "";
        margin-right: ${spacing.xxs};
        margin-bottom: 0;
        display: inline-block;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        min-width: 24px;
        min-height: 24px;
        background-color: #fff;
        border: 2px solid;
        border-color: ${props =>
          props.isInvalid ? border_color.error : border_color.normal};
        transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);
      }
    }

    &:hover {
      + .Radio__label:before {
        /* background-color: ${color.gray.ui_03}; */
      }
    }

    &:disabled:not(:checked) {
      + .Radio__label {
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
      + .Radio__label {
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
        height: 8px;
        width: 8px;
        background-color: white;
        left: 8px;
        top: 12px;
        border-color: white;
        border-radius: 50%;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);
      }
    }
  }
`;

// Radio Component

export function Radio(props) {
  const {
    name,
    children,
    isInvalid,
    isChecked,
    onChange,
    isDisabled,
    value,
    marginTop
  } = props;
  return (
    <RadioDiv isInvalid={isInvalid} marginTop={marginTop} className="Radio">
      <input
        id={value}
        type="radio"
        className="Radio__input"
        checked={isChecked}
        disabled={isDisabled}
        onChange={onChange}
        value={value}
        name={name}
      />
      <label className="Radio__label" htmlFor={value}>
        {children}
      </label>
    </RadioDiv>
  );
}

Radio.propTypes = {
  name: propTypes.string,
  children: propTypes.string,
  isInvalid: propTypes.bool,
  isChecked: propTypes.bool,
  onChange: propTypes.func,
  isDisabled: propTypes.bool,
  value: propTypes.string,
  marginTop: propTypes.string
};

/*
Radio Group Component
*/

class RadioGroup extends React.Component {
  state = {
    selectedValue: this.props.value || ""
  };

  onChange = e => {
    this.setState({ selectedValue: e.target.value }, () => {
      this.props.onChange(this.state.selectedValue);
    });
  };

  render() {
    const { options, label, marginTop, name } = this.props;
    return (
      <div style={{ marginTop: marginTop }}>
        {label && <Label>{label}</Label>}
        {options.map(item => (
          <Radio
            name={name}
            key={item.value}
            value={item.value}
            onChange={this.onChange}
            isChecked={item.value === this.state.selectedValue}
          >
            {item.label}
          </Radio>
        ))}
      </div>
    );
  }
}

RadioGroup.defaultProps = {
  options: [
    { label: "Option 1", value: "Option 1" },
    { label: "Option 2", value: "Option 2" }
  ],
  marginTop: "0"
};

RadioGroup.propTypes = {
  options: propTypes.arrayOf(propTypes.object).isRequired,
  label: propTypes.string.isRequired,
  marginTop: propTypes.string,
  name: propTypes.string.isRequired,
  value: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.object
  ])
};

export default RadioGroup;
