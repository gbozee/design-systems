import React from "react";
import styled, { ThemeProvider, ThemeConsumer } from "styled-components";
import { storiesOf } from "@storybook/react";
import { Flex, Box } from "rebass";
import { Button, SocialButton, ButtonGroup } from "../primitives/Button";
import { GlobalStyle } from "../primitives/globalStyling";
import theme from "../design-system/theme";

const stories = storiesOf("Button", module);

const Div = styled.div`
  > div {
    margin-bottom: 24px;
    align-items: center;
    display: flex;
    > .Button {
      margin-right: 24px;
      display: inline-block;
    }
  }
`;
const Div2 = styled(Box)`
  > div > .Button {
    margin-right: 24px;
    display: inline-block;
  }
`;
const RenderButton = ({ appearance, ...props }) => {
  return (
    <Flex mb={"24px"} alignItems="center">
      <Button size="small" appearance={appearance} {...props}>
        Button
      </Button>
      <Button appearance={appearance} {...props}>
        Button
      </Button>
      <Button size="big" appearance={appearance} {...props}>
        Button
      </Button>
    </Flex>
  );
};
const ButtonComponent = ({ appearance, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <ThemeConsumer>
        {tx => (
          <React.Fragment>
            <GlobalStyle />
            {appearance ? (
              <RenderButton {...{ appearance, ...props }} />
            ) : (
              tx.appearances.map(xx => (
                <RenderButton key={xx} {...{ appearance: xx, ...props }} />
              ))
            )}
          </React.Fragment>
        )}
      </ThemeConsumer>
    </ThemeProvider>
  );
};
stories.add("Default", () => {
  return (
    <Div2>
      <ButtonComponent />
    </Div2>
  );
});

stories.add("Loading", () => {
  return (
    <Div2>
      <ButtonComponent isLoading />
    </Div2>
  );
});

stories.add("With Left Icon", () => {
  return (
    <Div>
      <ButtonComponent appearance="default" iconBefore="edit" />
      <ButtonComponent appearance="secondary" iconBefore="delete" />
      <ButtonComponent appearance="gray" iconBefore="left-arrow" />
      <ButtonComponent appearance="subtle" iconBefore="left-arrow" />
      <ButtonComponent appearance="orange" iconBefore="phone" />
    </Div>
  );
});

stories.add("With Right Icon", () => {
  return (
    <Div>
      <ButtonComponent appearance="default" iconAfter="send" />
      <ButtonComponent appearance="secondary" iconAfter="delete" />
      <ButtonComponent appearance="gray" iconAfter="right-arrow" />
      <ButtonComponent appearance="subtle" iconAfter="right-arrow" />
      <ButtonComponent appearance="orange" iconAfter="phone" />
    </Div>
  );
});

stories.add("Social Buttons", () => {
  return (
    <Div>
      <div>
        <SocialButton appearance="linkedin">Linkedin</SocialButton>
        <SocialButton appearance="facebook">Facebook</SocialButton>
        <SocialButton appearance="messenger">Messenger</SocialButton>
      </div>
    </Div>
  );
});

stories.add("Button Group", () => (
  <Div>
    <ButtonGroup spaceBetween isFullWidth>
      <Button appearance="secondary">Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button appearance="secondary">Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </ButtonGroup>
  </Div>
));
