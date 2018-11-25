import React, { Component } from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import Dropdown, { convertArrayToObj } from "./Select";
import Dropdown2 from "./SelectNative";
import { Label, Text, ErrorText } from "./Text";
import { Checkbox } from "./Checkbox";
import { breakpoints } from "../design-system/breakpoints";

// Lists of months
const months = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 }
];

// Get current year and define future year
var currentYear = new Date().getFullYear();
var futureYear = currentYear + 8;

// Function to generate the list of years
function generateYears(maxYear) {
  var minYear = 1960,
    year,
    years = [];

  for (year = maxYear; year >= minYear; year--) {
    years.push(year.toString());
  }

  return years;
}

const fromCurrentYear = generateYears(currentYear);
const fromFutureYear = generateYears(futureYear);

const Div = styled.div`
  margin-top: ${props => props.marginTop};
`;

/* ================================================
Year Picker Component
================================================ */

class YearPicker extends Component {
  render() {
    const {
      marginTop,
      className,
      label,
      placeholder,
      onChange,
      value,
      innerRef,
      errorMessage,
      isInvalid,
    } = this.props;
    return (
      <Div marginTop={marginTop}>
        <Dropdown2
          label={label}
          className={className}
          placeholder={placeholder}
          options={convertArrayToObj(fromFutureYear)}
          value={value}
          onChange={e => onChange({ value: e })}
          innerRef={innerRef}
          isInvalid={isInvalid}
        />
      </Div>
    );
  }
}

YearPicker.defaultProps = {
  label: "",
  marginTop: "0",
  className: "year-picker",
  placeholder: "Year",
  options: convertArrayToObj(fromFutureYear),
  onChange: value => {
    console.log(value);
  },
  isInvalid: false,
  errorMessage: 'This field is required'
};

export default YearPicker;

/* ================================================
Month and Year Picker Component
================================================ */

const MonthYearDiv = styled.div`
  display: flex;
  flex-direction: row;

  .month-picker {
    flex: 1.5;
    margin-right: 16px;
  }
  
  .year-picker{
    flex: 1;
    margin-right: 0;

  }
  }
`;

/*
Utility Functions for Transforming Date String to get the month and year values
*/

export function transformDatestring(dateString) {
  if (Boolean(dateString)) {
    var splitDate = dateString.split("-");
    return {
      month: parseInt(splitDate[1], 10),
      year: splitDate[0],
      date: dateString
    };
  }
  return;
}

export function getMonthName(monthNumber) {
  if (Boolean(monthNumber)) {
    var monthStr = months.filter(monthObj => monthObj.value === monthNumber);
    return monthStr[0].label;
  }
  return "Month";
}

// Month and Year Picker Component
export class MonthAndYearPicker extends Component {
  constructor(props) {
    super(props);
    this.state = transformDatestring(props.value) || {
      month: "",
      year: "",
      date: ""
    };
  }

  dateWriter = () => {
    let dateString = `${this.state.year}-${this.state.month}`;
    this.setState({ date: dateString }, () => {
      this.props.onChange(this.state.date);
    });
  };

  handleMonthChange = selectedMonth => {
    this.setState({ month: parseInt(selectedMonth) }, this.dateWriter);
  };

  handleYearChange = selectedYear => {
    this.setState({ year: parseInt(selectedYear) }, this.dateWriter);
  };

  clearState = () => {
    this.setState({ month: "", year: "", date: "" });
  };

  render() {
    const {
      label,
      onChange,
      marginTop,
      className,
      isInvalid,
      errorMessage,
      ref,
      ...rest
    } = this.props;
    const { month, year } = this.state;
    return (
      <Div  marginTop={marginTop} className={className} innerRef={ref}>
        {label && <Label>{label}</Label>}
        <MonthYearDiv data-test={rest['data-test'] || ""}>
          <Dropdown2
            onChange={this.handleMonthChange}
            options={months}
            isSearchable={false}
            placeholder="Month"
            className="month-picker"
            isInvalid={isInvalid}
            errorMessage=""
            value={{
              label: getMonthName(month),
              value: month
            }}
          />
          <Dropdown2
            onChange={this.handleYearChange}
            isSearchable={false}
            options={convertArrayToObj(fromCurrentYear)}
            placeholder="Year"
            className="year-picker"
            isInvalid={isInvalid}
            errorMessage=""
            value={{ label: year || "Year", value: year }}
          />
        </MonthYearDiv>
        {isInvalid && errorMessage && <ErrorText errorMessage={errorMessage} />}
      </Div>
    );
  }
}

