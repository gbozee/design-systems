import React from "react";
import styled, { css } from "styled-components";
import proptypes from "prop-types";
import { font_weight } from "../design-system/font";
import { color } from "../design-system/color";

function generateBgColor(props) {
  switch (props.appearance) {
    case "green":
      return css`
        background-color: ${props => (props.isBold ? "#00875a" : "#e3fcef")};
        color: ${props => (props.isBold ? "#fff" : "#064")};
      `;
    case "red":
      return css`
        background-color: ${props =>
          props.isBold ? color.red.primary : color.red.ui_02};
        color: ${props => (props.isBold ? "#fff" : color.red.primary)};
      `;
    case "orange":
      return css`
        background-color: ${props =>
          props.isBold ? color.orange.primary : color.orange.faint};
        color: ${color.gray.primary};
      `;
    case "cyan":
      return css`
        background-color: ${props =>
          props.isBold ? color.cyan.primary : color.cyan.ui_02};
        color: ${props => (props.isBold ? "white" : color.cyan.dark)};
      `;
    case "purple":
      return css`
        background-color: ${props => (props.isBold ? "#5243aa" : "#5243aa3b")};
        color: ${props => (props.isBold ? "white" : " #5243aa")};
      `;
    default:
      return css`
        background-color: ${props =>
          props.isBold ? color.gray.primary : color.gray.ui_02};
        color: ${props => (props.isBold ? "white" : color.gray.primary)};
      `;
  }
}

const StyledLozenge = styled.span.attrs({ className: "Lozenge" })`
  box-sizing: border-box;
  display: inline-block;
  font-size: 12px;
  font-weight: ${font_weight.medium};
  max-width: 100%;
  text-transform: uppercase;
  vertical-align: baseline;
  border-radius: 2px;
  padding: 2px;
  letter-spacing: 0.2px;

  ${props => generateBgColor(props)};

  .Lozenge__text {
    display: inline-block;
    vertical-align: top;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
    max-width: ${props => props.maxWidth};
    width: 100%;
    overflow: hidden;
    padding: 0px 4px;
  }
`;

function Lozenge({ children, appearance, maxWidth, isBold, className }) {
  return (
    <StyledLozenge {...{ appearance, maxWidth, className, isBold }}>
      <span className="Lozenge__text">{children}</span>
    </StyledLozenge>
  );
}

Lozenge.propType = {
  appearance: proptypes.oneOf([
    "green",
    "orange",
    "red",
    "purple",
    "cyan",
    "gray"
  ]),
  isBold: proptypes.bool,
  maxWidth: proptypes.string,
  className: proptypes.string,
  children: proptypes.oneOfType([proptypes.string, proptypes.node])
};

Lozenge.defaultProps = {
  maxWidth: "200px",
  className: ""
};

export default Lozenge;
