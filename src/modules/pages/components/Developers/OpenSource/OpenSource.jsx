/* @flow */

import type { IntlShape } from 'react-intl';

import React from 'react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import { useStaticQuery, graphql } from 'gatsby';

import type { Project } from '~types';

import Heading from '~core/Heading';
import { transformProjectData } from '~utils/docs';

import OpenSourceItem from '../OpenSourceItem';

import styles from './OpenSource.module.css';

const MSG = defineMessages({
  sectionIntroTitle: {
    id: 'pages.Developers.OpenSource.sectionIntroTitle',
    defaultMessage: 'Open Source Tools',
  },
  sectionIntroText: {
    id: 'pages.Developers.OpenSource.sectionIntroText',
    defaultMessage: 'Standalone tools for Ethereum developers.',
  },
});

type Props = {|
  /** Injected via `injectIntl` */
  intl: IntlShape,
|};

export const openSourceProjectSortOrder: Array<string> = [
  'purser',
  'tailor',
  'pinion',
  'trufflepig',
  'budgetBox',
  'solcover',
];

const displayName = 'pages.Developers.OpenSource';

const OpenSource = ({ intl: { locale } }: Props) => {
  const projectQueryData = useStaticQuery(graphql`
    {
      ...openSourceProjectsFragment
    }
  `);

  const projects: Array<Project> = projectQueryData.openSourceProjects.edges
    .map(edge => transformProjectData(edge, locale))
    // Sort projects by order defined in above array
    .sort(
      ({ name: nameA }, { name: nameB }) =>
        openSourceProjectSortOrder.indexOf(nameA) -
        openSourceProjectSortOrder.indexOf(nameB),
    );

  return (
    <div className={styles.main}>
      <div className={styles.introSection}>
        <Heading
          appearance={{
            margin: 'double',
            size: 'large',
            theme: 'invert',
            weight: 'medium',
          }}
          text={MSG.sectionIntroTitle}
        />
        <p>
          <FormattedMessage {...MSG.sectionIntroText} />
        </p>
      </div>
      <div className={styles.openSourceProductGrid}>
        {projects.map(project => (
          <div className={styles.openSourceItem} key={project.name}>
            <OpenSourceItem project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

OpenSource.displayName = displayName;

export default injectIntl(OpenSource);
