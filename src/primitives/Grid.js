import styled, { css } from "styled-components";
import { breakpoints } from "../design-system/breakpoints";
import { border_color } from "../design-system/border";
import { color } from "../design-system/color";

const sharedProps = css`
  
  ${props =>
    props.paddingTop &&
    `
  padding-top: ${props.paddingTop};
  `}

  ${props =>
    props.alignItems &&
    `
  align-items: ${props.alignItems};
  `}

  ${props =>
    props.paddingBottom &&
    `
  padding-bottom: ${props.paddingBottom};
  `}

  ${props =>
    props.marginTop &&
    `
  margin-top: ${props.marginTop};
  `}

  ${props =>
    props.paddingLeftandRight &&
    `
  padding-left: ${props.paddingLeftandRight};
  padding-right: ${props.paddingLeftandRight};
  `}

  ${props =>
    props.borderRadius &&
    `
  border-radius: ${props.borderRadius};
  `}

  ${props =>
    props.bgImage &&
    `
  background-image: url(${props.bgImage});
  background-size: cover;
  background-position: center;
  `}

  ${props =>
    props.bgColor &&
    `
  background-color: ${props.bgColor};
  `}

  ${props => props.css};
`;

/*
SECTION COMPONENT
*/

export const Section = styled.div`
  margin: 0 auto;
  ${props =>
    props.maxWidth &&
    `
  max-width: ${props.maxWidth};
  `};

  ${sharedProps};
`;

const no_of_column = 12;
const gutter = 16;

/*
ROW COMPONENT
*/

export const Row = styled.div.attrs({ className: "Row" })`
  ${sharedProps};
  display: flex;
  flex-wrap: wrap;
  margin-right: -${gutter / 2}px;
  margin-left: -${gutter / 2}px;

  ${props =>
    props.noGutter &&
    `
  margin-right: 0;
  margin-left: 0;

    > .Col {
      padding-right: 0;
      padding-left: 0;
    }
  `};

  ${props =>
    props.maxWidth &&
    `
  max-width: ${props.maxWidth};
  `};
`;

/*
COLUMN COMPONENT
*/

function getColumnWidth(colSpan) {
  if (typeof colSpan === "string") {
    return `
    flex: 0 0 ${colSpan};
    max-width: ${colSpan};
    `;
  } else {
    let percentageValue = (colSpan / no_of_column) * 100;
    return `
      flex: 0 0 ${percentageValue}%;
      max-width: ${percentageValue}%;
    `;
  }
}

export const Col = styled.div.attrs({
  className: "Col"
})`
  ${sharedProps};

  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -ms-flex-positive: 1;
  flex-grow: 1;

  max-width: 100%;
  padding: 0 ${gutter / 2}px;
  position: relative;
  width: 100%;
  min-height: 1px;
  box-sizing: border-box;

  ${props =>
    props.noGutter &&
    `
    {
      padding-right: 0;
      padding-left: 0;
    }
  `};

  ${props => getColumnWidth(props.width)};

  @media (max-width: ${breakpoints.tablet}) {
    ${props => getColumnWidth(props.tablet)};
    ${props => getColumnWidth(props.tabletWidth)};
  }

  @media (max-width: ${breakpoints.mobile}) {
    ${props => getColumnWidth(props.mobileWidth)};
  }
`;

/*
GENERIC DIV WITH CSS SUPPORT
*/

export const Div = styled.div`
  ${sharedProps};
`;

export const SectionContainer = styled.div.attrs({
  className: "SectionContainer"
})`
  ${props =>
    props.version !== "editcv" &&
    !props.noPadding &&
    `
    margin: 0 auto;
    max-width: 600px;
    padding: 120px 24px 80px;
    `};

  ${props =>
    props.version === "editcv" &&
    `margin-bottom: 64px;
  `};

  .is-hidden {
    display: none !important;
    opacity: 0 !important;
    transition: all 0.2s ease;
  }
`;

export const Card = styled.div`
  padding: 24px;
  border: 2px solid ${color.gray.ui_02};
  /* box-shadow: 0px 2px 7px 0 rgba(0, 0, 0, 0.1); */
  border-radius: 4px;
  background-color: white;
  margin-top: ${props => (props.version === "editcv" ? "24px" : "32px")};
`;

export const Divider = styled.hr`
  border: ${props => props.thickness} solid ${border_color.normal};
  margin: ${props => props.spacing} 0;
  border-bottom: 0;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

Divider.defaultProps = {
  thickness: "2px",
  spacing: "16px"
};
