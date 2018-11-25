import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import { Icon } from "./Icon/icons";
import { color } from "../design-system/color";
import { Text } from "./Text";
import { line_height } from "../design-system/font";
import { spacing } from "../design-system/spacing";
import { border_radius } from "../design-system/border";
import { EmptyButton } from "./Button";

const colors = {
  success: color.green.ui_01,
  warning: color.orange.ui_01,
  error: color.red.ui_01,
  info: "#c5dbf2",
  default: color.cyan.ui_01
};

function generateBgColor(props) {
  switch (props.status) {
    case "warning":
      return `${colors.warning}`;
    case "success":
      return `${colors.success}`;
    case "error":
      return `${colors.error}`;
    case "info":
      return `${colors.info}`;
    default:
      return `${colors.default}`;
  }
}

const AlertDiv = styled.div.attrs({ className: "Alert" })`
  padding: ${spacing.s};
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
  border-radius: ${border_radius.default};

  background-color: ${props => generateBgColor(props)};

  .Alert {
    &__icon {
      margin-right: ${spacing.s};
      flex: 0 0 auto;
    }

    &__text {
      flex: 1;
      .Text {
        line-height: ${line_height.default};
      }
    }
  }
`;

const icons = {
  warning: "error",
  error: "cancel",
  success: "check",
  info: "info"
};

function Alert(props) {
  const {
    status,
    title,
    children,
    className,
    isClosable,
    onClose,
    marginBottom,
    marginTop
  } = props;
  return (
    <AlertDiv role="alert" {...{ status, marginTop, marginBottom, className }}>
      {status && (
        <div className="Alert__icon">
          <Icon name={icons[status]} size={20} />
        </div>
      )}
      <div className="Alert__text">
        {title && <Text isBold>{title}</Text>}
        <Text>{children}</Text>
      </div>
      {isClosable && (
        <EmptyButton onClick={onClose}>
          <Icon name="close" size={20} />
        </EmptyButton>
      )}
    </AlertDiv>
  );
}

Alert.defaultProps = {
  children: "This is the Alert body",
  isClosable: false,
  marginTop: "0",
  onClose: () => {}
};

Alert.propTypes = {
  status: propTypes.oneOf(["success", "error", "warning", "info"]),
  title: propTypes.oneOfType([propTypes.string, propTypes.object]),
  icon: propTypes.string,
  children: propTypes.string,
  isClosable: propTypes.bool,
  onClose: propTypes.func
};

export default Alert;
