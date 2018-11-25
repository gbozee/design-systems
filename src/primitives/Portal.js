import React from "react";
import ReactDOM from "react-dom";

class Portal extends React.Component {
  constructor() {
    super();
    this.domNode = document.getElementById("root");
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.domNode);
  }
}

export default Portal;
