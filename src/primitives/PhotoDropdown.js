import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Icon } from "./Icon/icons";
import { box_shadow } from "../design-system/box-shadow";
import { EmptyButton } from "./Button";
import { Text } from "./Text";
import { color } from "../design-system/color";
import { z_index } from "../design-system/z-index";
import { focus_states } from "../design-system/border";
import { Divider } from "../primitives/Grid";
import OutsideClickHandler from "./OutsideClickHandler";
import { breakpoints } from "../design-system/breakpoints";
import placeholder from "./Avatar.png";
import { CSSTransition } from "react-transition-group";

const Photo = styled.img`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => (props.isRound ? "50%" : "4px")};
  background: #8093a6;
  background-size: cover;
  background-position: center;
  color: #fff;
`;

Photo.defaultProps = {
  size: "40px",
  className: "Photo"
};

const UserAvatar = styled(EmptyButton)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  flex: 0 0 auto;
  border-radius: 50%;

  &:hover {
    opacity: 0.95;
  }
`;

export const OptionDropdown = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: ${box_shadow.v1};
  position: absolute;
  z-index: 2000;
  right: 0;
  top: 48px;
  padding-top: 8px;
  padding-bottom: 24px;
  width: 300px;

  &:before{
    content: " ";
    position: absolute;
    display: block;
    top: -7px;
    border: 8px solid #fff;
    border-color: transparent transparent #fff #fff;
    -webkit-transform: translateX(-50%) rotate(135deg);
    transform: translateX(-50%) rotate(135deg);
    -webkit-box-shadow: -2px 2px 3px rgba(57,73,76,0.1);
    box-shadow: -2px 2px 3px rgba(57,73,76,0.1);
    left: auto;
    right: 4px;
  }

  @media (max-width: ${breakpoints.mobile}){
    top: 74px;
    width: 100%;
    border-radius: 0;
    &:before{
      right: 18px;
    }
  }

  .account-info{
    padding: 8px 24px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    .Photo{
      margin-right: 12px;
    }

    .name-and-email{
      max-width: 160px;

      .Text{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
`;

const StyledOption = styled.a`
  text-decoration: none;
  padding: 8px 24px;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover,
  &:focus {
    background-color: ${color.gray.ui_03};

    .Icon {
      color: ${color.cyan.primary};
    }
  }

  ${focus_states.link};
`;

export const CreateLinkOption = Link => styled(Link)`
  text-decoration: none;
  padding: 8px 24px;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover,
  &:focus {
    background-color: ${color.gray.ui_03};

    .Icon {
      color: ${color.cyan.primary};
    }
  }

  ${focus_states.link};
`;
function Option({ children, link, icon, action = () => {}, Opt }) {
  return (
    <Opt
      className="Option"
      action={action}
      to={link}
      // href={link}
      small
    >
      <Text size="small">{children}</Text>
      <Icon name={icon} />
    </Opt>
  );
}
Option.defaultProps = {
  Opt: ({ to, children }) => <StyledOption href={to}>{children}</StyledOption>
};

export const DropdownWrapper = styled.div`
  @media (min-width: ${breakpoints.mobile}) {
    position: relative;
  }

  .Dropdown {
    &-enter {
      opacity: 0.01;
    }

    &-enter-active {
      opacity: 1;
      transition: all 200ms ease-in-out;
    }

    &-exit {
      opacity: 1;
    }

    &-exit-active {
      opacity: 0.01;
      transition: all 200ms ease-in-out;
    }
  }
`;

export class PhotoDropdown extends Component {
  state = {
    showDropdown: false
  };

  render() {
    const { links, photoURL, name, email, Opt, style, className } = this.props;
    const { showDropdown } = this.state;
    return (
      <OutsideClickHandler
        style={style}
        onClickOutside={() => this.setState({ showDropdown: false })}
      >
        <UserAvatar
          onClick={() => {
            this.setState(prevState => ({
              showDropdown: !prevState.showDropdown
            }));
          }}
          style={{ float: "right" }}
          className={`PhotoDropdown ${className}`}
        >
          {photoURL ? (
            <Photo isRound src={photoURL} alt={`${name}`} />
          ) : (
            name && (
              <Text className="avatar-inital" size="small" isWhite>
                {name[0]}
              </Text>
            )
          )}
        </UserAvatar>
        <DropdownWrapper>
          <CSSTransition
            in={showDropdown}
            classNames="Dropdown"
            timeout={200}
            unmountOnExit
          >
            <OptionDropdown className="Dropdown">
              <div className="account-info">
                <Photo size="64px" src={photoURL} isRound />
                <div className="name-and-email">
                  <Text size="small" isBold>
                    {name}
                  </Text>
                  <Text size="small">{email}</Text>
                </div>
              </div>
              <Divider />
              {links.map(item => (
                <Option
                  key={item.url}
                  Opt={Opt}
                  icon={item.icon}
                  action={item.action}
                  link={item.url}
                >
                  {item.label}
                </Option>
              ))}
            </OptionDropdown>
          </CSSTransition>
        </DropdownWrapper>
      </OutsideClickHandler>
    );
  }
}

PhotoDropdown.defaultProps = {
  name: "Precious Chukwuebuka",
  email: "sagebaba@gmail.com",
  photoURL: placeholder,
  links: [
    { label: "My Dashboard", icon: "home", url: "/dashboard" },
    { label: "Settings", icon: "settings", url: "/account-settings" },
    { label: "Sign out", icon: "logout", url: "/logout" }
  ],
  Opt: StyledOption,
  style: {},
  className: ""
};
