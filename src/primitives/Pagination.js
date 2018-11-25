import React from "react";
import styled from "styled-components";
import { IconButton } from "./Button";
import { color } from "../design-system/color";

const StyledPagination = styled.div.attrs({ className: "Pagination" })`
  .PaginationGroup {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 12px 0;

    .IconButton {
      &:not(:disabled):hover {
        .Icon {
          color: ${color.cyan.primary};
        }
      }

      @media (min-width: 768px) {
        background-color: transparent;
      }
    }

    .Pagination {
      &__left-arrow {
        .Icon {
          transform: translateX(-2px);
        }
      }
      &__right-arrow {
        .Icon {
          transform: translateX(2px);
        }
      }

      &__text {
        padding: 0 16px;
      }
    }
  }
`;

class Pagination extends React.Component {
  state = {
    total_pages: this.props.totalPages,
    current_page: 1
  };

  onClickNext = () => {
    let { current_page = 1, total_pages = 1, onPageChange } = this.props;
    if (current_page < total_pages) {
      onPageChange(current_page + 1);
    }
  };

  onClickPrev = () => {
    let { current_page = 1, onPageChange } = this.props;
    if (current_page !== 1) {
      onPageChange(current_page - 1);
    }
  };

  render() {
    const { current_page = 1, total_pages, hide } = this.props;
    const isFirstPage = current_page === 1;
    const isLastPage = current_page === total_pages;

    return (
      <StyledPagination style={{ visibility: hide ? "hidden" : "visible" }}>
        <div className="PaginationGroup">
          <IconButton
            appearance="gray"
            icon="left-arrow"
            className="Pagination__left-arrow"
            onClick={this.onClickPrev}
            isDisabled={isFirstPage}
            small
          />
          <span className="Pagination__text">
            {current_page} of {total_pages}
          </span>
          <IconButton
            icon="right-arrow"
            className="Pagination__right-arrow"
            appearance="gray"
            onClick={this.onClickNext}
            isDisabled={isLastPage}
            small
          />
        </div>
      </StyledPagination>
    );
  }
}

Pagination.defaultProps = {
  totalPages: 5
};

export default Pagination;
