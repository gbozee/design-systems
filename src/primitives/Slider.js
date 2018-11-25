import React from "react";
import styled from "styled-components";
import { color } from "../design-system/color";
import { box_shadow } from "../design-system/box-shadow";
import { Label } from "./Text";

const sliderThumbCSS = `
  height: 24px;
  width: 24px;
  border-radius: 100%;
  background: #ffffff;
  cursor: pointer;
  border: 2px solid transparent;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.31) 0px 0px 1px;
  transition: border-color 0.2s cubic-bezier(0.4, 0, 0.23, 1) 0s;
`;

const sliderTrackCSS = `
  width: 100%;
  height: 4px;
  cursor: pointer;
  background: ${color.cyan.primary};
  border-radius: 4px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);
`;

const SliderDiv = styled.div`
  margin-bottom: 8px;

  input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    background: transparent;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
    }

    &::-ms-track {
      width: 100%;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      color: transparent;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      margin-top: -10px;
      ${sliderThumbCSS};
    }

    &::-moz-range-thumb {
      ${sliderThumbCSS};
    }

    &::-ms-thumb {
      ${sliderThumbCSS};
    }

    &::-webkit-slider-runnable-track {
      ${sliderTrackCSS};
    }

    &::-moz-range-track {
      ${sliderTrackCSS};
    }

    &:focus {
      outline: 0;

      &::-webkit-slider-runnable-track {
        background: ${color.cyan.dark};
      }

      &::-webkit-slider-thumb {
        border-color: ${color.cyan.light};
      }
    }

    &::-ms-track {
      width: 100%;
      height: 4px;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      border-width: 8px 0;
      color: transparent;
    }
    &::-ms-fill-lower {
      background: ${color.cyan.primary};
      border-radius: 4px;
    }
    &:focus::-ms-fill-lower {
      background: ${color.cyan.dark};
    }
    &::-ms-fill-upper {
      background: ${color.cyan.primary};
      border-radius: 4px;
    }
    &:focus::-ms-fill-upper {
      background: ${color.cyan.dark};
    }
  }
`;

class Slider extends React.Component {
  render() {
    const {
      onChange,
      className,
      min,
      max,
      step,
      label,
      name,
      defaultValue
    } = this.props;
    return (
      <SliderDiv className={className}>
        {label && <Label>{label}</Label>}
        <input
          type="range"
          min={min}
          max={max}
          name={name}
          step={step}
          onChange={onChange}
          defaultValue={defaultValue}
        />
      </SliderDiv>
    );
  }
}

Slider.defaultProps = {
  min: "1",
  max: "2",
  step: "0.01",
  defaultValue: "1.2"
};

export default Slider;
