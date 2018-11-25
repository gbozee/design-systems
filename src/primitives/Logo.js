import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const StyledLogo = styled.svg`
  height: ${props => props.size};
  width: auto;
  flex-shrink: 0;

  path#logotype {
    transform: translateY(3px);
  }
`;

const logoColor = {
  white: {
    logomark: "#FFFFFF",
    logotype: "#00B5D8"
  },
  black: {
    logomark: "#37404A",
    logotype: "#00B5D8"
  },
  allWhite: {
    logomark: "#FFFFFF",
    logotype: "#FFFFFF"
  },
  allBlack: {
    logomark: "#37404A",
    logotype: "#37404A"
  }
};

function Logo(props) {
  const { size, type, className } = props;
  return (
    <StyledLogo
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 26"
      className={`Logo ${className}`.trim()}
      aria-label="CareerLyft Logo"
      size={size}
    >
      <path
        id="logotype"
        d="M39 9.957C39 3.99 43.52.203 48.546.203c5.182 0 7.853 3.163 8.594 6.196l-3.438 1.08c-.45-1.793-1.904-3.769-5.156-3.769-2.802 0-5.764 1.99-5.764 6.253 0 3.98 2.802 6.17 5.818 6.17 3.198 0 4.76-2.083 5.262-3.822l3.42 1.029c-.712 2.873-3.42 6.352-8.67 6.352S39 15.917 39 9.957zm22.712 1.873l3.2-.477c.742-.105.978-.475.978-.924 0-.923-.712-1.688-2.194-1.688-1.534 0-2.38.975-2.486 2.109l-3.121-.66c.21-2.029 2.09-4.263 5.578-4.263 4.125 0 5.658 2.32 5.658 4.931v6.375c.004.69.058 1.377.16 2.058H66.26a8.757 8.757 0 0 1-.131-1.555c-.661 1.03-1.904 1.924-3.834 1.924-2.776 0-4.47-1.872-4.47-3.902 0-2.319 1.72-3.612 3.886-3.928zm4.178 2.214v-.568l-2.935.435c-.898.13-1.614.634-1.614 1.634 0 .765.556 1.504 1.693 1.504 1.48-.012 2.856-.711 2.856-3.005zm13.853-4.243a5.308 5.308 0 0 0-1.057-.105c-1.799 0-3.358.87-3.358 3.663v5.932h-3.515V6.319h3.42v1.925c.793-1.706 2.592-2.03 3.706-2.03.275.004.549.022.821.054l-.017 3.533zm12.958 5.772c-.661 2.24-2.722 4.113-5.923 4.113-3.569 0-6.716-2.558-6.716-6.935 0-4.138 3.067-6.82 6.4-6.82 4.019 0 6.424 2.557 6.424 6.72 0 .501-.054 1.03-.054 1.08h-9.306c.08 1.706 1.533 2.954 3.278 2.954 1.639 0 2.54-.819 2.961-1.99l2.936.878zm-3.278-4.243c-.054-1.29-.898-2.558-2.907-2.558a2.813 2.813 0 0 0-2.908 2.558h5.815zm16.84 4.243c-.661 2.24-2.722 4.113-5.923 4.113-3.569 0-6.715-2.558-6.715-6.935 0-4.138 3.067-6.82 6.399-6.82 4.019 0 6.424 2.557 6.424 6.72 0 .501-.054 1.03-.054 1.08h-9.303c.08 1.706 1.533 2.954 3.278 2.954 1.638 0 2.54-.819 2.961-1.99l2.933.878zm-3.278-4.243c-.054-1.29-.898-2.558-2.907-2.558a2.813 2.813 0 0 0-2.908 2.558h5.815zM116.1 9.801a5.308 5.308 0 0 0-1.058-.105c-1.798 0-3.358.87-3.358 3.663v5.932h-3.517V6.319h3.42v1.925c.793-1.706 2.592-2.03 3.706-2.03.274.004.548.022.821.054l-.014 3.533zm1.613 9.49V.598h3.648v15.214h8.355v3.479h-12.003zm12.413 5.966l3.637-7.603-5.492-11.397h3.905l3.463 7.654 3.198-7.654h3.74l-8.717 19h-3.734zm29.838-15.581h-2.554v5.184c-.051 1.134.479 1.504 1.482 1.504a5.12 5.12 0 0 0 1.083-.106v2.914a5.23 5.23 0 0 1-1.995.315c-2.537 0-4.124-1.503-4.124-4.007l.122-6.077h-5.7v9.948h-3.42V9.403h-2.281V6.277h2.28V4.884c0-2.961 1.873-4.883 4.789-4.883.6-.013 1.198.077 1.767.268V3.11a4.373 4.373 0 0 0-1.186-.137c-.846 0-1.95.353-1.95 1.842v1.45h6.035l-.049-3.98h3.136v3.98h2.565v3.41z"
        fill={logoColor[type].logomark}
      />
      <path
        id="logomark"
        d="M15.54 14.211L26.865 2.938h-2.46a1.47 1.47 0 0 1 0-2.938h5.979a1.47 1.47 0 0 1 1.469 1.47v5.697a1.47 1.47 0 0 1-2.938 0V5L16.756 17.103a1.415 1.415 0 0 1-1.2.403 1.534 1.534 0 0 1-1.313-.444l-5.427-5.59a1.363 1.363 0 0 1 .09-2 1.559 1.559 0 0 1 2.115.084l4.52 4.655zm-3.22 11.306C5.527 25.517 0 19.99 0 13.196S5.527.874 12.32.874c2.397 0 4.721.69 6.722 1.995a1.47 1.47 0 0 1-1.605 2.46 9.34 9.34 0 0 0-5.117-1.517c-5.173 0-9.382 4.21-9.382 9.384s4.209 9.383 9.382 9.383a9.368 9.368 0 0 0 7.17-3.33 1.469 1.469 0 1 1 2.244 1.896 12.3 12.3 0 0 1-9.414 4.372z"
        fill={logoColor[type].logotype}
      />
    </StyledLogo>
  );
}

export default Logo;

Logo.defaultProps = {
  size: "48px",
  type: "black"
};

Logo.propTypes = {
  type: propTypes.oneOf(["allBlack", "allBlack", "white", "black"])
};
