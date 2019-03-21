/* @flow */
import React from 'react';
import { defineMessages } from 'react-intl';

import Heading from '~core/Heading';
import Icon from '~core/Icon';
import Link from '~core/Link';

import styles from './SupportCta.module.css';

const MSG = defineMessages({
  sectionTitle: {
    id: 'pages.Developers.SupportCta.sectionTitle',
    defaultMessage: 'Questions? Problems? Existential dilemmas? We can help!',
  },
});

const displayName = 'pages.Developers.SupportCta';

const SupportCta = () => (
  <div className={styles.main}>
    <Heading
      appearance={{
        size: 'huge',
        theme: 'primary',
        weight: 'medium',
      }}
      text={MSG.sectionTitle}
    />
    <div className={styles.iconRow}>
      {/* @TODO fix links */}
      <Link className={styles.iconItemLink} href="/aslkdfjalf">
        <Icon name="social_discourse" title="Discourse" />
      </Link>
      <Link className={styles.iconItemLink} href="/aslkdfjalf">
        <Icon name="social_github" title="GitHub" />
      </Link>
      <Link className={styles.iconItemLink} href="/aslkdfjalf">
        <Icon name="social_gitter_devPortal" title="Gitter" />
      </Link>
    </div>
  </div>
);

SupportCta.displayName = displayName;

export default SupportCta;
