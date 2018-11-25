import React, { Fragment } from "react";
import { Heading, Text } from "../primitives/Text";
import styled, { css } from "styled-components";
import { Icon } from "../primitives/Icon/icons";
import { color } from "../design-system/color";
import { spacing } from "../design-system/spacing";
import { breakpoints } from "../design-system/breakpoints";
import Lozenge from "../primitives/Lozenge";

const SectionHeadingDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;

  .SectionHeading {
    &__left {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-top: ${spacing.xxxs};
      margin-left: ${props => (props.version === "editcv-add" ? `0` : `-52px`)};
      margin-right: ${spacing.s};

      &__number {
        margin-right: ${spacing.xs};
      }

      ${props =>
        props.version !== "editcv-add" &&
        css`
          @media (max-width: ${breakpoints.tablet}) {
            display: none !important;
            margin-left: 0px;
          }
        `};
    }

    &__right__title {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    &__editcv {
      display: flex;
      align-items: center;
      width: 100%;

      .Lozenge {
        margin-left: 16px;
      }
    }
  }

  .Edit__SectionHeading {
    .Text {
      font-size: 20px;
      padding-left: 16px;
    }
  }
`;

function SectionHeading(props) {
  const { heading, subheading, number, className, version, icon, pro } = props;
  return (
    <SectionHeadingDiv
      className={`SectionHeading ${className}`}
      version={version}
    >
      {version === "buildcv" && (
        <Fragment>
          <div className="SectionHeading__left">
            <Text
              size="big"
              isBold
              color={color.cyan.primary}
              className="SectionHeading__left__number"
            >
              {number}
            </Text>
            <Icon name="long-right-arrow" color={color.cyan.primary} />
          </div>
          <div className="SectionHeading__right">
            <Heading size="small">{heading}</Heading>
            <Text marginTop={spacing.xxs}>{subheading}</Text>
          </div>
        </Fragment>
      )}
      {version === "editcv" && (
        <Text
          iconColor={color.cyan.primary}
          isBold
          className="Edit__SectionHeading"
          iconSize={18}
          size="big"
          iconBefore={icon}
        >
          {heading}
        </Text>
      )}
      {version === "editcv-add" && (
        <Fragment>
          <div className="SectionHeading__left">
            <Icon name={icon} color={color.cyan.primary} />
          </div>
          <div className="SectionHeading__right">
            <div className="SectionHeading__right__title">
              <Text isBold>{heading}</Text>
              {/* {props.pro && <Lozenge appearance="green">Pro</Lozenge>} */}
            </div>
            <Text size="small" marginTop={spacing.xxxs}>
              {subheading}
            </Text>
          </div>
        </Fragment>
      )}
    </SectionHeadingDiv>
  );
}

SectionHeading.defaultProps = {
  number: 1,
  className: "",
  heading: "This is step heading",
  subheading: "Some extra information goes here",
  version: "buildcv",
  icon: "briefcase"
};

export default SectionHeading;
