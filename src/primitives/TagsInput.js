import React from "react";
import styled from "styled-components";
import { Tag } from "../primitives/Tag";
import { font_family, font } from "../design-system/font";
import { color } from "../design-system/color";

var _ENTER = 13;
var _COMMA = 188;
var _BACKSPACE = 8;

const TagInput = styled.div`
  border: 0;
  font-family: ${font_family};
  ${font.small_body};
  display: inline-block;
  min-width: 100px;
  flex: 1 1 auto;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: #fff;
  color: #484848;
  outline: 0;
  padding: 0 12px;

  &:empty:before {
    content: attr(placeholder);
    color: ${color.gray.faint};
  }
`;

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const TagGroup = styled.div.attrs({ className: "TagsInput" })`
  display: inline-flex;
  align-items: center;
  flex-flow: wrap;
`;

class TagsInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.tags
    };
  }

  onKeyDown = e => {
    var key = e.keyCode;

    if (key === _COMMA || key === _ENTER) {
      if (validateEmail(e.target.innerHTML)) {
        this.addTag(e.target.innerHTML);
        e.preventDefault();
        e.target.innerHTML = "";
      }
    }

    if (
      key === _BACKSPACE &&
      Boolean(e.target.innerHTML) === false &&
      this.state.tags.length > 0
    ) {
      this.removeTag();
    }
  };

  addTag = tag => {
    this.setState({ tags: [...this.state.tags, tag] }, () => {
      this.props.onChange(this.state.tags);
    });
  };

  handlePaste = e => {
    e.preventDefault();
    var text = e.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  };

  removeTag = tagText => {
    if (tagText) {
      this.setState(
        {
          tags: [...this.state.tags.filter(tag => tag !== tagText)]
        },
        () => {
          this.props.onChange(this.state.tags);
        }
      );
    } else {
      this.setState(
        {
          tag: [...this.state.tags.pop()]
        },
        () => {
          this.props.onChange(this.state.tags);
        }
      );
    }
  };

  render() {
    const { tags } = this.state;
    const { placeholder } = this.props;
    return (
      <TagGroup>
        {tags.map((tag, index) => {
          return (
            <Tag
              key={`${tag}-${index}`}
              appearance="gray"
              isRemovable
              small
              onRemove={this.removeTag}
              text={tag}
              isRounded={false}
            />
          );
        })}
        <TagInput
          contentEditable
          suppressContentEditableWarning
          onKeyDown={this.onKeyDown}
          onPaste={this.handlePaste}
          placeholder={tags.length > 0 ? "" : placeholder}
        />
      </TagGroup>
    );
  }
}

TagsInput.defaultProps = {
  onChange: emails => console.log(emails)
};

export default TagsInput;
