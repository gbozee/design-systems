import React from "react";
import styled from "styled-components";
import Dropdown from "../SelectNative";
import { countries } from "./countries";

export class CountryDropdown extends React.Component {
  render() {
    const {
      label,
      marginTop,
      placeholder,
      value,
      onChange,
      isSearchable,
      isInvalid,
      className = "",
      ...rest
    } = this.props;
    return (
      <Dropdown
        marginTop={marginTop}
        options={countries}
        data-test={rest["data-test"] || ""}
        transformListToObject={false}
        {...{
          isInvalid,
          value,
          placeholder,
          isSearchable,
          label,
          onChange: value => onChange({ value })
        }}
      />
    );
  }
}

CountryDropdown.defaultProps = {
  label: "Select Country",
  marginTop: "24px",
  placeholder: "Type country",
  isSearchable: true
};
