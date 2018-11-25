import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { Heading, Text } from "../primitives/Text";
import { Icon, iconList } from "../primitives/Icon/icons";
import styled from "styled-components";
import { color } from "../design-system/color";

const Div = styled.div`
  ${props => props.css};
`;
const icon_stories = storiesOf("Icon", module);

icon_stories.add("Icon", () => {
  return (
    <Div
      css={`
        display: grid;
        padding: 64px;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 60px;
        align-items: center;
        text-align: center;
      `}
    >
      {iconList.map(iconName => (
        <div>
          <Icon name={iconName} size={32} color={`${color.cyan.primary}`} />
          <Text small marginTop="16px" align="center">
            {iconName}
          </Text>
        </div>
      ))}
    </Div>
  );
});
