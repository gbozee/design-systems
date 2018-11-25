import React from "react";
import icon from "./iconPath";
import { text_color } from "../../design-system/color";

export class Icon extends React.Component {
  render() {
    const { name, color, size, className } = this.props;
    let selectedIcon = icon[name];
    return (
      <svg
        className={`Icon ${className}`}
        width={size}
        height={size}
        color={color}
        viewBox={selectedIcon.viewBox}
        style={{ flexShrink: 0 }}
      >
        {selectedIcon.path}
      </svg>
    );
  }
}

Icon.defaultProps = {
  name: "left-arrow",
  size: 16,
  color: `${text_color.primary}`,
  className: ""
};

export const iconList = Object.keys(icon);
