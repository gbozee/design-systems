import React from "react";
import styled, { injectGlobal } from "styled-components";
import Logo from "./Logo";
import { ProgressTracker } from "./ProgressTracker";
import { PhotoDropdown } from "./PhotoDropdown";
import { color, text_color } from "../design-system/color";
import { font_family, font, font_weight } from "../design-system/font";
import { z_index } from "../design-system/z-index";
import { TabList } from "./Tabs";
import { EmptyButton } from "./Button";
import { Icon } from "./Icon/icons";
import { Headway } from "../dashboard/components/Headway";

injectGlobal`
*{
  box-sizing: border-box;
}
`;

const NavbarDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 16px 4vw;
  width: 100%;
  box-shadow: 0 1px 4px 0 rgba(99, 114, 130, 0.15);
  position: fixed;
  z-index: ${z_index.fixed};
  background: white;

  .ProgressTracker {
    flex: 1;
    padding: 0 32px;

    @media (max-width: 439px) {
      display: none;
    }
  }

  @media (min-width: 439px) and (max-width: 600px) {
    .Logo {
      flex: 0 0 auto;
      width: 32px;
      height: 32px;

      path#logotype {
        display: none;
      }
    }
  }
`;

class Navbar extends React.Component {
  render() {
    let { links, NavLink, dropdown } = this.props;
    return (
      <NavbarDiv>
        <Logo type="black" size="24px" />
        <ProgressTracker steps={links} NavLink={NavLink} />
        {dropdown}
      </NavbarDiv>
    );
  }
}
Navbar.defaultProps = {
  dropdown: <PhotoDropdown />
};

export default Navbar;

/* New Edit Navbar wuth Tabs */

const EditNavBarGroup = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-bottom: 1px solid ${color.gray.ui_02};
  height: 64px;
  width: 100%;
  position: fixed;
  z-index: ${z_index.fixed};
  background-color: white;

  @media (max-width: 768px) {
    background-color: #37404a;

    #logotype {
      fill: white;
    }
  }

  .TabItem {
    text-transform: uppercase;
  }

  .NavBar__left {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    min-width: 0;
    padding-right: 48px;
    flex-shrink: 0;
    width: calc(100% / 3);
    flex: 1;
  }

  .NavBar__center {
    flex-shrink: 0;
    width: calc(100% / 3);
    flex: 1;
    justify-content: center;
    display: flex;

    .TabList {
      height: 64px;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  .NavBar__right {
    width: calc(100% / 3);
    flex-shrink: 0;
    margin-left: auto;
    min-width: calc(100% / 3);
    flex: 1;
  }
`;

export class ResumeName extends React.Component {
  state = {
    isEditable: false,
    resumeName: this.props.resumeName
  };

  resumeName = React.createRef();

  onBlur = e => {
    console.log(this.resumeName.current.innerText);
    this.setState({ resumeName: e.target.innerText.trim() }, () => {
      this.props.onChange(this.state.resumeName);
    });
  };

  onKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      return false;
    }
  };

  onFocus = e => {
    // Take the cursor to the end of the text onFocus
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(e.target);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    e.target.focus();
    range.detach();
  };

  render() {
    return (
      <div
        onClick={() => this.setState({ isEditable: true })}
        onKeyDown={this.onKeyDown}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        ref={this.resumeName}
        role="textbox"
        tabIndex="0"
        className="ResumeName"
        dangerouslySetInnerHTML={{ __html: this.state.resumeName }}
        contentEditable
        // contentEditable={this.state.isEditable}
        suppressContentEditableWarning
      />
    );
  }
}

ResumeName.defaultProps = {
  onChange: () => {},
  resumeName: "Adebayo Segun (UX Designer) Resume"
};

// EditCVNavBar

