/* @flow */
import React, { useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import type { Project } from '~types';

import Button from '~core/Button';
import Icon from '~core/Icon';
import Link from '~core/Link';
import NavigationToggle from '~core/NavigationToggle';
import Popover from '~core/Popover';
import Search from '~core/Search';
import DocsDropdown from '~layouts/DeveloperPortalLayout/DocsDropdown';
import {
  COLONY_DISCOURSE_SUPPORT,
  PAGE_DEVELOPER_PORTAL,
  PAGE_TUTORIALS,
} from '~routes';

import styles from './Header.module.css';

const MSG = defineMessages({
  imageAltDevPortal: {
    id: 'layouts.DeveloperPortalLayout.Header.imageAltDevPortal',
    defaultMessage: 'Colony Developer Portal',
  },
  navLinkDocs: {
    id: 'layouts.DeveloperPortalLayout.Header.navLinkDocs',
    defaultMessage: 'Docs',
  },
  navLinkTutorials: {
    id: 'layouts.DeveloperPortalLayout.Header.navLinkTutorials',
    defaultMessage: 'Tutorials',
  },
  navLinkSupport: {
    id: 'layouts.DeveloperPortalLayout.Header.navLinkSupport',
    defaultMessage: 'Support',
  },
});

type Props = {|
  coreProjects: Array<Project>,
  openSourceProjects: Array<Project>,
|};

const displayName = 'layouts.DeveloperPortalLayout.Header';

const Header = ({ coreProjects, openSourceProjects }: Props) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div className={styles.main}>
      <div className={styles.menuWrapper}>
        <Link href={PAGE_DEVELOPER_PORTAL}>
          <Icon
            className={styles.logo}
            name="developerPortal_white"
            title={MSG.imageAltDevPortal}
            viewBox="0 0 134 33"
          />
        </Link>
        <div aria-expanded={isNavOpen} className={styles.navContainer}>
          <nav
            className={styles.navigation}
            role="navigation"
            aria-label="Main Navigation"
          >
            <span className={`${styles.navLink} ${styles.docsDropdownParent}`}>
              <Button appearance={{ theme: 'reset' }}>
                <Popover
                  appearance={{ theme: 'grey' }}
                  content={() => (
                    <DocsDropdown
                      coreProjects={coreProjects}
                      openSourceProjects={openSourceProjects}
                    />
                  )}
                  /*
                   * `isOpen` is always true for a11y purposes. This ensures the dropdown
                   * menu is always in the DOM, and visibility is controlled via CSS.
                   */
                  isOpen
                  placement="bottom-end"
                  popperProps={{
                    modifiers: {
                      offset: {
                        offset: '140px',
                      },
                    },
                  }}
                  trigger="disabled"
                  wrapperClassName={styles.docsDropdownContainer}
                >
                  <div className={styles.dropdownParent} aria-haspopup="true">
                    <FormattedMessage {...MSG.navLinkDocs} />
                  </div>
                </Popover>
              </Button>
              <div className={styles.mobileDocsDropdown}>
                <DocsDropdown
                  coreProjects={coreProjects}
                  openSourceProjects={openSourceProjects}
                />
              </div>
            </span>
            <Link className={styles.navLink} href={PAGE_TUTORIALS}>
              <FormattedMessage {...MSG.navLinkTutorials} />
            </Link>
            <Link
              className={styles.navLink}
              href={COLONY_DISCOURSE_SUPPORT}
              text={MSG.navLinkSupport}
            />
          </nav>
          <div className={styles.searchContainer}>
            <Search
              appearance={{ theme: 'light', type: 'quickSearch' }}
              inputId="devPortalLayoutHeaderSearch"
            />
          </div>
        </div>
        <div className={styles.navToggle}>
          <NavigationToggle
            appearance={{ hideAtSize: 'medium', theme: 'light' }}
            isNavOpen={isNavOpen}
            onClick={() => setIsNavOpen(!isNavOpen)}
          />
        </div>
      </div>
    </div>
  );
};

Header.displayName = displayName;

export default Header;
