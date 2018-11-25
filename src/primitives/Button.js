import React from "react";
import styled, { css } from "styled-components";
import propTypes from "prop-types";
import { spacing } from "../design-system/spacing";
import { color, brand_color } from "../design-system/color";
import {
  font_size,
  font_family,
  font_weight,
  line_height
} from "../design-system/font";
import { Icon } from "./Icon/icons";
import Spinner from "./Spinner";
import { border_radius, focus_states } from "../design-system/border";
import { Text } from "./Text";
import { Flex } from "rebass";

/*
Generating the various Button States
*/
const button_states = (prop = {}) => {
  let props = Object.keys(prop).length > 0 ? prop : { color, brand_color };
  return {
    cyan: generateButtonStateCSS(
      props.color.white,
      props.color.cyan.primary,
      props.color.cyan.light,
      props.color.cyan.dark,
      props.color.cyan.faint
    ),
    subtle: generateButtonStateCSS(
      props.color.cyan.dark,
      "transparent",
      props.color.cyan.ui_02,
      props.color.cyan.ui_01,
      props.color.gray.ui_03
    ),
    red: generateButtonStateCSS(
      props.color.white,
      props.color.red.primary,
      props.color.red.light,
      props.color.red.dark,
      props.color.red.faint
    ),
    green: generateButtonStateCSS(
      props.color.white,
      props.color.green.primary,
      props.color.green.light,
      props.color.green.dark,
      props.color.green.faint
    ),
    orange: generateButtonStateCSS(
      props.color.gray.primary,
      props.color.orange.faint,
      props.color.orange.ui_01,
      props.color.orange.faint,
      props.color.orange.ui_02
    ),
    gray: generateButtonStateCSS(
      props.color.gray.primary,
      props.color.gray.ui_02,
      props.color.gray.ui_03,
      props.color.gray.ui_01,
      props.color.gray.ui_03
    ),
    linkedin: generateButtonStateCSS(
      props.color.white,
      props.brand_color.linkedin.primary,
      props.brand_color.linkedin.light,
      props.brand_color.linkedin.dark,
      props.brand_color.linkedin.faint
    ),
    facebook: generateButtonStateCSS(
      props.color.white,
      props.brand_color.facebook.primary,
      props.brand_color.facebook.light,
      props.brand_color.facebook.dark,
      props.brand_color.facebook.faint
    ),
    messenger: generateButtonStateCSS(
      props.color.white,
      props.brand_color.messenger.primary,
      props.brand_color.messenger.light,
      props.brand_color.messenger.dark,
      props.brand_color.messenger.faint
    ),
    behance: generateButtonStateCSS(
      props.color.white,
      props.brand_color.behance.primary,
      props.brand_color.behance.light,
      props.brand_color.behance.dark,
      props.brand_color.behance.faint
    ),
    github: generateButtonStateCSS(
      props.color.white,
      props.brand_color.github.primary,
      props.brand_color.github.light,
      props.brand_color.github.dark,
      props.brand_color.github.faint
    ),
    whatsapp: generateButtonStateCSS(
      props.color.white,
      props.brand_color.whatsapp.primary,
      props.brand_color.whatsapp.light,
      props.brand_color.whatsapp.dark,
      props.brand_color.whatsapp.faint
    )
  };
};

/*    Function to generate Buttons State CSS    */

function generateButtonStateCSS(
  textColor,
  bgColor,
  hoverColor,
  activeColor,
  disabledColor
) {
  return css`
    background-color: ${bgColor};
    color: ${textColor};
    cursor: pointer;
    border: none;
    &:hover {
      background-color: ${hoverColor};
    }
    &:active {
      background-color: ${activeColor};
    }
    &:disabled {
      background-color: ${disabledColor};
      cursor: not-allowed;
    }
  `;
}

/*    Styling for the Icon within Buttons   */

const iconStyling = `
    fill: white;
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
`;

