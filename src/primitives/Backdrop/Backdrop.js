import React from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { z_index } from "../../design-system/z-index";
import "./Backdrop.css";

const StyledBackdrop = styled.div`
  bottom: 0px;
  left: 0px;
  opacity: 1;
  pointer-events: initial;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: ${z_index.modal_backdrop};
  background: rgba(0, 0, 0, 0.6);
`;

export function Backdrop({ showBackdrop, onClick }) {
  return (
    <CSSTransition
      classNames="Backdrop"
      in={showBackdrop}
      timeout={200}
      unmountOnExit
    >
      <StyledBackdrop onClick={onClick} />
    </CSSTransition>
  );
}
