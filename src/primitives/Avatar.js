import styled from "styled-components";

const Photo = styled.div.attrs({ className: "Photo" })`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => (props.isRound ? "50%" : "4px")};
  background: #8093a6;
  background-image: url(${props => props.url});
  background-size: cover;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-position: center;
  flex-shrink: 0;
`;

Photo.defaultProps = {
  size: "40px",
  className: "Photo",
  isRound: true
};

export default Photo;
