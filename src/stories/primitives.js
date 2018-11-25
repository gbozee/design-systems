import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { Heading, Text } from "../primitives/Text";
import styled, { ThemeProvider } from "styled-components";
import { color } from "../design-system/color";
import { Mascot } from "../primitives/Mascot/Mascot";
import { ImageUploader } from "../primitives/Upload";
import {
  SummaryCard,
  SortableSummaryCardList,
  SortableSummaryCardGroup
} from "../compound/SummaryCard";
import SectionHeading from "../compound/SectionHeading";
// import { ColorPicker } from "../create-resume/ColorPicker";
// import FontPicker from "../create-resume/FontPicker";
import { Drawer } from "../primitives/Drawer";
// import TemplatePicker from "../create-resume/TemplatePicker";
import { Tabs } from "../primitives/Tabs";
import Slider from "../primitives/Slider";
import Pagination from "../primitives/Pagination";
import EmptyState from "../primitives/EmptyState";
import EditableTitle from "../primitives/EditableTitle";
import { GlobalStyle } from "../primitives/globalStyling";
import theme from "../design-system/theme";

const stories = storiesOf("Primitives", module);

const Div = styled.div`
  ${props => props.css};
`;

stories.add("Text", () => {
  return (
    // <ThemeProvider theme={theme}>
    <Div
      css={`
        h1 {
          margin: 12px 0;
        }
        p {
          margin: 24px 0;
        }
      `}
    >
      <GlobalStyle />
      <Heading size="big">Big Heading 36px/48px</Heading>
      <Heading>Regular Heading 30px/40px</Heading>
      <Heading size="small">Small Heading 22px/32px</Heading>
      <Text size="big">Big Text 18px/28px</Text>
      <Text>Regular Text 16px/24px</Text>
      <Text size="small">Small Text 14px/20px</Text>
      <Heading tag="h3">Heading with h3 tag</Heading>
    </Div>
    // </ThemeProvider>
  );
});

stories.add("Mascot", () => {
  return (
    <div>
      <Mascot expression="errr" />
      <Mascot />
      <Mascot expression="excited" />
      <Mascot expression="feeling cool" />
      <Mascot expression="sad" />
      <Mascot expression="wink" />
    </div>
  );
});

stories.add("Upload Image", () => {
  return <ImageUploader />;
});

stories.add("Summary Card", () => {
  return (
    <SummaryCard
      title="User Experience Designer & Product Manager"
      description="Tuteria Limited"
    />
  );
});

const DATA = [
  {
    position: "User Experience Designer & Product Manager",
    company: "Tuteria Limited",
    start_date: "Aug 2017",
    end_date: "Present"
  },
  {
    position: "Sales Funnel Strategist & UI Designer",
    company: "Upwork Inc.",
    start_date: "Apr 2017",
    end_date: "Jan 2018"
  }
];

stories.add("Sortable Summary Card", () => (
  <SortableSummaryCardGroup
    axis="y"
    lockAxis="y"
    userDragHandle={true}
    value={DATA}
  />
));

stories.add("Section Heading", () => {
  return (
    <Div
      css={`
        .buildcv {
          margin-left: 54px !important;
        }
        .separator {
          margin-top: 40px;
        }
      `}
    >
      <SectionHeading className="buildcv" />
      <div className="separator" />
      <Text>Edit CV Version</Text>
      <br />
      <SectionHeading version="editcv" />
    </Div>
  );
});

stories.add("Drawer", () => {
  return <Drawer />;
});

const Content = styled.div`
  align-items: center;
  background-color: rgb(244, 245, 247);
  color: rgb(107, 119, 140);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-size: 4em;
  font-weight: 300;
  justify-content: center;
  margin-bottom: 8px;
  margin-top: 16px;
  border-radius: 3px;
  padding: 32px;
`;

const TABS = [
  { label: "Tab 1", content: <Content>One</Content> },
  { label: "Tab 2", content: <Content>Two</Content> },
  { label: "Tab 3", content: <Content>Three</Content> },
  { label: "Tab 4", content: <Content>Four</Content> }
];

stories.add("Tabs", () => {
  return (
    <React.Fragment>
      <Tabs tabs={TABS} />
      <GlobalStyle />
    </React.Fragment>
  );
});

stories.add("Slider", () => {
  return <Slider />;
});

stories.add("Pagination", () => {
  return <Pagination />;
});

stories.add("Empty State", () => {
  return <EmptyState />;
});

stories.add("Editable Title", () => {
  return <EditableTitle />;
});
