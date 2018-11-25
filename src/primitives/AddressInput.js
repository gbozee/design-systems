import React from "react";
import styled, { injectGlobal } from "styled-components";
import intersection from "lodash/intersection";
import { Input } from "./Input";
import {
  font,
  font_family,
  font_size,
  font_weight
} from "../design-system/font";
import { color } from "../design-system/color";
import { box_shadow } from "../design-system/box-shadow";

injectGlobal`
  .pac-container {
    font-family: ${font_family};
    font-size: ${font_size.default};
    border-radius: 4px;
    box-shadow: ${box_shadow.dropdown};
  }
  
  .pac-container .pac-item .pac-icon {
    background-image: none;
    display: none;
  }
  
  .pac-container .pac-item {
    color: ${color.gray.primary} !important;
    padding: 8px 16px;
    ${font.regular_body};
    border: none;

    &:hover{
      background-color: ${color.gray.ui_03};
      cursor: pointer;
    }

    &.pac-item-selected{
      background-color: ${color.gray.ui_03};
    }

    .pac-item-query {
      font-size: ${font_size.default};
      padding-right: 3px;
      color: ${color.gray.primary};
    }

    .pac-matched {
        font-weight: ${font_weight.medium};
    }

  }
`;

export class AutocompleteInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autocomplete: null
    };
    this.inputNode = null;
  }
  componentDidMount() {
    if (!Boolean(window.google)) {
      let googleMaps = document.createElement("script");
      googleMaps.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyA2Nr7NSDPZXA3EnRELIxG1B_SNy3Iasxk&libraries=places";
      googleMaps.onload = () => {
        this.initAutocomplete();
      };
      document.body.appendChild(googleMaps);
    }

    this.initAutocomplete();
  }

  fillInAddress = () => {
    // Get the place details from the autocomplete object.
    const place = this.state.autocomplete.getPlace();
    this.props.placeDataResult(place);
  };

  initAutocomplete() {
    var options = {
      types: []
    };
    if (this.inputNode && Boolean(window.google)) {
      var autocomplete = new window.google.maps.places.Autocomplete(
        this.inputNode,
        options
      );
      autocomplete.addListener("place_changed", this.fillInAddress);
      this.setState({ autocomplete });
    }
  }
  componentWillReceiveProps(nextProps) {
    this.inputNode.value = nextProps.value;
  }

  render() {
    const { children } = this.props;
    const input = React.cloneElement(children, {
      innerRef: comp => {
        this.inputNode = comp;
      }
    });
    return input;
  }
}

function getCategory(types_ARR) {
  return Object.keys(options).filter(x => {
    let v = intersection(options[x], types_ARR);
    return v.length > 0;
  });
}

function sortAddress(location_array) {
  let result = { state: "", country: "" };
  location_array.forEach((value, index) => {
    var r = getCategory(value.types);
    if (r.length > 0) {
      result[r[0]] = value["long_name"];
    }
  });
  return result;
}

function getAddressValue(location_array) {
  const first_two = location_array.slice(0, 2);
  const last_two = location_array.slice(-2);

  const street = first_two.reduce((x, a) => `${x} ${a.short_name}`, "");
  const state_and_country = last_two.reduce(
    (x, a) => `${x}, ${a.long_name}`,
    ""
  );
  const result2 = `${street}${state_and_country}`;

  return result2.trim();
}

let options = {
  state: ["locality", "administrative_area_level_1"],
  country: ["country"]
};

const AddressInputDiv = styled.div`
  input {
    color: ${color.gray.primary};
  }
`;

// Address Input Component
export class AddressInput extends React.Component {
  constructor(props) {
    super(props);
    let {
      value = {
        address: "",
        state: "",
        country: ""
      }
    } = this.props;
    this.state = {
      location: value
    };
  }
  updateStateAndVicinity = data => {
    // debugger;
    let address = data.formatted_address;
    // let address = getAddressValue(data.address_components);
    let remaining = sortAddress(data.address_components);
    let location = { ...this.state.location, address, ...remaining };
    this.setState({ location });
    this.props.onChange(location);
  };

  onChange = e => {
    let location = { ...this.state.location, address: e.target.value };
    this.setState({ location }, () => {
      this.props.onChange(this.state.location);
    });
  };
  getAddress() {
    let { value = {} } = this.props;
    return this.state.location.address || value.address || "";
  }
  render() {
    const {
      name,
      placeholder,
      label,
      marginTop,
      isInvalid,
      ...rest
    } = this.props;
    return (
      <AddressInputDiv>
        <AutocompleteInput
          value={this.getAddress()}
          placeDataResult={this.updateStateAndVicinity}
        >
          <Input
            name={name}
            type="text"
            autoComplete={"do-not-autoFill"}
            defaultValue={this.state.location.address}
            // onChange={this.onChange}
            onBlur={this.onChange}
            placeholder={placeholder}
            label={label}
            data-test={rest["data-test"] || ""}
            marginTop={marginTop}
            isInvalid={isInvalid}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                e.preventDefault();
              }
            }}
          />
        </AutocompleteInput>
      </AddressInputDiv>
    );
  }
}

AddressInput.defaultProps = {
  label: "where do you level",
  placeholder: "Type your address",
  name: "address",
  marginTop: "24px",
  isInvalid: false,
  onChange: () => {}
};