/*    Function for generate the Button and Icon Size based on Props   */
const button_sizes = (prop = {}) => {
  let props =
    Object.keys(prop).length > 0
      ? prop
      : { font_size, line_height, spacing, button: spacing.button };
  return {
    button: props.button,
    options: {
      big: {
        size: props.font_size.m,
        default: props.line_height.xxl,
        icon: { size: props.font_size.default, margin: props.spacing.s }
      },
      small: {
        size: props.font_size.s,
        default: props.line_height.l,
        icon: { size: props.font_size.xs, margin: props.spacing.xxs }
      },
      regular: {
        size: props.font_size.default,
        default: props.line_height.xl,
        icon: { size: props.font_size.default, margin: props.spacing.xs }
      }
    }
  };
};
function generateButtonSize(props) {
  let { button, options } = button_sizes(props.theme);
  let value = options[props.size] || options.regular;
  return css`
    padding: ${(props.iconBefore !== null && button[props.size].left_icon) ||
      (props.iconAfter !== null && button[props.size].right_icon) ||
      button[props.size].default};
    font-size: ${value.size};
    line-height: ${value.default};

    > .Icon {
      width: ${value.icon.size};
      height: ${value.icon.size};
      ${iconStyling};
      ${props.iconBefore !== null && `left: ${value.icon.margin};`};
      ${props.iconAfter !== null && `right: ${value.icon.margin};`};
    }
  `;
}

/*    Function for fetch and return the generated Button States   */
const icon = (col, disabled) => `
 .Icon {
          color: ${col.primary};
        }

        &:disabled {
          color: ${disabled.faint};
          .Icon {
            color: ${disabled.faint};
          }
        }
`;
function generateButtonColor(props) {
  let options = {
    gray: "gray",
    secondary: "red",
    green: "green",
    subtle: "subtle",
    orange: "orange",
    linkedin: "linkedin",
    facebook: "facebook",
    messenger: "messenger",
    behance: "behance",
    github: "github",
    whatsapp: "whatsapp"
  };
  let iconss = {
    gray: "gray",
    subtle: "cyan",
    orange: "gray",
    outline: "gray"
  };
  let result = options[props.appearance];
  let styled_c = button_states(props.theme).cyan;
  if (Boolean(result)) {
    styled_c = button_states(props.theme)[result];
  }
  if (props.appearance === "outline") {
    styled_c = `
      cursor: pointer;
      background-color: white;
      color: ${color.gray.primary};
      border: 1px solid ${color.gray.ui_02};
      &:hover,
      &:focus {
        border: 1px solid ${color.gray.ui_01};
      }
    `;
  }
  return css`
    ${styled_c}
    ${Boolean(iconss[props.appearance])
      ? icon(iconss[props.appearance], color.gray)
      : ""}
  `;
}

/*    Styled Button Component   */

const StyledButton = styled.button`
  display: block;
  font-family: ${font_family};
  font-weight: ${font_weight.medium};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);
  border-radius: ${border_radius.default};
  position: relative;
  margin-top: ${props => props.marginTop};
  width: ${props => props.isFullWidth && "100%"};

  ${focus_states.button};

  .Icon {
    color: white;
  }

  ${props => generateButtonSize(props)};
  ${props => generateButtonColor(props)};

  > .loading-state {
    display: flex;
    align-items: center;

    > span {
      flex: 1;
    }

    > .Spinner {
      margin-left: 12px;
      ${props =>
        (props.appearance === "gray" ||
          props.appearance === "subtle" ||
          props.appearance === "orange") &&
        `
          border-top-color: ${color.gray.faint};
          border-left-color: ${color.gray.faint};
        `};
    }
  }
`;

// Link Button
const StyledLinkButton = StyledButton.withComponent("a");
export const LinkButton = ({
  size,
  appearance,
  iconAfter,
  iconBefore,
  marginTop,
  isDisabled,
  className,
  isFullWidth,
  openInNewTab,
  children,
  href
}) => (
  <StyledLinkButton
    {...{
      size,
      appearance,
      iconBefore,
      isFullWidth,
      target: openInNewTab ? "_blank" : "_self",
      marginTop,
      iconAfter,
      disabled: isDisabled,
      href,
      className: `LinkButton ${className}`.trim()
    }}
  >
    {iconBefore && <Icon name={iconBefore} />}
    {children}
    {iconAfter && <Icon name={iconAfter} />}
  </StyledLinkButton>
);

