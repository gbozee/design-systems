import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { color } from "../design-system/color";
import { font_weight } from "../design-system/font";
import { Text } from "./Text";

const currency_symbol = {
  usd: "$",
  ngn: "₦",
  kes: "KSh",
  gbp: "£",
  eur: "€",
  zar: "R",
  ghs: "GH₵"
};

const StyledPricingCard = styled.div`
  padding: 48px;
  position: relative;
  max-width: 360px;
  background: #ffffff;
  border: 1px solid ${color.gray.ui_02};
  border-radius: 4px;
  box-shadow: 0 1px 0 0 #e6e6e6;
  transition: all 0.3s ease-in-out;

  @media (max-width: 480px) {
    padding: 24px;
  }

  .Pricing {
    &__plan {
      margin-bottom: 16px;
    }

    &__price {
      .amount {
        margin-bottom: 8px;
      }

      .billing {
        margin-bottom: 24px;
      }
    }

    &__features {
      max-width: 300px;
      padding-top: 30px;

      .Text {
        padding: 4px 12px;
      }
    }
  }
`;

const StyledPrice = styled.div`
  display: flex;
  align-items: center;

  .currency {
    font-size: 18px;
    line-height: 1em;
    margin-right: 4px;
  }

  .price {
    font-size: 48px;
    font-weight: ${font_weight.medium};
    line-height: 1em;
    color: ${color.gray.primary};
    letter-spacing: -1.2px;
  }

  .priceSubtext {
    font-size: 16px;
    line-height: 1em;
    margin-left: 4px;
    font-weight: ${font_weight.regular};
  }
`;

export const Price = ({ children, currency, priceSubtext, className }) => (
  <StyledPrice className={`Price ${className}`.trim()}>
    <div className="currency">{currency_symbol[currency.toLowerCase()]}</div>
    <div className="price">{children}</div>
    {priceSubtext && <div className="priceSubtext">{priceSubtext}</div>}
  </StyledPrice>
);

export class PricingCard extends Component {
  render() {
    const {
      plan,
      currency,
      price,
      priceSubtext,
      benefits,
      billingText,
      buttonText,
      onClick
    } = this.props;
    return (
      <StyledPricingCard className="PricingCard">
        <Text className="Pricing__plan" isBold>
          {plan}
        </Text>
        
        <div className="Pricing__price">
          <Price
            currency={currency}
            priceSubtext={priceSubtext}
            className="amount"
          >
            {price}
          </Price>
          <Text size="small" className="billing">
            {billingText}
          </Text>
        </div>

        <div className="PayButton">
          <Button appearance="green" isFullWidth onClick={onClick}>
            {buttonText}
          </Button>
        </div>

        <div className="Pricing__features">
          {benefits.map(benefit => (
            <Text
              isBold
              // size="small"
              iconBefore="check"
              iconColor={color.cyan.primary}
              marginTop="2px"
            >
              {benefit}
            </Text>
          ))}
        </div>
      </StyledPricingCard>
    );
  }
}

PricingCard.defaultProps = {
  plan: "Pay As You Go",
  price: 3500,
  currency: "ngn",
  priceSubtext: "/mo",
  billingText: "billed monthly",
  buttonText: "Select Plan",
  benefits: [
    "2 resumes",
    "Unlimited Edits",
    "Unlimited Downloads",
    "4 Templates",
    "Remove CareerLyft Branding"
  ]
};
