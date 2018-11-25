import React from "react";
import styled from "styled-components";
import proptypes from "prop-types";
import { Text } from "./Text";
import { Button } from "./Button";

const StyledEmptyState = styled.div.attrs({ className: "EmptyState" })`
  max-width: 464px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding: 24px;

  .EmptyState {
    &__Image {
      max-width: 320px;
      max-height: 320px;
      width: ${props => props.imageWidth || "auto"};
      height: ${props => props.imageHeight || "auto"};
      margin-bottom: 24px;
    }

    &__Heading {
      margin-bottom: 12px;
    }

    &__Description {
      margin-bottom: 12px;
    }

    &__Actions {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;

      > * {
        margin: 8px 12px;
      }
    }
  }
`;

const EmptyState = ({
  className,
  heading,
  children,
  imageUrl,
  imageAltText,
  imageWidth,
  imageHeight,
  primaryAction,
  secondaryAction
}) => (
  <StyledEmptyState {...{ className, imageHeight, imageWidth }}>
    <img src={imageUrl} alt={imageAltText} className="EmptyState__Image" />
    {heading && (
      <Text size="big" isBold align="center" className="EmptyState__Heading">
        {heading}
      </Text>
    )}
    {children && (
      <Text align="center" className="EmptyState__Description">
        {children}
      </Text>
    )}
    <div class="EmptyState__Actions">
      {primaryAction}
      {secondaryAction}
    </div>
  </StyledEmptyState>
);

EmptyState.defaultProps = {
  heading: "I am the header",
  children:
    "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content.",
  imageAltText: "Empty State Image",
  imageUrl:
    "https://atlaskit.atlassian.com/b9c4dc7ef2c2a1036fe13a5b229d39df.svg",
  primaryAction: <Button onClick={() => {}}>Primary Action</Button>,
  secondaryAction: <Button appearance="gray">Secondary Action</Button>
};

EmptyState.propTypes = {
  className: proptypes.string,
  imageUrl: proptypes.string.isRequired,
  heading: proptypes.string,
  children: proptypes.string,
  primaryAction: proptypes.element,
  secondaryAction: proptypes.element
};

export default EmptyState;
