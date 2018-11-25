import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import {
  font_face,
  font_family,
  font_weight,
  font_size,
  getFont
} from "../design-system/font";
import { color, text_color } from "../design-system/color";
import { box_shadow } from "../design-system/box-shadow";

export const AddressGlobalDropdownStyle = `
.pac-container {
  font-family: ${props => (props.theme || { font_family }).font_family};
  font-size: ${font_size.default};
  border-radius: 4px;
  box-shadow: ${box_shadow.dropdown};
}

.pac-container .pac-item .pac-icon {
  background-image: none;
  display: none;
}

.pac-container .pac-item {
  color: ${color.gray.primary} !important;
  padding: 8px 16px;
  ${getFont({ type: "regular_body" })};
  border: none;

  &:hover{
    background-color: ${color.gray.ui_03};
    cursor: pointer;
  }

  &.pac-item-selected{
    background-color: ${color.gray.ui_03};
  }

  .pac-item-query {
    font-size: ${font_size.default};
    padding-right: 3px;
    color: ${color.gray.primary};
  }

  .pac-matched {
      font-weight: ${font_weight.medium};
  }

}
`;

// Inject the @font-face and reset text globally
export const GlobalStyle = createGlobalStyle`
  ${props => (props.theme || { font_face }).font_face};

  html {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -ms-overflow-style: scrollbar;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body{
    margin: 0;
    font-family: ${props => (props.theme || { font_family }).font_family};
    color: ${props =>
      (props.theme || { default_color: text_color.primary }).default_color};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizelegibility;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  ::selection{
    background: ${props =>
      (props.theme || { selection: color.cyan.ui_01 }).selection};  
  }



  h1, h2, h3, h4, h5, h6, p, ul{
    margin: 0;
    padding: 0;
  }

  a{
    text-decoration: none;
    color: inherit;
  }

${AddressGlobalDropdownStyle}
`;
