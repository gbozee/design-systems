import React from "react";
import styled, { css } from "styled-components";
import { color } from "../design-system/color";
import { font_weight, font, font_family } from "../design-system/font";
import { focus_states } from "../design-system/border";
import { breakpoints } from "../design-system/breakpoints";

const StyledStep = styled.li`
  display: block;
  position: relative;
  flex: 1 1 0%;
  margin: 0;
  padding: 0;
  min-width: 28px;

  &:after {
    content: "";
    display: block;
    position: absolute;
    z-index: -10;
    max-width: 800px;
    top: 0px;
    bottom: 12px;
    left: 4px;
    height: 8px;
    transition: background-color 0.3s;
    width: 100%;

    background-color: ${props =>
      props.status === "completed" ? color.cyan.primary : color.gray.ui_03};
  }

  &:last-child {
    flex-grow: 0;

    &:after {
      width: 0;
      border-radius: 0 8px 8px 0;
    }
  }

  .Step {
    &__Marker {
      display: flex;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 20;

      background-color: ${props =>
        props.status !== "active" && props.status !== "completed"
          ? color.gray.ui_03
          : color.cyan.primary};

      width: 8px;
      height: 8px;
      padding-bottom: 2px;
      border: 2px solid transparent;
      border-radius: 50%;
      transition: background-color, border-color;
      transition-duration: 0.3s;
    }

    &__Text {
      ${font.small_body};
      line-height: 20px;
      text-align: center;
      font-family: ${font_family};
      font-weight: ${props =>
        props.status === "active" || props.status === "completed"
          ? font_weight.medium
          : font_weight.regular + `; margin-top: 2px;`};
      color: ${props => generateTextColor(props)};

      padding-top: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
      ${props =>
        props.alignStep === "center" &&
        `transform: translateX(calc(-50% + 4px));`};

      @media (max-width: ${breakpoints.tablet}) {
        display: ${props => (props.status === "active" ? "table-row" : "none")};
      }
    }
  }
`;

function generateTextColor(props) {
  switch (props.status) {
    case "active":
      return color.cyan.primary;
    case "completed":
      return color.gray.primary;
    case "disabled":
      return color.gray.faint;
    default:
      return color.gray.primary;
  }
}

export const sharedStyles = css`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  ${focus_states.link};
`;

export const CreateLink = Link =>
  styled(Link)`
    ${sharedStyles};
  `;

export const StepLink = styled.a`
  ${sharedStyles};
`;

export function Step(props) {
  const {
    isActive,
    status,
    url,
    label,
    percentageComplete,
    alignStep,
    NavLink
  } = props;
  return (
    <StyledStep
      {...{
        status: isActive ? "active" : status || "disabled",
        href: url,
        label,
        alignStep,
        percentageComplete
      }}
    >
      <span className="Step__Marker" />
      <span className="Step__Text">
        {status === "completed" ? <NavLink to={url}>{label}</NavLink> : label}
      </span>
    </StyledStep>
  );
}
const NLink = ({ to, children }) => (
  <StepLink tabIndex="0" href={to}>
    {children}
  </StepLink>
);
Step.defaultProps = {
  label: "Step 1",
  url: "abc.com",
  percentageComplete: 0,
  alignStep: "center",
  NavLink: NLink
};

const ProgressTrackerWrapper = styled.ul`
  display: flex;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  padding-right: 4vw;
  padding-left: 4vw;
  max-width: 840px;

  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 8px;
    padding-right: 2vw;
    padding-left: 2vw;
  }
`;

export function ProgressTracker({ steps, NavLink }) {
  return (
    <div className="ProgressTracker">
      <ProgressTrackerWrapper>
        {steps.map((step, index) => {
          return (
            <NavLink
              status={step.status}
              index={index}
              steps={steps}
              to={step.url}
              tabIndex="0"
            >
              {step.text}
            </NavLink>
          );
        })}
      </ProgressTrackerWrapper>
    </div>
  );
}

ProgressTracker.defaultProps = {
  steps: [
    {
      text: "Personal Info",
      status: "completed",
      href: "/personal-info"
    },
    {
      text: "Profile",
      status: "completed",
      href: "/career-profile"
    },
    {
      text: "Experience",
      status: "completed",
      href: "/work-experience"
    },
    {
      text: "Education",
      status: "active",
      href: "/education"
    },
    {
      text: "Skills",
      status: "unvisited",
      href: "/industry-skills"
    },
    {
      text: "Certification",
      status: "unvisited",
      href: "/certification"
    }
  ],
  NavLink: ({ children, to, status, steps, index }) => {
    // let activeIndex = steps.findIndex(x => location.pathname.includes(x.url));
    console.log(steps);
    return (
      <Step
        status={status}
        label={children}
        url={to}
        isActive={status === "active"}
        NavLink={StepLink}
      />
    );
  }
};