LinkButton.defaultProps = {
  size: "regular",
  isDisabled: false,
  isFullWidth: false,
  iconBefore: null,
  iconAfter: null,
  className: "",
  marginTop: "0",
  openInNewTab: false
};

/*    Button Component   */
export function Button(props) {
  const {
    size,
    className,
    appearance,
    isLoading,
    isDisabled,
    isFullWidth,
    loadingText,
    marginTop,
    iconBefore,
    iconAfter,
    children,
    onClick,
    innerRef,
    type,
    ...rest
  } = props;
  let shared = {
    size,
    appearance,
    className: `Button ${className}`,
    marginTop,
    isFullWidth
  };
  let pp = isLoading
    ? {
        innerRef: innerRef,
        disabled: true,
        iconBefore: null,
        iconAfter: null
      }
    : {
        iconBefore,
        iconAfter,
        disabled: isDisabled,
        onClick,
        type,
        ...rest
      };
  if (isLoading) {
    return (
      <StyledButton {...shared} {...pp}>
        <div className="loading-state">
          <span>{loadingText}</span> <Spinner color={"white"} />
        </div>
      </StyledButton>
    );
  }
  return (
    <StyledButton {...shared} {...pp}>
      {iconBefore && <Icon name={iconBefore} />}
      {children}
      {iconAfter && <Icon name={iconAfter} />}
    </StyledButton>
  );
}

Button.defaultProps = {
  size: "regular",
  isDisabled: false,
  isLoading: false,
  isFullWidth: false,
  iconBefore: null,
  iconAfter: null,
  className: "",
  marginTop: "0",
  loadingText: "Loading",
  type: "button",
  onClick: () => {}
};

Button.propTypes = {
  appearance: propTypes.oneOf([
    "secondary",
    "gray",
    "orange",
    "subtle",
    "green",
    "outline"
  ]),
  className: propTypes.string,
  marginTop: propTypes.string,
  size: propTypes.oneOf(["regular", "big", "small"])
};

export function SocialButton(props) {
  const {
    size,
    appearance,
    className,
    isLoading,
    isDisabled,
    children,
    isFullWidth,
    loadingText,
    onClick
  } = props;
  if (isLoading) {
    return (
      <StyledButton
        {...{
          size,
          disabled: true,
          className: `Button ${className}`,
          appearance,
          loadingText,
          isFullWidth
        }}
      >
        <div className="loading-state">
          <span>{loadingText}</span> <Spinner color={"white"} />
        </div>
      </StyledButton>
    );
  }
  return (
    <StyledButton
      {...{
        size,
        appearance,
        className: `Button ${className}`,
        disabled: isDisabled,
        isFullWidth,
        onClick,
        iconAfter: null,
        iconBefore: true
      }}
    >
      {appearance && <Icon name={appearance} />}
      {children}
    </StyledButton>
  );
}

SocialButton.defaultProps = {
  disabled: false,
  isLoading: false,
  isFullWidth: false,
  loadingText: "Loading",
  size: "regular"
};

SocialButton.propTypes = {
  appearance: propTypes.oneOf([
    "linked",
    "facebook",
    "twitter",
    "github",
    "behance",
    "messenger"
  ])
};

/*    Styled Icon Button Component   */
function generateIconSize(props) {
  if (props.size === "big") {
    return `
      padding: ${spacing.s};

      .icon-container{
        height: 23px;
        width: 23px;
      }
      `;
  } else if (props.size === "small") {
    return `
      padding: ${spacing.xxs};

      .icon-container{
        height: 18px;
        width: 18px;
      }
    `;
  } else {
    return `
      padding: ${spacing.xs};

      .icon-container{
        height: 20px;
        width: 20px;
      }
    `;
  }
}

const StyledIconButton = styled.button`
  padding: 0;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);

  ${focus_states.button};

  border-radius: ${props =>
    props.isRound ? border_radius.round : border_radius.default};

  svg {
    color: white;
    width: 100%;
  }

  ${props => generateButtonColor(props)};
  ${props => generateIconSize(props)};

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;

    > svg {
      width: 100%;
      height: 100%;
    }
  }

  .loading-state {
    display: flex;
    align-items: center;

    > div {
      ${props => props.gray && `svg {color: ${color.gray.faint}}`};
    }
  }
`;

/*   Icon Button Component   */

