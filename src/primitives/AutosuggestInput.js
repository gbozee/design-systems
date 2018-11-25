import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import { AsyncTypeahead, Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.min.css";
import axios from "axios";
import { font, font_weight, font_family } from "../design-system/font";
import { border_color, border_thickness } from "../design-system/border";
import { Label, ErrorText } from "./Text";
import { color } from "../design-system/color";
import { box_shadow } from "../design-system/box-shadow";

const AsyncAutosuggestDiv = styled.div`
  ${props => props.marginTop && `margin-top: ${props.marginTop}`};

  .auto-suggest {
    position: relative;
  }

  .auto-suggest .typeahead .form-control {
    width: 100%;
    box-shadow: none;
    box-sizing: border-box;
    border-radius: 4px;
    border: ${border_thickness} solid
      ${props => (props.isInvalid ? border_color.error : border_color.normal)};
    padding: 12px 16px;
    background-color: white;
    font-family: ${font_family};
    ${font.regular_body};
    vertical-align: middle;
    transition: all 0.2s ease;
    color: ${color.gray.primary};
  }

  .auto-suggest .rbt-sr-status {
    display: none !important;
  }

  .typeahead input.rbt-input-hint {
    font-family: ${font_family} !important;
    ${font.regular_body};
    display: none;
  }

  .auto-suggest .typeahead-error .form-control:hover {
    border-color: ${border_color.hover};
  }

  .auto-suggest .typeahead-error .form-control:disabled {
    color: #c1c7cd;
    background-color: #e6e8eb;
    border-color: #e6e8eb;
  }

  .auto-suggest .typeahead-error .form-control:focus {
    box-shadow: none;
    outline: none;
    border: 2px solid ${border_color.active};
  }

  .auto-suggest .rbt-input.form-control.focus {
    outline: none;
    border: 2px solid #00b5d8;
    box-shadow: none;
  }

  .auto-suggest .dropdown-menu {
    background: #ffffff;
    font-family: ${font_family};
    position: absolute !important;
    width: 100% !important;
    list-style-type: none;
    padding: 0;
    margin: 0;
    box-shadow: ${box_shadow.dropdown};
    color: ${color.gray.primary};
    border-radius: 4px;
    padding: 4px 0;
    z-index: 1;
  }

  .auto-suggest .dropdown-menu > li > a {
    text-decoration: none;
    padding: 8px;
    display: block;
    ${font.regular_body};
    color: ${color.gray.primary};
  }
  .auto-suggest .dropdown-menu > li > a .rbt-highlight-text {
    font-weight: ${font_weight.medium} !important;
  }

  .auto-suggest .dropdown-menu > li > a:hover {
    background-color: ${color.gray.ui_03} !important;
  }

  .auto-suggest .dropdown-menu > li[aria-selected="true"] {
    background-color: ${color.gray.ui_03} !important;
  }

  .rbt-loader {
    border: 2px solid ${color.gray.ui_02};
    §§border-top-color: ${color.cyan.primary};
  }
`;

export class AsyncAutosuggestInput extends React.Component {
  state = {
    options: this.props.options || [],
    isLoading: false,
    multiple: false,
    allowNew: true,
    value: ""
  };

  onInputChange = (...args) => {
    this.props.onInputChange(...args);
  };
  onChange = (...args) => {
    this.props.onChange(...args);
  };
  clear = () => {
    this._typeahead.getInstance().clear();
  };

  handleSearch = query => {
    const { endpoint, callback = x => ({ label: x, value: x }) } = this.props;
    this.setState({ isLoading: true });
    axios.get(`${endpoint}${query}`).then(({ data }) => {
      this.setState({
        isLoading: false,
        options: data.data.map(callback)
      });
    });
  };

  render() {
    const {
      label = "Degree Autosuggest",
      marginTop,
      dropup,
      isInvalid,
      isDisabled,
      onChange,
      inputProps = {},
      onFocus,
      onBlur,
      onSearch,
      value,
      errorMessage,
      warning,
      placeholder,
      testKey = "",
      ...rest
    } = this.props;
    return (
      <AsyncAutosuggestDiv marginTop={marginTop} isInvalid={isInvalid}>
        <div className="auto-suggest">
          {label && <Label>{label}</Label>}
          <AsyncTypeahead
            className="typeahead"
            onInputChange={this.onChange}
            disabled={isDisabled}
            selected={value}
            minLength={3}
            onChange={this.onChange}
            dropup={dropup}
            maxHeight="200px"
            isLoading={this.state.isLoading}
            emptyLabel={null}
            promptText={null}
            searchText={null}
            onFocus={onFocus}
            ref={ref => (this._typeahead = ref)}
            onSearch={this.handleSearch}
            options={this.state.options}
            onBlur={e => {
              let value = e.target.value;
              // this.setState({ value });
              this.props.onBlur(value);
            }}
            inputProps={{
              ...inputProps,
              ["data-autosuggest"]: testKey,
              autoComplete: "off"
            }}
            placeholder={placeholder}
            {...rest}
          />
        </div>
        {isInvalid && <ErrorText errorMessage={errorMessage} />}
      </AsyncAutosuggestDiv>
    );
  }
}

AsyncAutosuggestInput.defaultProps = {
  placeholder: "Type job position"
};

export class AutoSuggest extends React.Component {
  _typeahead = null;

  onKeyDown = e => {
    if (e.keyCode === 13) {
      let data = e.target.value.slice();
      if (this._typeahead) {
        this.props.onKeyDown(data);
        if (this._typeahead) {
          let inst = this._typeahead.getInstance();
          if (inst) {
            inst.clear();
          }
        }
      }
    }
  };
  render() {
    const {
      displayLabel,
      label,
      onInputChange,
      inputProps,
      onChange,
      onFocus,
      onBlur,
      onSearch,
      value,
      touched,
      marginTop,
      options,
      error,
      defaultSelected,
      warning,
      placeholder,
      allowNew,
      onKeyDown,
      is,
      ...rest
    } = this.props;
    return (
      <AsyncAutosuggestDiv marginTop={marginTop} isInvalid={Boolean(error)}>
        <div className="auto-suggest">
          {displayLabel && <Label>{label}</Label>}
          <Typeahead
            className={"typeahead"} // defaultSelected={value}
            allowNew={allowNew}
            onInputChange={(...args) => {
              onInputChange(...[...args, this._typeahead.getInstance()]);
            }}
            onChange={(...args) => {
              if (Boolean(this._typeahead)) {
                onChange(...[...args, this._typeahead.getInstance()]);
              } else {
                onChange(...[...args]);
              }
            }}
            emptyLabel={null}
            promptText={null}
            searchText={null}
            onFocus={onFocus}
            options={options}
            onBlur={onBlur}
            inputProps={inputProps}
            touched={touched}
            error={error}
            ref={ref => (this._typeahead = ref)}
            warning={warning}
            placeholder={placeholder}
            minLength={3}
            onKeyDown={this.onKeyDown}
            {...rest}
          />
        </div>
        {error && <ErrorText errorMessage={error} />}
      </AsyncAutosuggestDiv>
    );
  }
}
