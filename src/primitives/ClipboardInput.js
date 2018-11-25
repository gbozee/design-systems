import React from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { Input } from "./Input";
import { Label } from "./Text";
import { color } from "../design-system/color";

const StyledClipboard = styled.div`
  .ClipboardInput {
    &__Group {
      display: flex;
    }
    &__Input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    &__CopyButton {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;

      &:focus {
        box-shadow: none;
        background-color: ${color.gray.ui_01};
      }
    }
  }
`;

export const copyToClipboard = content => {
  const el = document.createElement("textarea");
  el.value = content;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

class ClipboardInput extends React.Component {
  state = { hasCopied: false };

  handleCopy = () => {
    copyToClipboard(this.props.value);
    this.setState({ hasCopied: true });
    setTimeout(() => {
      this.setState({ hasCopied: false });
    }, 1500);
  };

  render() {
    const { value, className, label } = this.props;
    const { hasCopied } = this.state;
    return (
      <StyledClipboard className={`ClipboardInput ${className}`.trim()}>
        {label && <Label>{label}</Label>}
        <div className="ClipboardInput__Group">
          <Input
            className="ClipboardInput__Input"
            value={value}
            readOnly={true}
            marginTop="0"
          />
          <Button
            className="ClipboardInput__CopyButton"
            iconBefore="copy"
            appearance="gray"
            onClick={this.handleCopy}
          >
            {hasCopied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </StyledClipboard>
    );
  }
}

export default ClipboardInput;
