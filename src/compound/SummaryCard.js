import React from "react";
import { font_size, line_height } from "../design-system/font";
import { IconButton } from "../primitives/Button";
import { color } from "../design-system/color";
import { Text } from "../primitives/Text";
import styled from "styled-components";
import { Confirm, ToggleModal } from "../primitives/Modal";
import { Icon } from "../primitives/Icon/icons";
import { breakpoints } from "../design-system/breakpoints";
import {
  SortableContainer,
  SortableElement,
  arrayMove,
  SortableHandle
} from "react-sortable-hoc";

const SummaryCardDiv = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid ${color.gray.ui_02};
  border-radius: 4px;
  padding: 16px 24px;
  margin-top: ${props => props.marginTop};
  width: 100%;
  box-sizing: border-box;
  background-color: white;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 16px;
  }

  .SummaryCard {
    &__details {
      flex: 1;
      overflow-x: hidden;

      @media (max-width: ${breakpoints.mobile}) {
        .Text {
          font-size: ${font_size.s} !important;
          line-height: ${line_height.s};
        }

        .Text.description {
          max-width: calc(100% - 24px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    &__actions {
      display: flex;
      align-items: center;
      flex: 0 0 auto;

      button {
        &:first-child {
          margin-right: 16px;
        }
      }
    }
  }
`;

export class SummaryCard extends React.PureComponent {
  render() {
    const {
      onClickEdit,
      title,
      description,
      className,
      onDelete,
      confirmModalHeading,
      confirmModalText,
      marginTop
    } = this.props;
    let newDescription =
      typeof description === "function" ? description() : description;
    let newTitle = typeof title === "function" ? title() : title;
    return (
      <SummaryCardDiv
        className={`SummaryCard ${className}`.trim()}
        marginTop={marginTop}
      >
        <div className="SummaryCard__details">
          {newTitle && <Text isBold>{newTitle}</Text>}
          {newDescription && (
            <Text className="description" size="small">
              {newDescription}
            </Text>
          )}
        </div>

        <ToggleModal>
          {(showModal, onOpenModal, onCloseModal) => (
            <React.Fragment>
              <div className="SummaryCard__actions">
                <IconButton
                  appearance="subtle"
                  icon="edit"
                  onClick={onClickEdit}
                />
                <IconButton
                  appearance="subtle"
                  icon="delete"
                  onClick={onOpenModal}
                />
              </div>
              <Confirm
                heading={confirmModalHeading}
                description={confirmModalText}
                onConfirm={onDelete}
                onCloseModal={onCloseModal}
                showModal={showModal}
              />
            </React.Fragment>
          )}
        </ToggleModal>
      </SummaryCardDiv>
    );
  }
}

SummaryCard.defaultProps = {
  title: "Untitled",
  className: "",
  marginTop: "24px",
  onClickEdit: () => {}
};

// Sortable SummaryCard Component

const DragHandle = SortableHandle(({ className }) => (
  <div className={`DragHandle ${className}`}>
    <Icon name="menu" />
  </div>
));

const StyledSortableSummaryCard = styled.div`
  display: flex;
  transition-timing-function: ease-in-out;

  &:first-child {
    margin-top: 24px;
  }

  &:not(:last-child) {
    margin-bottom: 16px;
  }

  .DragHandle {
    border: 2px solid ${color.gray.ui_02};
    border-right: 0;
    display: flex;
    align-items: center;
    padding: 24px 16px 24px 24px;
    background-color: white;

    @media screen and (max-width: 480px) {
      padding: 24px 8px 24px 16px;
    }

    cursor: move;

    &:active {
      cursor: grabbing;
    }
  }
  .is-hidden {
    display: none;
  }

  .SummaryCard {
    margin-top: 0;
    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding-left: 8px;
  }
`;

const SummaryCardDraggable = ({ handler, ...rest }) => (
  <React.Fragment>
    {handler}
    <SummaryCard {...rest} />
  </React.Fragment>
);

export const SortableSummaryCard = SortableElement(props => (
  <StyledSortableSummaryCard>
    <DragHandle />
    <SummaryCard {...props} />
  </StyledSortableSummaryCard>
));

export function CreateSortableComponent(
  SummaryComponent,
  keyFunc = (item, index) => `item-${index}`
) {
  const SortableSummaryCard2 = SortableElement(props => (
    <StyledSortableSummaryCard>
      <SummaryComponent handler={<DragHandle />} {...props} />
    </StyledSortableSummaryCard>
  ));
  const SortableSummaryCardList2 = SortableContainer(
    ({ items, editables = [], props = () => ({}) }) => {
      return (
        <div>
          {items.map((item, index) => {
            return (
              <SortableSummaryCard2
                key={keyFunc(item, index)}
                {...props(item, index)}
                editable={editables.includes(index)}
                index={index}
              />
            );
          })}
        </div>
      );
    }
  );
  return SortableSummaryCardList2;
}

export const SortableSummaryCardList = CreateSortableComponent(
  SummaryCardDraggable
);

export class SortableSummaryCardGroup extends React.Component {
  state = {
    items: this.props.value
  };
  static getDerivedStateFromProps(props, state) {
    return {
      items: props.value
    };
  }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.value.length !== this.props.value.length) {
  //     this.setState({
  //       items: this.props.value,
  //     });
  //   }
  //   let prv = prevProps.value.filter(x => Object.keys(x) > 0);
  //   let curr = this.props.value.filter(x => Object.keys(x) > 0);
  //   console.log(this.props.value)
  //   if (prv.length !== curr.length) {
  //     this.setState({
  //       items: this.props.value,
  //     });
  //   }
  // }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const newValue = arrayMove(this.state.items, oldIndex, newIndex);
    this.setState(
      {
        items: newValue
      },
      () => {
        this.props.onChange(newValue);
      }
    );
  };

  render() {
    const { lockAxis, axis, SortableComponent } = this.props;
    return (
      <SortableComponent
        lockAxis={lockAxis}
        axis={axis}
        helperClass="sorted"
        useDragHandle={true}
        hideSortableGhost={true}
        items={this.state.items}
        editables={this.props.editables}
        onSortEnd={this.onSortEnd}
        props={this.props.summaryProps}
      />
    );
  }
}

SortableSummaryCardGroup.defaultProps = {
  onChange: list => console.log(list),
  SortableComponent: SortableSummaryCardList,
  editables: [],
  summaryProps: (item, index) => ({
    index,
    title: item.position,
    description: item.company
  })
};