MonthAndYearPicker.defaultProps = {
  label: "",
  onChange: () => {},
  marginTop: "0",
  className: "month-year-picker",
  errorMessage: "This field is required"
};

/*

Start and End Date Picker Component

*/

const DatePickerDiv = styled.div`
  display: flex;
  flex-direction: row;

  .till-present-text {
    flex: 1;
    margin-top: 40px !important;
  }

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;

    .till-present-text {
      margin-top: 0px !important;
    }
  }

  .start-date-picker {
    flex: 1;
    margin-right: 16px;

    @media (max-width: ${breakpoints.tablet}) {
      margin-right: 0;
      margin-bottom: 16px;
    }
  }

  .end-date-picker {
    flex: 1;
    margin-right: 0;

    @media (max-width: ${breakpoints.tablet}) {
      margin-bottom: 0;
    }
  }
`;
function formatDate(dateString) {
  let value = new Date(dateString);
  if (isNaN(value.getTime())) {
    return "";
  }
  return `${value.getFullYear()}-${value.getMonth() + 1}`;
}
export class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: formatDate(props.startDate) || "",
      endDate: formatDate(props.endDate) || "",
      isCurrent: props.isCurrent || false
    };
  }

  handleStartDateChange = value => {
    this.setState({ startDate: value }, () => {
      this.props.onChange(this.state);
    });
  };

  handleEndDateChange = value => {
    this.setState({ endDate: value }, () => {
      this.props.onChange(this.state);
    });
  };

  clearState = () => {
    this.isCurrentRef.checked = false;
    this.monthYearRef.clearState();
    this.setState({ startDate: "", endDate: "", isCurrent: false });
  };
  handleIsCurrent = e => {
    var currentDate = new Date();
    var currentEndDate = `${currentDate.getFullYear()}-${currentDate.getMonth() +
      1}`;
    this.setState(
      { isCurrent: e.target.checked, endDate: currentEndDate },
      () => {
        this.props.onChange(this.state);
      }
    );
  };

  render() {
    const {
      marginTop,
      startDateLabel,
      endDateLabel,
      isCurrentText,
      startInvalid,
      endInvalid,
      ref
    } = this.props;
    const { startDate, endDate, isCurrent } = this.state;
    return (
      <Div marginTop={marginTop}>
        <DatePickerDiv innerRef={ref}>
          <MonthAndYearPicker
            onChange={this.handleStartDateChange}
            label={startDateLabel}
            className="start-date-picker"
            value={startDate}
            isInvalid={startInvalid}
            ref={node => (this.monthYearRef = node)}
          />
          {this.state.isCurrent ? (
            <Text isBold className="till-present-text">
              — Till Present
            </Text>
          ) : (
            <MonthAndYearPicker
              onChange={this.handleEndDateChange}
              label={endDateLabel}
              isInvalid={endInvalid}
              className="end-date-picker"
              value={endDate}
              ref={node => (this.monthYearRef = node)}
            />
          )}
        </DatePickerDiv>
        <Checkbox
          marginTop="12px"
          onChange={this.handleIsCurrent}
          name={`currently-work-${this.props.indexes}`}
          isChecked={isCurrent}
          innerRef={node => (this.isCurrentRef = node)}
        >
          {isCurrentText}
        </Checkbox>
      </Div>
    );
  }
}

DatePicker.defaultProps = {
  onChange: () => {},
  isCurrentText: "I currently work here",
  marginTop: "24px"
};
