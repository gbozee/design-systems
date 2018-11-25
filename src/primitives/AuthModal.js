import React, { Component } from "react";
import { Button, Link } from "./Button";
import { Checkbox } from "./Checkbox";
import { Input } from "./Input";
import Alert from "./Alert";
import { Modal, ToggleModal } from "./Modal";
import { Text } from "./Text";
import { Row, Col } from "./Grid";
import { text_color } from "../design-system/color";
import axios from "axios";
import endpoints from "careerlyft-shared/src/endpoints";
import { tracker } from "../create-resume/CVContainer/tracker";

export const Error500 = [
  "An error occured from our servers. Please try again later"
];

export class SignupForm extends Component {
  state = {
    acceptedEmail: false,
    acceptedTerms: false,
    fields: {
      email: this.props.data.email
    },
    errors: {},
    error: false,
    isLoading: false
  };

  firstSignUpField = React.createRef();

  // I use this lifecycle to autofocus once the show prop has changed
  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show) {
      this.firstSignUpField.current.focus();
    }
  }

  onChange = (field, callback) => e => {
    let { fields } = this.state;
    let result = callback(e);
    this.setState({ fields: { ...fields, [field]: result } });
  };

  displayError = field => {
    let { fields, error } = this.state;
    return error && !Boolean(fields[field]);
  };

  signupUser(data) {
    return axios.request({
      url: `${endpoints.auth}signup`,
      method: "post",
      data: {
        ...data,
        ...this.state.fields
      }
    });
  }

  // I use this lifecycle to autofocus in event that this form is used separately
  componentDidMount() {
    this.firstSignUpField.current.focus();
  }

  handleSubmit = e => {
    e.preventDefault();
    let { fields } = this.state;
    let isValid = ["email", "password"].every(x => Boolean(fields[x]));
    this.setState({ errors: {} });
    let confirmation = true;

    if (isValid && confirmation) {
      this.setState({ isLoading: true });
      tracker("userSignedUp", {});
      this.signupUser(this.props.data || {})
        .then(({ data, ...rest }) => {
          this.props.onSubmit(data); //data is {user_id and token}
        })
        .catch(({ response: { data: { errors }, ...response }, ...rest }) => {
          if (response.status === 500) {
            this.setState({
              isLoading: false,
              errors: {
                email: Error500
              }
            });
          } else {
            this.setState({ errors, isLoading: false, error: true });
          }
        });
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    const { isLoading, acceptedTerms, acceptedEmail } = this.state;
    const { email, password } = this.state.fields;
    const { show, goToLogin } = this.props;
    return (
      <form
        onSubmit={this.handleSubmit}
        style={{ display: show ? "inherit" : "none" }}
      >
        {Object.keys(this.state.errors).length > 0 ? (
          <Alert type="error" marginBottom="16px">
            {/* {Oops! Your Email/Password details is Incorrect} */}
            {Object.values(this.state.errors)}
          </Alert>
        ) : null}

        <Input
          placeholder="Email Address"
          label="Email Address"
          marginTop="0"
          innerRef={this.firstSignUpField}
          value={email}
          type="email"
          iconAfter="email-outline"
          onBlur={this.onChange("email", e => e.target.value)}
          isInvalid={this.displayError("email", this.state.errors.email)}
        />
        <Input
          placeholder="Enter a secure password"
          type="password"
          label="Password"
          value={password}
          onBlur={this.onChange("password", e => e.target.value)}
          error={this.displayError("password", this.state.errors.password)}
          iconAfter="lock-outline"
          isInvalid={false}
        />
        <Checkbox
          marginTop="16px"
          name="email-consent"
          onChange={e => this.setState({ acceptedEmail: e.target.checked })}
          isChecked={acceptedEmail}
        >
          Send me resume examples and updates
        </Checkbox>
        <Checkbox
          marginTop="16px"
          name="gdpr-consent"
          onChange={e => this.setState({ acceptedTerms: e.target.checked })}
          isChecked={acceptedTerms}
        >
          <span>
            I agree to your
            <Link isBold href="https://www.careerlyft.com/privacy-policy.html">
              Terms of service
            </Link>
            and
            <Link isBold href="https://www.careerlyft.com/privacy-policy.html">
              Privacy Policy
            </Link>
          </span>
        </Checkbox>

        <Button
          iconAfter="right-arrow"
          size="big"
          type="submit"
          isLoading={isLoading}
          isDisabled={!acceptedTerms}
          marginTop="24px"
          isFullWidth
        >
          Submit
        </Button>
        <Text align="center" marginTop="24px">
          Already have an account?
          <Link isBold onClick={goToLogin}>
            Login
          </Link>
        </Text>
      </form>
    );
  }
}

