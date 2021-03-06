import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { shadowBorder } from '../../../../../../styles/style-helpers';
import { sizes } from '../../../../../../styles/constants';

const { KILO, MEGA, GIGA } = sizes;
const sizeMap = {
  [KILO]: 'kilo',
  [MEGA]: 'mega',
  [GIGA]: 'giga'
};

const baseStyles = ({ theme }) => css`
  label: wrapper__item;

  align-items: center;
  position: relative;
  cursor: pointer;
  border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.n300};

  &:hover,
  &:focus {
    outline: none;

    &::after {
      content: ' ';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      ${shadowBorder(theme.colors.b500, theme.borderWidth.mega)};
      border-radius: ${theme.borderRadius.mega};
    }
  }

  &:first-child {
    border-top-left-radius: ${theme.borderRadius.mega};
    border-top-right-radius: ${theme.borderRadius.mega};
  }

  &:last-child {
    border-bottom-left-radius: ${theme.borderRadius.mega};
    border-bottom-right-radius: ${theme.borderRadius.mega};
  }
`;

const paddingStyles = ({ theme, padding }) => css`
  padding: ${theme.spacings[sizeMap[padding]]};
`;

const selectedStyles = ({ theme, selected }) =>
  selected &&
  css`
    label: wrapper__item--selected;

    background: ${theme.colors.p100};
  `;

const Wrapper = styled('div')(baseStyles, paddingStyles, selectedStyles);

Wrapper.propTypes = {
  /**
   * When true, shows the item with selected styles.
   */
  selected: PropTypes.bool,
  /**
   * Circuit UI spacing size.
   */
  padding: PropTypes.oneOf([Text.KILO, Text.MEGA, Text.GIGA])
};

Wrapper.defaultProps = {
  selected: false,
  padding: GIGA
};

export default Wrapper;