export function IconButton(props) {
  const {
    size,
    appearance,
    className,
    isRound,
    isLoading,
    isDisabled,
    onClick,
    icon
  } = props;
  return (
    <StyledIconButton
      {...{
        size,
        className: `IconButton ${className}`,
        appearance,
        disabled: isLoading || isDisabled,
        onClick,
        isRound
      }}
    >
      <div className="icon-container">
        {isLoading ? (
          <Spinner color={"white"} marginLeft="0px" />
        ) : (
          <Icon name={icon} />
        )}
      </div>
    </StyledIconButton>
  );
}

IconButton.defaultProps = {
  gray: false,
  size: "regular",
  className: "",
  disabled: false,
  icon: "facebook",
  isLoading: false,
  isRound: true,
  onClick: () => {}
};

IconButton.propTypes = {
  icon: propTypes.string
};

export const EmptyButton = styled.button`
  font-family: ${font_family};
  font-weight: ${font_weight.medium};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);
  border-radius: ${border_radius.default};
  background: none;
  align-items: center;
  justify-content: center;
  display: flex;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  width: ${props => (props.isFullWidth ? "100%" : "auto")};

  ${focus_states.button};
`;

// LINK COMPONENT
const sharedStyles = `
text-decoration: none;
display: inline-block;
margin: 0 4px;
cursor: pointer;
${focus_states.link};
&:hover {
  .Text {
    text-decoration: underline;
  }
}
`;
export const CreateLink = L =>
  styled(L)`
    ${sharedStyles};
    margin-top: ${props => props.marginTop};
  `;
const StyledLink = CreateLink(
  styled.a.attrs({ href: props => props.href || props.to })``
);
export function Link(props) {
  const {
    openInNewTab,
    children,
    color,
    href,
    to,
    isBold,
    size,
    marginTop,
    onClick,
    tabIndex,
    align,
    className,
    iconBefore,
    iconAfter,
    iconColor,
    LinkComponent = StyledLink
  } = props;
  return (
    <LinkComponent
      {...{
        to: to || href,
        target: openInNewTab ? "_blank" : "_self",
        marginTop,
        onClick,
        tabIndex,
        className: `Link ${className}`.trim()
      }}
    >
      <Text
        {...{ size, isBold, color, align, iconBefore, iconColor, iconAfter }}
      >
        {children}
      </Text>
    </LinkComponent>
  );
}

Link.defaultProps = {
  appearance: "link",
  className: "",
  isBold: false,
  size: "regular",
  color: color.gray.primary,
  openInNewTab: true,
  marginTop: "0",
  tabIndex: "0",
  onClick: () => {}
};

const ButtonGroupWrapper = styled(Flex)`
  display: inline-flex;
  width: ${props => (props.isFullWidth ? "100%" : "auto")};

  ${props =>
    !props.isCombined &&
    css`
      margin: 0px -2px;
    `};

  .ButtonGroup__Button {
    flex: 1 0 auto;

    ${props =>
      !props.isCombined &&
      css`
        margin: 0px 2px;
      `};

    ${props =>
      props.isCombined &&
      css`
        &:first-child {
          .Button {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
        }

        &:last-child {
          .Button {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }

        &:not(:first-child):not(:last-child) {
          .Button {
            border-radius: 0;
          }
        }
      `};

    ${props =>
      props.spaceBetween &&
      css`
        &:first-child {
          .Button {
            margin-right: auto;
          }
        }
        &:last-child {
          .Button {
            margin-left: auto;
          }
        }
        &:not(:first-child):not(:last-child) {
          .Button {
            margin-left: auto;
            margin-right: auto;
          }
        }
      `};
  }
`;

export const ButtonGroup = ({
  children,
  isCombined,
  spaceBetween,
  isFullWidth,
  ...rest
}) => {
  let pp = spaceBetween ? { justifyContent: "space-between" } : {};
  return (
    <ButtonGroupWrapper
      className="ButtonGroup"
      {...{ isFullWidth, isCombined, spaceBetween, ...pp }}
      {...rest}
    >
      {React.Children.map(children, child => {
        return <div className="ButtonGroup__Button">{child}</div>;
      })}
    </ButtonGroupWrapper>
  );
};
