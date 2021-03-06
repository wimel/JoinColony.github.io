/* @flow */

import type { IntlShape } from 'react-intl';

import React from 'react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import { useStaticQuery, graphql } from 'gatsby';

import type { Project } from '~types';

import Heading from '~core/Heading';
import { transformProjectData } from '~utils/docs';

import CoreProductsItem from '../CoreProductsItem';

import styles from './CoreProducts.module.css';

const MSG = defineMessages({
  sectionTitle: {
    id: 'pages.Developers.CoreProducts.sectionTitle',
    defaultMessage: 'Colony Core',
  },
  sectionText: {
    id: 'pages.Developers.CoreProducts.sectionText',
    defaultMessage:
      // eslint-disable-next-line max-len
      'Engage with Colony to manage work, shared funds, and reputation. Integrate directly with the smart contracts, use colonyJS to build Colony into your app, or fire up the colonyStarter for boilerplates and implementation examples.',
  },
});

type Props = {|
  /** Injected via `injectIntl` */
  intl: IntlShape,
|};

export const coreProjectSortOrder: Array<string> = [
  'colonyNetwork',
  'colonyJS',
  'colonyStarter',
];

const displayName = 'pages.Developers.CoreProducts';

const CoreProducts = ({ intl: { locale } }: Props) => {
  const projectQueryData = useStaticQuery(graphql`
    {
      ...coreProjectsFragment
    }
  `);

  const projects: Array<Project> = projectQueryData.coreProjects.edges
    .map(projectEdge => transformProjectData(projectEdge, locale))
    // Sort projects by order defined in above array
    .sort(
      ({ name: nameA }, { name: nameB }) =>
        coreProjectSortOrder.indexOf(nameA) -
        coreProjectSortOrder.indexOf(nameB),
    );

  return (
    <div className={styles.main}>
      <div className={styles.gradientWrapper}>
        <div className={styles.sectionIntroContent}>
          <Heading
            appearance={{ size: 'large', theme: 'invert', weight: 'medium' }}
            text={MSG.sectionTitle}
          />
          <p>
            <FormattedMessage {...MSG.sectionText} />
          </p>
        </div>
        <div className={styles.coreProductsRow}>
          {projects.map(project => (
            <div className={styles.coreProductsItem} key={project.name}>
              <CoreProductsItem project={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

CoreProducts.displayName = displayName;

export default injectIntl(CoreProducts);