export class LoginForm extends Component {
  state = {
    fields: {
      email: this.props.email
    },
    errors: {},
    error: false,
    isLoading: false
  };

  firstLoginField = React.createRef();

  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show) {
      this.firstLoginField.current.focus();
    }
  }
  onChange = (field, callback) => e => {
    let { fields } = this.state;
    let result = callback(e);
    this.setState({ fields: { ...fields, [field]: result } });
  };
  displayError = field => {
    let { fields, error } = this.state;
    return error && !Boolean(fields[field]);
  };
  loginUser(data) {
    return axios.request({
      url: `${endpoints.auth}login`,
      method: "post",
      data: {
        ...data,
        ...this.state.fields
      }
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    let { fields } = this.state;
    let isValid = ["email", "password"].every(x => Boolean(fields[x]));
    // let noErrors = Object.keys(errors).length === 0;
    if (isValid) {
      this.setState({ errors: {}, isLoading: true });
      this.loginUser(this.props.data || {})
        .then(({ data, ...rest }) => {
          //data=>{token,user_id,last_stop_point}
          this.props.onSubmit(data);
        })
        .catch(data => {
          if (Boolean(data)) {
            let {
              response: {
                data: { errors },
                ...response
              }
            } = data;
            if (response.status === 500) {
              this.setState({
                isLoading: false,
                errors: {
                  email: Error500
                }
              });
            } else {
              this.setState({ isLoading: false, errors, error: true });
            }
          }
        });
    } else {
      this.setState({ error: true });
    }
  };
  componentDidMount() {
    this.firstLoginField.current.focus();
  }

  render() {
    const { isLoading } = this.state;
    const { email, password } = this.state.fields;
    const { show, goToForgotPassword, goToSignup } = this.props;
    return (
      <form
        onSubmit={this.handleSubmit}
        style={{ display: show ? "inherit" : "none" }}
      >
        {Object.keys(this.state.errors).length > 0 ? (
          <Alert type="error" marginBottom="16px">
            {/* {Oops! Your Email/Password details is Incorrect} */}
            {Object.values(this.state.errors)}
          </Alert>
        ) : null}
        <Input
          placeholder="Email Address"
          label="Email Address"
          marginTop="0"
          iconAfter="email-outline"
          innerRef={this.firstLoginField}
          value={email}
          type="email"
          onBlur={this.onChange("email", e => e.target.value)}
          isInvalid={this.displayError("email", this.state.errors.email)}
        />
        <Input
          placeholder="Enter a secure password"
          type="password"
          label="Password"
          value={password}
          onBlur={this.onChange("password", e => e.target.value)}
          isInvalid={this.displayError("password", this.state.errors.password)}
          iconAfter="lock-outline"
          onChange={this.onChange}
        />
        <Link marginTop="12px" isBold onClick={goToForgotPassword}>
          I forgot my password
        </Link>

        <Button
          iconAfter="right-arrow"
          size="big"
          type="submit"
          isLoading={isLoading}
          marginTop="24px"
          isFullWidth
        >
          Submit
        </Button>
        <Text align="center" marginTop="24px">
          Don't have an account?
          <Link isBold onClick={goToSignup}>
            Sign up
          </Link>
        </Text>
      </form>
    );
  }
}

export class ForgotPasswordForm extends Component {
  state = {
    email: "",
    error: false,
    errors: {},
    isLoading: false,
    success: false
  };

  firstResetPasswordField = React.createRef();

  componentDidUpdate(prevProps) {
    if (prevProps.show === this.props.show) {
      this.firstResetPasswordField.current.focus();
    }
  }

  componentDidMount() {
    this.firstResetPasswordField.current.focus();
  }

  onChange = (field, callback) => e => {
    let result = callback(e);
    this.setState({ fields: { [field]: result } });
  };
  displayError = field => {
    let { error } = this.state;
    return error && !Boolean(this.state[field]);
  };
  loginUser(data) {
    return axios.request({
      url: `${endpoints.auth}reset-password`,
      method: "post",
      data
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    if (Boolean(this.state.email)) {
      this.setState({ isLoading: true });
      this.loginUser({
        email: this.state.email,
        callback: this.props.reset_link
      })
        .then(({ data, ...rest }) => {
          this.setState({ success: true, isLoading: false });
          //data=>{token,user_id,last_stop_point}
        })
        .catch(data => {
          if (Boolean(data)) {
            let {
              response: {
                data: { errors },
                ...response
              }
            } = data;
            if (response.status === 500) {
              this.setState({ errors: { email: Error500 }, isLoading: false });
            } else {
              this.setState({ errors, error: true, isLoading: false });
            }
          }
        });
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    const { isLoading } = this.state;
    const { show, goToLogin } = this.props;
    return (
      <form
        onSubmit={this.handleSubmit}
        style={{ display: show ? "inherit" : "none" }}
      >
        {Object.keys(this.state.errors).length > 0 ? (
          <Alert type="error" marginBottom="16px">
            {/* {Oops! Your Email/Password details is Incorrect} */}
            {Object.values(this.state.errors)}
          </Alert>
        ) : null}
        {this.state.success && (
          <Alert type="success" marginBottom="16px">
            "A reset link has been sent to your email."
          </Alert>
        )}
        <Text marginTop="-4px" color={text_color.secondary}>
          Enter the email address associated with your account, and we’ll email
          you a link to reset your password.
        </Text>
        <Input
          placeholder="blackpanther@gmail.com"
          label="Email Address"
          iconAfter="email"
          type="email"
          innerRef={this.firstResetPasswordField}
          value={this.state.email}
          onBlur={e => this.setState({ email: e.target.value })}
          isInvalid={this.displayError("email", this.state.errors.email)}
        />
        <Row>
          <Col>
            <Button
              iconBefore="left-arrow"
              appearance="subtle"
              marginTop="32px"
              onClick={goToLogin}
            >
              Back to login
            </Button>
          </Col>
          <Col>
            <Button
              type="submit"
              isLoading={isLoading}
              marginTop="32px"
              isFullWidth
            >
              Send reset link
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

export class AuthModal extends Component {
  state = {
    display: "signup",
    openModal: this.props.showModal || false
  };

  componentDidUpdate(prevProps) {
    if (this.props.force !== prevProps.force) {
      this.setState({ display: this.props.display });
    }
  }
  closeModal = () => {
    this.setState({ openModal: false });
    this.props.closeModal();
  };
  render() {
    var heading = {
      signup: "Sign up to save your CV",
      login: "Login to continue",
      forgotPassword: "Reset password"
    };
    var { display } = this.state;
    return (
      <ToggleModal>
        {(showModal, onOpenModal) => (
          <Modal
            heading={heading[display]}
            onCloseModal={this.closeModal}
            showModal={showModal || this.props.showModal}
          >
            <SignupForm
              show={display === "signup"}
              data={this.props.data || {}}
              goToLogin={e => {
                e.preventDefault();
                this.setState({ display: "login" });
              }}
              onSubmit={data => {
                this.props.onSubmit(data, this.state.display);
              }}
            />
            <LoginForm
              email={(this.props.data || {}).email}
              show={display === "login"}
              goToForgotPassword={e => {
                e.preventDefault();
                this.setState({ display: "forgotPassword" });
              }}
              onSubmit={data => {
                this.props.onSubmit(data, this.state.display);
                this.onCloseModal();
              }}
              goToSignup={e => {
                e.preventDefault();
                this.setState({ display: "signup" });
              }}
            />
            {display === "forgotPassword" && (
              <ForgotPasswordForm
                show={display === "forgotPassword"}
                resetLink={this.props.reset_url}
                goToLogin={e => {
                  e.preventDefault();
                  this.setState({ display: "login" });
                }}
              />
            )}
          </Modal>
        )}
      </ToggleModal>
    );
  }
}
