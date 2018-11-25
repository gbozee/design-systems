import React from "react";
import styled from "styled-components";
import { Text } from "./Text";
import { Link, Button } from "./Button";
import { color } from "../design-system/color";
import { Input } from "./Input";

const Wrapper = styled.div`
  max-width: 632px;
  width: 56%;
  min-height: 52px;
  display: flex;
  align-items: center;

  .Link {
    margin: 0 !important;

    .Icon {
      width: 14px;
    }

    &:hover {
      .Text {
        text-decoration: none;
        color: ${color.cyan.dark};
      }
    }
  }

  .EditableTitle {
    &__Title {
      margin-right: 24px;
      word-break: break-word;
    }

    &__Form {
      display: flex;
      width: 100%;
      align-items: center;

      .InputWrapper {
        width: 100%;
      }

      .Input {
        flex: 1;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-radius: 0;
        padding: 0;
        height: 40px;
      }

      .Button {
        flex: 0 0 auto;
        margin-left: 16px;
      }
    }
  }
`;

class EditableTitle extends React.Component {
  state = { isEditable: false, name: this.props.resumeName || "" };

  showEditForm = e => {
    this.setState({ isEditable: true }, () => this.nameForm.current.focus());
  };

  handleSave = e => {
    e.preventDefault();
    this.setState({ isEditable: false }, () =>
      this.props.onChange(this.state.name)
    );
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  nameForm = React.createRef();

  render() {
    const { isEditable, name } = this.state;
    const { className } = this.props;
    return (
      <Wrapper className={`EditableTitle ${className}`.trim()}>
        <div style={{ display: isEditable ? "none" : "inherit" }}>
          <Text className="EditableTitle__Title">{name}</Text>
          <Link
            iconBefore="edit"
            color={color.cyan.primary}
            onClick={this.showEditForm}
            size="small"
            isBold
          >
            Edit
          </Link>
        </div>

        <form
          onSubmit={this.handleSave}
          className="EditableTitle__Form"
          style={{ display: isEditable ? "inherit" : "none" }}
        >
          <Input
            innerRef={this.nameForm}
            type="text"
            value={name}
            marginTop="0"
            onChange={this.handleChange}
          />
          <Button appearance="gray" type="submit">
            Save
          </Button>
        </form>
      </Wrapper>
    );
  }
}

EditableTitle.defaultProps = {
  resumeName: "Segun Adebayo (UX Designer) Resume",
  onChange: value => console.log(value)
};

export default EditableTitle;
