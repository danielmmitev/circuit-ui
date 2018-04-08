import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import CreditCardDetails, {
  CardNumberInput,
  ExpiryDateInput,
  SecurityCodeInput,
  NameOnCardInput,
  cardSchemeIcons,
  schemes,
  parseExpiryDate,
  parseCardNumber
} from '.';

const { SCHEMES } = schemes;

const supportedCardSchemes = {
  [SCHEMES.VISA]: cardSchemeIcons[SCHEMES.VISA],
  [SCHEMES.MASTERCARD]: cardSchemeIcons[SCHEMES.MASTERCARD],
  [SCHEMES.JCB]: cardSchemeIcons[SCHEMES.JCB]
};

class YourFavoriteFormLibrary extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  };

  state = {
    values: {
      name: '',
      cardNumber: '',
      expiryDate: '',
      securityCode: ''
    }
  };

  handleChange = (field, parse) => ({ target: { value } }) => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [field]: parse ? parse(value) : value
      }
    }));
  };

  render() {
    return this.props.children({
      values: this.state.values,
      handleChange: this.handleChange
    });
  }
}

storiesOf('CreditCardDetails', module)
  .addDecorator(withTests('CreditCardDetails'))
  .add(
    'Default CreditCardDetails',
    withInfo()(() => (
      <YourFavoriteFormLibrary>
        {({ values, handleChange }) => (
          <div style={{ width: '95vw', maxWidth: '600px', margin: '0 auto' }}>
            <CreditCardDetails
              nameOnCard={
                <NameOnCardInput
                  value={values.name}
                  onChange={handleChange('name')}
                />
              }
              cardNumber={
                <CardNumberInput
                  {...{ supportedCardSchemes }}
                  value={values.cardNumber}
                  onChange={handleChange('cardNumber', parseCardNumber)}
                />
              }
              expiryDate={
                <ExpiryDateInput
                  value={values.expiryDate}
                  onChange={handleChange('expiryDate', parseExpiryDate)}
                />
              }
              renderSecurityCodeInput={() => (
                <SecurityCodeInput
                  value={values.securityCode}
                  onChange={handleChange('securityCode')}
                />
              )}
            />
          </div>
        )}
      </YourFavoriteFormLibrary>
    ))
  );
