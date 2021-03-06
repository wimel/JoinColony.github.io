/* @flow */

import type { Node } from 'react';
import type { IntlShape, MessageDescriptor } from 'react-intl';

import React from 'react';
import { injectIntl } from 'react-intl';

import Link from '~core/Link';
import SpinnerLoader from '~core/SpinnerLoader';
import { getMainClasses } from '~utils/css';

import styles from './Button.module.css';

type Appearance = {|
  theme?: 'primary' | 'primaryHollow' | 'callToAction' | 'reset',
  borderRadius?: 'none' | 'medium',
  color?: 'blue' | 'grey' | 'red' | 'white',
  font?: 'tiny' | 'small',
  hover?: 'disablePrimary',
  padding?: 'small' | 'large' | 'huge',
  size?: 'medium' | 'large' | 'stretch',
  weight?: 'bold' | 'medium',
|};

type Arrow = 'right' | 'left';

type Props = {
  /** Appearance object */
  appearance?: Appearance,
  /** Arrow for links */
  arrow?: Arrow,
  /** `children` to render (only works if `text` is not set) */
  children?: Node,
  /** Setting this will add className styles to the `appearance` object */
  className?: string,
  /** We need to declare "disabled" in order to combine with loading. */
  disabled?: any,
  /** Injected by `injectIntl` */
  intl: IntlShape,
  /** Disable button and use loading spinner if loading */
  loading?: boolean,
  /** Use a link instead of a button. Like `@reach/router`'s `to` property */
  linkTo?: string,
  /** A string or a `messageDescriptor` that make up the button's text label */
  text?: MessageDescriptor | string,
  /** Values for loading text (react-intl interpolation) */
  textValues?: Object,
  /** Standard html title attribute. Can be a string or a `messageDescriptor` */
  title?: MessageDescriptor | string,
  /** Values for loading title (react-intl interpolation) */
  titleValues?: Object,
  /** Button html type attribute */
  type?: 'button' | 'submit',
};

const displayName = 'Button';

const Button = ({
  arrow,
  appearance = { theme: 'primary' },
  children,
  className,
  disabled,
  intl: { formatMessage },
  loading,
  linkTo,
  text,
  textValues,
  title,
  titleValues,
  type = 'button',
  ...rest
}: Props) => {
  const classNames = className
    ? `${getMainClasses(appearance, styles)} ${className}`
    : getMainClasses(appearance, styles);
  const titleText =
    typeof title == 'string'
      ? title
      : title && formatMessage(title, titleValues);
  const buttonText =
    typeof text === 'string' ? text : text && formatMessage(text, textValues);

  /*
   * Fall-back to `null` since `text` and `children`
   * are both technically optional.
   */
  const buttonContent = buttonText || children || null;

  if (linkTo) {
    return (
      <Link arrow={arrow} className={classNames} href={linkTo} {...rest}>
        {buttonContent}
      </Link>
    );
  }

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={classNames}
      disabled={disabled || loading}
      title={titleText}
      type={type}
      {...rest}
    >
      {loading ? <SpinnerLoader /> : buttonContent}
    </button>
  );
};

Button.displayName = displayName;

export default injectIntl(Button);
