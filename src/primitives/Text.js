import React from "react";
import propTypes from "prop-types";
import styled, { css } from "styled-components";
import { font_weight, getFont, generateFontStyle } from "../design-system/font";
import { color, text_color } from "../design-system/color";
import { spacing } from "../design-system/spacing";
import { Icon } from "./Icon/icons";

// ================= HEADING COMPONENT =====================

//StyledComponent for the Heading
const StyledHeading = styled.h1`
  ${props => generateFontStyle(props)};
  ${props =>
    props.iconBefore &&
    css`
      padding-left: ${props => props.iconSpacing};
    `};
  ${props =>
    props.iconAfter &&
    css`
      padding-right: ${props => props.iconSpacing};
    `};
`;

// StyledComponent to handle the IconBefore and IconAfter
const HeadingDiv = styled.div`
  ${props =>
    (props.iconAfter || props.iconBefore) &&
    css`
      display: flex;
      align-items: center;
    `};

  margin-top: ${props => props.marginTop};

  .Icon {
    flex-shrink: 0;
  }
`;

// Heading Component
export function Heading(props) {
  const {
    size,
    children,
    className,
    align,
    marginTop,
    iconColor,
    iconSpacing,
    iconSize,
    color,
    isWhite,
    iconBefore,
    iconAfter,
    tag
  } = props;
  const withIconProps = {
    className: "Heading",
    align,
    size,
    isWhite,
    iconSpacing,
    iconAfter,
    iconBefore
  };
  const withoutIconProps = {
    className: `Heading ${className}`,
    size,
    align,
    color,
    marginTop,
    isWhite
  };
  let HeadingComponent = tag ? StyledHeading.withComponent(tag) : StyledHeading;
  if (iconBefore || iconAfter) {
    return (
      <HeadingDiv
        {...{
          iconAfter,
          iconBefore,
          color,
          marginTop,
          className: `HeadingWrapper ${className}`.trim()
        }}
      >
        {iconBefore && (
          <Icon
            size={iconSize}
            color={iconColor ? iconColor : "inherit"}
            name={iconBefore}
          />
        )}
        <HeadingComponent {...withIconProps}>{children}</HeadingComponent>
        {iconAfter && (
          <Icon
            size={iconSize}
            color={iconColor ? iconColor : "inherit"}
            name={iconAfter}
          />
        )}
      </HeadingDiv>
    );
  } else {
    return (
      <HeadingComponent {...withoutIconProps}>{children}</HeadingComponent>
    );
  }
}

Heading.defaultProps = {
  iconAfter: null,
  iconBefore: null,
  iconSize: 16,
  color: `${text_color.primary}`,
  marginTop: "0px",
  className: "",
  iconSpacing: "12px",
  size: "regular"
};

Heading.propTypes = {
  size: propTypes.oneOf(["regular", "big", "small"])
};

// ================= TEXT COMPONENT =====================

const StyledText = styled.p`
  ${props => generateFontStyle(props, "body")};
  ${props => props.isBold && `font-weight: ${font_weight.medium} `};

  ${props =>
    props.iconBefore &&
    css`
      padding-left: ${props => props.iconSpacing};
    `};
  ${props =>
    props.iconAfter &&
    css`
      padding-right: ${props => props.iconSpacing};
    `};
  b,
  strong {
    font-weight: ${font_weight.medium};
  }
`;

// Styled Component to handle the IconBefore and IconAfter
const TextDiv = styled.div`
  ${props => props.iconAfter && "display:flex; align-items: center"};
  ${props => props.iconBefore && "display:flex; align-items: center"};
  color: ${props => props.color};
  margin-top: ${props => props.marginTop};

  .Icon {
    flex-shrink: 0;
  }
`;

export function Text(props) {
  const {
    children,
    color,
    className,
    align,
    marginTop,
    size,
    isBold,
    isWhite,
    iconAfter,
    iconSpacing,
    iconBefore,
    iconColor,
    iconSize,
    tag
  } = props;
  const withIconProps = {
    className: "Text",
    align,
    size,
    isBold,
    iconSpacing,
    isWhite,
    iconAfter,
    iconBefore
  };
  const withoutIconProps = {
    className: `Text ${className}`.trim(),
    size,
    align,
    color,
    marginTop,
    isBold,
    isWhite
  };
  let TextComponent = tag ? StyledText.withComponent(tag) : StyledText;
  if (iconBefore || iconAfter) {
    return (
      <TextDiv
        {...{
          iconAfter,
          iconBefore,
          color,
          marginTop,
          className: `TextWrapper ${className}`.trim()
        }}
      >
        {iconBefore && (
          <Icon
            size={iconSize}
            color={iconColor ? iconColor : "inherit"}
            name={iconBefore}
          />
        )}
        <TextComponent {...withIconProps}>{children}</TextComponent>
        {iconAfter && (
          <Icon
            size={iconSize}
            color={iconColor ? iconColor : "inherit"}
            name={iconAfter}
          />
        )}
      </TextDiv>
    );
  } else {
    return <TextComponent {...withoutIconProps}>{children}</TextComponent>;
  }
}

Text.defaultProps = {
  iconAfter: null,
  isBold: false,
  iconBefore: null,
  iconSize: 16,
  color: `${text_color.primary}`,
  className: "",
  marginTop: "0px",
  align: "left",
  iconSpacing: "8px",
  size: "regular"
};

Text.propTypes = {
  size: propTypes.oneOf(["regular", "big", "small"])
};

// ================= FORM LABEL COMPONENT =====================

export const Label = styled.label`
  display: block;
  ${getFont({ type: "regular_body" })};
  margin-bottom: ${spacing.xxs};
  font-weight: ${font_weight.medium};
  text-align: left;
`;

// ================= FORM ERROR COMPONENT =====================

export function ErrorText({ errorMessage }) {
  return (
    <Text
      iconBefore="error"
      iconColor={color.red.primary}
      color={color.red.primary}
      marginTop={"8px"}
      size="small"
      iconSize="14px"
    >
      {errorMessage}
    </Text>
  );
}

ErrorText.defaultProps = {
  errorMessage: "This field is required"
};
