import React from "react";
import { storiesOf } from "@storybook/react";
import styled, { ThemeProvider, ThemeConsumer } from "styled-components";
import theme from "../design-system/theme";
import { Flex } from "rebass";
const stories = storiesOf("Colors", module);

const Div = styled(Flex)`
  > div {
    flex: 1;
    height: 100vh;
    display: flex;
    align-items: flex-end;
    font-size: 24px;
    padding-bottom: 40px;
    justify-content: center;
    mix-blend-mode: overlay;
    color: rgba(0, 0, 0, 0.4);
    text-transform: uppercase;
  }
`;

const ColorComponent = ({ color }) => {
  return (
    <ThemeProvider theme={theme}>
      <ThemeConsumer>
        {tx => {
          let cc = tx.color[color];
          return (
            <Div>
              {Object.keys(cc).map(x => (
                <Flex key={x} style={{ backgroundColor: cc[x] }}>
                  {x} {cc[x]}
                </Flex>
              ))}
            </Div>
          );
        }}
      </ThemeConsumer>
    </ThemeProvider>
  );
};
stories.add("Orange", () => {
  return <ColorComponent color="orange" />;
});

stories.add("Cyan", () => {
  return <ColorComponent color="cyan" />;
});

stories.add("Gray", () => {
  return <ColorComponent color="gray" />;
});

stories.add("Red", () => {
  return <ColorComponent color="red" />;
});

stories.add("Green", () => {
  return <ColorComponent color="green" />;
});
