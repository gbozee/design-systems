import React from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import {
  font_family,
  font,
  font_weight,
  line_height,
} from '../design-system/font';
import { color } from '../design-system/color';
import { border_color, focus_states } from '../design-system/border';
import { Label, ErrorText } from './Text';
import { CVScriptsToolTip } from '../create-resume/components/CVScriptsSidebar';

const border_thickness = '2px';

const TextEditorDiv = styled.div`
  margin-top: ${props => props.marginTop};

  .ql-toolbar {
    border: ${border_thickness} solid ${border_color.normal} !important;
    border-radius: 4px 4px 0 0;
    border-bottom: 0 !important;
    padding: 12px 8px !important;
    background-color: ${border_color.normal};
    display: flex;

    button {
      margin-right: 12px;
      border-radius: 4px;

      &:focus {
        ${focus_states.button};
        color: ${color.cyan.primary} !important;

        svg,
        .ql-stroke {
          stroke: ${color.cyan.primary} !important;
        }
      }
    }

    button.ql-active,
    button:hover {
      color: ${color.cyan.primary} !important;

      svg,
      .ql-stroke {
        stroke: ${color.cyan.primary} !important;
      }
    }

    &.ql-snow .ql-formats {
      margin-right: 0 !important;
    }
  }

  .ql-container {
    background-color: white;
    border-width: ${border_thickness} !important;
    border-style: solid !important;
    border-color: ${props =>
      props.isInvalid ? border_color.error : border_color.normal} !important;
    color: ${color.gray.primary};
    transition: all 0.1s cubic-bezier(0.4, 0, 0.23, 1);
    border-radius: 0 0 4px 4px;

    &:hover {
      border-color: ${props =>
        props.isInvalid ? border_color.error : border_color.hover} !important;
    }

    &:focus-within {
      border-color: ${props =>
        props.isInvalid ? border_color.error : border_color.active} !important;
      outline: none;
    }

    .ql-editor {
      min-height: ${props => props.minHeight};
      max-height: ${props => props.maxHeight};
      font-family: ${font_family};
      padding: 16px;
      ${font.regular_body};

      ul {
        padding: 0;

        li {
          line-height: ${line_height.default};
        }
      }

      strong,
      b {
        font-weight: ${font_weight.medium};
      }

      &.ql-blank::before {
        font-style: normal;
        color: ${color.gray.faint};
      }
    }
  }
`;

export function TextEditor(props) {
  const {
    placeholder,
    onChange,
    value,
    className,
    onFocus,
    onBlur,
    isInvalid,
    minHeight,
    label,
    maxHeight,
    innerRef,
    errorMessage,
    marginTop,
    isDisabled,
  } = props;
  return (
    <TextEditorDiv
      {...{
        marginTop,
        isInvalid,
        minHeight,
        maxHeight,
        className: `TextEditor ${className}`,
      }}
    >
      {label && <Label htmlFor={label}> {label} </Label>}
      <ReactQuill
        {...{
          readOnly: isDisabled,
          onFocus,
          onBlur,
          ref: innerRef,
          theme: 'snow',
          placeholder,
          onChange,
          defaultValue: value,
        }}
        modules={TextEditor.modules}
        formats={TextEditor.formats}
      />
      {isInvalid && <ErrorText errorMessage={errorMessage} />}
    </TextEditorDiv>
  );
}

TextEditor.defaultProps = {
  placeholder: 'Type something',
  isInvalid: false,
  className: '',
  marginTop: '32px',
  minHeight: '120px',
  maxHeight: '240px',
  errorMessage: 'This field is required',
};

TextEditor.modules = {
  toolbar: [['bold', 'italic'], [{ list: 'bullet' }]],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

TextEditor.formats = ['bold', 'italic', 'underline', 'list', 'bullet'];

const TextEditorWithTooltipContainer = styled.div`
  position: relative;
  .CVScriptsToolTip {
    position: absolute;
    right: -300px;
    top: -45px;
  }
`;

export const TextEditorWithTooltip = ({
  data,
  onClickExample,
  tooltipIsOpen,
  onTooltipClose,
  ...rest
}) => {
  return (
    <TextEditorWithTooltipContainer>
      <TextEditor {...rest} />
      {tooltipIsOpen && (
        <CVScriptsToolTip
          data={data}
          onClose={onTooltipClose}
          onClickExample={onClickExample}
        />
      )}
    </TextEditorWithTooltipContainer>
  );
};
