import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import mascotSprite from "./mascot-expressions.png";

function getBackgroundPosition(expression) {
  switch (expression) {
    case "errr":
      return `0%`;
    case "happy":
      return `500%`;
    case "excited":
      return `400%`;
    case "feeling cool":
      return `300%`;
    case "sad":
      return `200%`;
    case "wink":
      return `100%`;
    default:
      return;
  }
}

const SpriteContainer = styled.div`
  width: ${props => props.size};
  display: inline-block;

  > .sprite{
    width: 100%;
    height: 0;
    padding-bottom: 105%;
    background-image: url(${mascotSprite});
    background-position: ${props => getBackgroundPosition(props.expression)};
    background-size: 600%;
    display:block;
}
  }
`;

export class Mascot extends React.Component {
  render() {
    const { expression, size } = this.props;
    return (
      <SpriteContainer expression={expression} size={size} className="Mascot">
        <div className="sprite" />
      </SpriteContainer>
    );
  }
}

Mascot.defaultProps = {
  expression: "happy",
  size: "120px"
};

Mascot.propTypes = {
  expression: propTypes.oneOf([
    "errr",
    "happy",
    "excited",
    "feeling cool",
    "sad",
    "wink"
  ])
};

export default Mascot