export class EditNavBar extends React.Component {
  state = {
    activeTab: this.props.activeTab
  };
  onSelect = tab => {
    this.setState({ activeTab: tab }, () => {
      this.props.onSelect(tab);
    });
  };
  render() {
    let {
      tabs = [
        { label: "Edit", content: <p>One</p> },
        { label: "Preview", content: <p>Two</p> },
        { label: "Share", content: <p>Three</p> }
      ],
      photoDropdown = <PhotoDropdown />
    } = this.props;

    return (
      <EditNavBarGroup className="EditNavBar">
        <div className="NavBar__left">
          <Logo size="24px" />
        </div>
        <div className="NavBar__center">
          <div style={{ flex: "0 0 320px" }}>
            <TabList
              tabs={tabs}
              activeTab={this.state.activeTab}
              onSelect={this.onSelect}
              showNavLine={false}
            />
          </div>
        </div>
        <div className="NavBar__right">
          {/* <Headway/> */}
          {photoDropdown}
        </div>
      </EditNavBarGroup>
    );
  }
}

// Dashboard NavBar

const StyledAppNavBar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: ${z_index.fixed};
  background-color: white;

  .Navbar {
    &__left {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      height: 100%;

      @media (max-width: 768px) {
        flex: 1;
      }

      .Logo {
        padding-right: 32px;

        @media screen and (max-width: 768px) {
          padding-right: 2vw;
        }
      }
    }

    &__links {
      height: 100%;
      display: flex;
      justify-content: space-evenly;
      flex: 1;
      list-style-type: none;

      &-link {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: row nowrap;
        color: ${color.gray.primary};
        font-size: 14px;
        font-weight: ${font_weight.regular};
        text-decoration: none;
        line-height: inherit;
        cursor: pointer;
        margin: 0 24px;

        @media (max-width: 768px) {
          margin: 0;
        }

        @media (max-width: 700px) {
          display: none;
        }

        &.active {
          color: ${color.cyan.primary};
          font-weight: ${font_weight.medium};
        }

        &:hover:not(.active) {
          opacity: 0.6;
        }
      }
    }

    &__right {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      .PhotoDropdown {
        margin-left: 32px;
      }

      .notification {
        width: 32px;
        height: 32px;
        border-radius: 16px;
        position: relative;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);

        #HW_badge_cont {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        &:hover,
        &:focus {
          .Icon {
            color: ${color.cyan.primary};
          }
        }
      }

      #HW_badge {
        background-color: ${color.red.primary};
        top: 0;
        left: 24px;
      }
    }
  }
`;
const NavLink = ({ to, children, active }) => (
  <a
    className={`Navbar__links-link ${active ? "active" : ""}`.trim()}
    href={to}
  >
    {children}
  </a>
);
export class AppNavBar extends React.Component {
  render() {
    const {
      links,
      activeLink,
      Link = NavLink,
      photoDropdown = (
        <PhotoDropdown
          photoURL="https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1"
          name="Segun Adebayo"
          email="sage@adebayosegun.com"
        />
      )
    } = this.props;
    return (
      <StyledAppNavBar className="AppNavBar">
        <div className="Navbar__left">
          <Logo size="24px" />
          <ul className="Navbar__links">
            {links.map(link => (
              <li key={link.label}>
                <Link
                  className={`Navbar__links-link`}
                  to={link.url}
                  active={link.label === activeLink}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="Navbar__right">
          <Headway />
          {/* <EmptyButton className="notification">
            <Icon name="bell-outline" size="20px" />
            <div className="notification__number">1</div>
          </EmptyButton> */}
          {photoDropdown}
        </div>
      </StyledAppNavBar>
    );
  }
}

AppNavBar.defaultProps = {
  links: [
    { label: "Dashboard", url: "/dashboard" },
    { label: "Resumes", url: "/resumes" },
    { label: "Jobs", url: "/job-search" }
  ],
  activeLink: "Dashboard"
};

export const EditCVNavBar = EditNavBar;
export const NewEditNavbar = EditNavBar;
