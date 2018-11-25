import React from "react";
import styled from "styled-components";
import { color } from "../design-system/color";
import propTypes from "prop-types";

const Label = styled.label`
  display: inline-block;
  padding: 2px;
  cursor: pointer;

  .ToggleLabel {
    margin-left: 8px;
    user-select: none;
  }

  .Slide {
    background-color: ${color.gray.light};
    display: inline-block;
    vertical-align: middle;
    position: relative;
    height: 20px;
    width: 40px;
    border-radius: 20px;
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    border-image: initial;
    padding: 2px;
    transition: all 0.2s ease 0s;

    &__handle {
      background-color: white;
      height: 16px;
      bottom: 0;
      left: 0;
      width: 16px;
      position: absolute;
      border-radius: 50%;
      transition: all 0.2s ease 0s;
    }
  }

  input[type="checkbox"] {
    opacity: 0;
    position: absolute;

    &:focus {
      & + .Slide {
        box-shadow: 0 0 0 4px ${color.cyan.faint};
      }
    }

    &:checked {
      & + .Slide {
        background-color: ${color.cyan.primary};
        > div {
          transform: translateX(20px);
        }
      }
    }

    &:disabled:not(:checked) {
      & + .Slide {
        background-color: ${color.gray.ui_02};
        cursor: initial;
      }
    }

    &:disabled:checked {
      & + .Slide {
        background-color: ${color.cyan.faint};
        cursor: initial;
      }
    }
  }
`;

export function Toggle({ name, label, onChange, isChecked, isDisabled }) {
  return (
    <Label htmlFor={name} className="Toogle">
      <input
        type="checkbox"
        id={name}
        defaultChecked={isChecked}
        onChange={onChange}
        disabled={isDisabled}
      />
      <div className="Slide">
        <div className="Slide__handle" />
      </div>
      {label && <span className="ToggleLabel">{label}</span>}
    </Label>
  );
}

Toggle.propTypes = {
  name: propTypes.string,
  label: propTypes.string,
  onChange: propTypes.func,
  isChecked: propTypes.bool,
  isDisabled: propTypes.bool
};
