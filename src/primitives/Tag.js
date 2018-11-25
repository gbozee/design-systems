import React from "react";
import styled, { css } from "styled-components";
import { color } from "../design-system/color";
import { Icon } from "./Icon/icons";
import { border_radius } from "../design-system/border";
import { font_weight, font_family } from "../design-system/font";

function generateBgColor(props) {
  switch (props.appearance) {
    case "gray":
      return css`
        background-color: ${color.gray.ui_02};
        color: ${color.gray.primary};

        &:hover {
          background-color: ${color.gray.ui_01};
        }
      `;
    case "blue":
      return css`
        background-color: rgb(76, 154, 255);
        color: rgb(23, 43, 77);
      `;
    case "green":
      return css`
        background-color: rgb(87, 217, 163);
        color: rgb(23, 43, 77);
      `;
    case "cyan":
      return css`
        background-color: ${color.cyan.primary};

        .Icon,
        span {
          color: white !important;
        }

        &:hover {
          background-color: ${color.cyan.dark};
        }
      `;
    case "lightCyan":
      return css`
        background-color: ${color.cyan.ui_01};
        color: ${color.gray.primary};

        &:hover {
          background-color: ${color.cyan.faint};
        }
      `;
    case "orange":
      return css`
        background-color: rgb(255, 196, 0);
        color: ${color.gray.primary};
      `;

    default:
      break;
  }
}

function generateSize(props) {
  if (props.isAddable) {
    return css`
      .Tag__Text {
        padding-right: 12px;
        ${props => !props.small && `padding-left: 4px;`};
      }

      .Tag__Button {
        .Icon {
          ${props => props.small && `width: 12px; height: 12px;`};
        }
      }
      .;
    `;
  } else if (props.isRemovable) {
    return css`
      .Tag__Text {
        padding-left: 12px;
        ${props => !props.small && `padding-right: 4px;`};
      }

      .Tag__Button {
        .Icon {
          ${props => props.small && `width: 12px; height: 12px;`};
        }
      }
    `;
  } else {
    return css`
      .Tag__Text {
        padding: 0 12px;
      }
    `;
  }
}

const StyledTag = styled.div`
  display: inline-flex;
  max-width: 100%;
  align-items: center;
  font-family: ${font_family};
  min-height: ${props => (props.small ? "24px" : "32px")};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);
  overflow: hidden;
  vertical-align: top;
  margin: 4px;
  flex-shrink: 0;

  ${props =>
    props.isAddable &&
    css`
      cursor: pointer;
    `};

  ${props => generateBgColor(props)};
  ${props => generateSize(props)};

  border-radius: ${props =>
    props.isRounded ? border_radius.round : border_radius.default};

  .Tag {
    &__Text {
      font-size: ${props => (props.small ? "14px" : "16px")};
      font-weight: ${font_weight.regular};
      line-height: 1;
      max-width: 300px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &__Button {
      appearance: none;
      background: none;
      border: none;
      height: ${props => (props.small ? "24px" : "32px")};
      width: ${props => (props.small ? "24px" : "32px")};
      cursor: pointer;
      backface-visibility: hidden;
      display: flex;
      padding: 0;
      align-items: center;
      justify-content: center;

      &.remove {
        &:hover {
          .Icon {
            color: red;
          }
        }
      }

      &:focus {
        background-color: rgba(0, 0, 0, 0.1);
        outline: 0;
      }
    }
  }
`;

export class Tag extends React.Component {
  onAdd = () => {
    console.log(this.props.text, "Added");
    this.props.onAdd(this.props.text);
  };

  onRemove = () => {
    console.log(this.props.text, "Deleted");
    this.props.onRemove(this.props.text);
  };

  action = () => {
    const { isAddable, isRemovable } = this.props;
    if (isAddable) {
      this.onAdd();
    } else if (isRemovable) {
      return;
    } else {
      return;
    }
  };

  render() {
    const {
      text,
      gray,
      small,
      appearance,
      isRemovable,
      className,
      isAddable,
      isRounded,
      onAdd,
      onRemove
    } = this.props;

    return (
      <StyledTag
        {...{
          text,
          gray,
          isRemovable,
          appearance,
          isAddable,
          isRounded,
          small,
          className: `Tag ${className}`
        }}
        className="Tag"
        onClick={this.action}
      >
        {isAddable && (
          <button
            type="button"
            aria-label={`Add ${text}`}
            className="Tag__Button add"
            onClick={this.onAdd}
          >
            <Icon name="add" size={16} />
          </button>
        )}
        <span className="Tag__Text">{text}</span>
        {isRemovable && (
          <button
            type="button"
            aria-label={`Remove ${text}`}
            className="Tag__Button remove"
            onClick={this.onRemove}
          >
            <Icon name="close" size={16} />
          </button>
        )}
      </StyledTag>
    );
  }
}

Tag.defaultProps = {
  isRounded: true,
  appearance: "cyan",
  small: false,
  text: "Tag Text",
  isRemovable: false,
  isAddable: false,
  onAdd: () => {},
  onRemove: () => {}
};

// export const SortableTag = SortableElement(props => <Tag {...props} />);

// export const SortableTagList = SortableContainer(
//   ({ items, onAdd, onRemove, isAddable, isRemovable }) => {
//     return (
//       <div>
//         {items.map((value, index) => (
//           <SortableTag
//             text={value}
//             index={index}
//             onAdd={onAdd}
//             onRemove={onRemove}
//             isAddable={isAddable}
//             isRemovable={isRemovable}
//           />
//         ))}
//       </div>
//     );
//   }
// );
