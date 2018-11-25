import React from "react";
import styled, { css } from "styled-components";
import propTypes from "prop-types";
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

const StyledBadge = styled.span.attrs({ className: "Badge" })`
  display: inline-block;
  font-size: 12px;
  font-weight: normal;
  line-height: 1;
  min-width: 1px;
  text-align: center;
  border-radius: 2em;
  padding: 4px 8px;

  ${props => generateBgColor(props)};
`;

const Badge = ({ appearance, children, max, isBold }) => {
  let value = 0;
  if (children > max) {
    value = `${max}+`;
  } else {
    value = children;
  }
  return <StyledBadge {...{ appearance, isBold }}>{value}</StyledBadge>;
};

export default Badge;

Badge.propTypes = {
  children: propTypes.number.isRequired,
  isBold: propTypes.bool,
  max: propTypes.oneOfType([propTypes.number, propTypes.string]),
  appearance: propTypes.string
};

Badge.defaultProps = {
  max: 100
};
