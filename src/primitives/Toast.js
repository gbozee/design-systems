import React, { Fragment } from 'react';
import styled, { keyframes, css } from 'styled-components';
import propTypes from 'prop-types';
import { Icon } from './Icon/icons';
import { Button, EmptyButton } from './Button';
import { Text } from './Text';
import { color } from '../design-system/color';

const fadeIn = keyframes`
  from { bottom: 0; opacity: 0; } 
  to { bottom: 30px; opacity: 1; }
`;

const fadeOut = keyframes`
 from {bottom: 30px; opacity: 1;} 
    to {bottom: 0; opacity: 0;}
`;

function generateBgColor(props) {
  switch (props.status) {
    case 'error':
      return css`
        background-color: ${color.red.primary};
      `;
    case 'success':
      return css`
        background-color: ${color.green.primary};
      `;
    case 'warning':
      return css`
        background-color: ${color.orange.light};
        .Toast__body__description p {
          color: ${color.gray.primary} !important;
        }
        .Toast__header__title p {
          color: ${color.gray.primary} !important;
        }
        .Toast__header__left-icon svg {
          color: ${color.gray.primary} !important;
        }
      `;
    case 'info':
      return css`
        background-color: ${color.gray.primary};
      `;
    default:
      return css`
        background-color: white;
        border: 2px solid ${color.gray.ui_02};
        .Toast__body__description .Text {
          color: ${color.gray.primary} !important;
        }
        .Toast__header__title .Text {
          color: ${color.gray.primary} !important;
        }
      `;
  }
}

const ToastIcons = {
  error: 'error',
  success: 'check-01',
  warning: 'error',
  info: 'alert',
};

const ToastDiv = styled.div`
  bottom: 0px;
  position: fixed;
  min-width: 400px;
  z-index: 500000;
  left: 32px;
  bottom: 32px;
  animation: ${fadeIn} 0.3s
    ${props => props.autoClose && `, ${fadeOut} 0.3s 1.7s`};

  .Toast__wrapper {
    ${props => generateBgColor(props)};
    width: 100%;
    border-radius: 4px;
    padding: 16px;
    padding-top: 12px;
  }

  .Toast__header {
    display: flex;
    align-items: center;
    height: 32px;

    &__left-icon {
      width: 40px;
      flex: 0 0 auto;
    }

    &__title {
      color: white;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1 1 0%;
      margin-top: -2px;
    }

    &__close-icon {
      border-radius: 3px;
      flex: 0 0 auto;
      padding: 0px;
    }
  }

  .Toast__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0px;
    flex: 1 1 100%;
    padding: 0px 0px 0px 40px;

    &__description {
      color: white;
      word-wrap: break-word;
    }

    &__actions {
      display: flex;
      flex-wrap: wrap;
      padding-top: 8px;

      .Button {
        margin-right: 8px;
      }
    }
  }
`;

export class Toast extends React.Component {
  // componentDidUpdate(nextProps) {
  //   if (this.props.showToast) {
  //     setTimeout(() => {
  //       this.props.onClose();
  //     }, 2000);
  //   }
  // }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.props.onClose();
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const {
      title,
      children,
      autoClose,
      showCloseButton,
      onClose,
      status,
      actions,
    } = this.props;

    const generatedButtonTags = actions.map(action => (
      <Button
        className="button"
        key={action.content}
        small
        gray
        onClick={action.onClick}
      >
        {action.content}
      </Button>
    ));

    return (
      <Fragment>
        {this.props.showToast && (
          <ToastDiv status={status} autoClose={autoClose}>
            <div className="Toast__wrapper" role="alert">
              <div className="Toast__header">
                <div className="Toast__header__left-icon">
                  <Icon name={ToastIcons[status]} size={20} color="white" />
                </div>

                {title && (
                  <Text isBold color="white" className="Toast__header__title">
                    {title}
                  </Text>
                )}

                {showCloseButton && (
                  <EmptyButton className="Toast__close-icon" onClick={onClose}>
                    <Icon name="close" size={20} color="white" />
                  </EmptyButton>
                )}
              </div>

              <div className="Toast__body">
                <Text className="Toast__body__description" color="white">
                  {children}
                </Text>
                {actions.length > 0 && (
                  <div className="Toast__body__actions">
                    {generatedButtonTags.map(button => button)}
                  </div>
                )}
              </div>
            </div>
          </ToastDiv>
        )}
      </Fragment>
    );
  }
}

Toast.defaultProps = {
  autoClose: true,
  children: 'Your resume is taking shape',
  showCloseButton: false,
  status: 'success',
  actions: [],
};

/*
How to use Actions
actions={[
        { content: "Try again", onClick: () => {} },
        { content: "Refresh", onClick: () => {} }
      ]}
*/

Toast.propTypes = {
  autoClose: propTypes.bool,
  title: propTypes.string,
  children: propTypes.oneOfType([propTypes.string, propTypes.node]),
  showCloseButton: propTypes.bool,
  status: propTypes.oneOf(['error', 'success', 'warning', 'info']),
  actions: propTypes.arrayOf(
    propTypes.shape({
      content: propTypes.string,
      onClick: propTypes.func,
    })
  ),
};
