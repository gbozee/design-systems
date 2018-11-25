import React, { Fragment } from "react";
import styled from "styled-components";
import { color } from "../design-system/color";
import { font_weight } from "../design-system/font";

const StyledTabs = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 100%;
  min-height: 0%;
`;

const TabPanel = styled.div``;

export class Tabs extends React.Component {
  state = {
    activeTab: this.props.defaultActiveTab
  };
  onSelect = selectedTab => {
    this.setState({ activeTab: selectedTab }, () => {
      if (this.props.onSelect) {
        this.props.onSelect(this.state.activeTab);
      }
    });
  };
  render() {
    const {
      tabs,
      isFitted,
      className,
      children,
      showNavLine,
      SingleTabItem
    } = this.props;
    const { activeTab } = this.state;
    return (
      <StyledTabs className={`Tabs ${className}`}>
        <div className="TabListWrapper">
          <TabList
            {...{ tabs, isFitted, activeTab, showNavLine, SingleTabItem }}
            onSelect={this.onSelect}
          />
        </div>
        <TabPanel role="tabpanel" className="TabPanel">
          {children ? (
            children
          ) : (
            <React.Fragment>
              {tabs.filter(tab => tab.label === activeTab)[0].content}
            </React.Fragment>
          )}
        </TabPanel>
      </StyledTabs>
    );
  }
}

Tabs.defaultProps = {
  isFitted: true,
  defaultActiveTab: "Tab 2",
  className: ""
};

/* 
    This is the Navigation Item that shows the tabs at the top
*/

const StyledTabItem = styled.li`
  color: ${color.gray.light};
  cursor: pointer;
  white-space: nowrap;
  font-size: 14px;
  font-weight: ${font_weight.medium};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);
  flex: ${props => (props.isFitted ? "1" : "initial")};
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &:hover {
    color: ${color.gray.primary};
    box-shadow: inset 0 -2px 0 0 ${color.gray.ui_01};
  }

  &.TabItem--selected {
    color: ${color.cyan.primary};

    box-shadow: inset 0 -2px 0 0 ${color.cyan.primary};
    :hover {
      color: ${color.cyan.dark};
      box-shadow: inset 0 -2px 0 0 ${color.cyan.primary};
    }
  }

  &:focus {
    background-color: ${color.gray.ui_02};
    outline: 0;
  }
`;

const NavLine = styled.span`
  background-color: ${props =>
    props.isSelected ? color.cyan.primary : color.gray.ui_02};
  height: 2px;
  margin-top: -2px;
  width: 100%;
  border-radius: 2px;
`;

const TabItem = ({
  onClick,
  children,
  isSelected,
  isFitted,
  className = ""
}) => (
  <StyledTabItem
    aria-selected={isSelected ? "true" : "false"}
    role="tab"
    isSelected={isSelected}
    tabIndex="0"
    onClick={onClick}
    onKeyDown={e => {
      if (e.keyCode === 13) {
        onClick();
      }
    }}
    isFitted={isFitted}
    className={`TabItem ${isSelected ? `TabItem--selected` : ""} ${className}`}
  >
    {children}
  </StyledTabItem>
);

let LinkTabItem = StyledTabItem.withComponent("a");
export const createStyledLink = c => StyledTabItem.withComponent(c);
export const TabItem2 = ({
  children,
  href,
  isSelected,
  isFitted,
  className = "",
  LinkComponent = LinkTabItem
}) => (
  <LinkComponent
    ariaSelected={isSelected ? "true" : "false"}
    role="tab"
    tabIndex="0"
    to={href}
    className={`TabItem ${isSelected ? `TabItem--selected` : ""} ${className}`}
  >
    {children}
  </LinkComponent>
);

const StyledTabList = styled.ul`
  display: flex;
  font-weight: ${font_weight.medium};
  list-style-type: none;
  height: ${props => props.height};
  /* text-overflow: ellipsis;
  text-transform: uppercase; */
`;

export const TabList = ({
  tabs,
  onSelect,
  activeTab,
  isFitted,
  height,
  SingleTabItem = TabItem,
  showNavLine
}) => {
  return (
    <Fragment>
      <StyledTabList role="tablist" className="TabList" height={height}>
        {tabs.map((tab, index) => (
          <SingleTabItem
            isFitted={isFitted}
            key={tab.label}
            isSelected={activeTab === tab.label}
            onClick={() => onSelect(tab.label)}
            href={tab.url}
          >
            {tab.label}
          </SingleTabItem>
        ))}
      </StyledTabList>
      {showNavLine && <NavLine className="NavLine" />}
    </Fragment>
  );
};

TabList.defaultProps = {
  isFitted: true,
  activeTab: "Tab 2",
  height: "52px",
  showNavLine: true
};
