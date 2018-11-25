import React from "react";
import {
  SortableContainer,
  SortableElement,
  arrayMove,
  SortableHandle
} from "react-sortable-hoc";
import { Icon } from "./Icon/icons";
import styled from "styled-components";
import { color } from "../design-system/color";
import { Text } from "./Text";
import { EmptyButton } from "./Button";

const StyledDragHandle = styled.div`
  padding: 24px;
  display: flex;
  cursor: move;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const StyledDeleteButton = styled(EmptyButton)`
  padding: 24px;
`;

const DragHandle = SortableHandle(() => (
  <StyledDragHandle className="DragHandle">
    <Icon name="menu" />
  </StyledDragHandle>
));

const StyledItem = styled.div`
  background-color: ${color.gray.ui_04};
  border-bottom: 2px solid ${color.gray.ui_02};
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10000;

  .Text {
    padding: 24px 32px;
    flex: 1;
  }

  .SortableItem__actions {
    display: flex;
    align-items: center;
  }
`;

const SortableItem = SortableElement(({ children, onRemove }) => (
  <StyledItem>
    <Text isBold>{children}</Text>
    <div className="SortableItem__actions">
      <StyledDeleteButton onClick={onRemove}>
        <Icon name="delete" />
      </StyledDeleteButton>
      <DragHandle />
    </div>
  </StyledItem>
));

const SortableListWrapper = styled.div`
  max-height: 55vh;
  width: calc(100% + 64px);
  margin-left: -32px;
  overflow-y: scroll;
  margin-top: -24px;
  border-top: 1px solid ${color.gray.ui_02};

  @media (max-width: 420px) {
    max-height: calc(100vh - 180px);
  }
`;

export const SortableList = SortableContainer(({ items, onRemove }) => {
  return (
    <SortableListWrapper>
      {items.map((value, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          onRemove={() => onRemove(value)}
        >
          {value}
        </SortableItem>
      ))}
    </SortableListWrapper>
  );
});

export class SortableComponent extends React.Component {
  state = {
    items: this.props.value
  };

  componentDidUpdate(prevProps) {
    if (prevProps.value.length !== this.props.value.length) {
      this.setState({
        items: this.props.value
      });
    }
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(
      {
        items: arrayMove(this.state.items, oldIndex, newIndex)
      },
      () => {
        this.props.onChange(this.state.items);
      }
    );
  };

  render() {
    const { component, lockAxis, axis, useDragHandle } = this.props;
    const SortableList = component;
    return (
      <SortableList
        lockAxis={lockAxis}
        axis={axis}
        helperClass="sorted" // pressDelay={200}
        useDragHandle={useDragHandle}
        hideSortableGhost={false}
        items={this.state.items}
        onSortEnd={this.onSortEnd}
        {...this.props}
      />
    );
  }
}
