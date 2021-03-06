/* @flow */

import React, { useCallback, useEffect, useState } from 'react';
import { defineMessages, FormattedDate, FormattedMessage } from 'react-intl';

import type { Issue, Network } from '~types';

import FormattedToken from '~core/FormattedToken';
import Link from '~core/Link';
import SpinnerLoader from '~core/SpinnerLoader';

import {
  getStore,
  setStore,
} from '~layouts/DeveloperPortalLayout/localStorage';

import styles from './IssueTableRow.module.css';

const MSG = defineMessages({
  error: {
    id: 'pages.Contribute.Issue.error',
    defaultMessage: 'Error',
  },
  none: {
    id: 'pages.Contribute.Issue.none',
    defaultMessage: 'None',
  },
});

type Props = {|
  issue: Issue,
  loadedRemote?: boolean,
  network: Network,
|};

const displayName = 'pages.Contribute.Issue';

const server = process.env.SERVER_URL || 'http://localhost:8080';

const IssueTableRow = ({ issue, loadedRemote, network }: Props) => {
  const [contribution, setContribution] = useState(null);
  const [error, setError] = useState(null);
  const [loadedLocal, setLoadedLocal] = useState(false);
  const [loading, setLoading] = useState(true);

  const formatIssueLink = url => {
    const repository = url.split('/')[4];
    const issueNumber = url.split('/')[6];
    return `${repository}#${issueNumber}`;
  };

  const getContribution = useCallback(async () => {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    // eslint-disable-next-line no-undef
    fetch(
      `${server}/api/contribution?networkId=${network ? network.id : 1}&issue=${
        issue.node.url
      }`,
      options,
    )
      .then(res => res.json())
      .then(data => {
        setContribution(data.contribution || { none: true });
        setLoading(false);
      })
      .catch(fetchError => {
        setError(fetchError);
        setLoading(false);
      });
  }, [issue, network]);

  useEffect(() => {
    if (!loadedLocal) {
      const localContribution = getStore(issue.node.url);
      setContribution(localContribution);
      setLoadedLocal(true);
    }
  }, [issue, loadedLocal]);

  useEffect(() => {
    setStore(issue.node.url, contribution);
  }, [contribution, issue]);

  useEffect(() => {
    if (loadedRemote) {
      getContribution();
    }
  }, [getContribution, loadedRemote]);

  return (
    <tr>
      <td>
        <FormattedDate value={issue.node.createdAt} />
      </td>
      <td>
        {issue.node.title.length > 50
          ? issue.node.title.substring(0, 50).concat('...')
          : issue.node.title}
      </td>
      <td>
        <Link href={issue.node.url} text={formatIssueLink(issue.node.url)} />
      </td>
      <td>
        {contribution && contribution.none && (
          <FormattedMessage {...MSG.none} />
        )}
        {contribution && !contribution.none && (
          <Link
            href={`/contribute/${contribution.type}?id=${contribution.typeId}`}
          >
            <FormattedToken amount={contribution.payout} symbol="CDEV" />
          </Link>
        )}
        {!contribution && loading && (
          <SpinnerLoader appearance={{ theme: 'primary' }} />
        )}
        {!contribution && error && (
          <span className={styles.error}>
            <FormattedMessage {...MSG.error} />
          </span>
        )}
      </td>
    </tr>
  );
};

IssueTableRow.displayName = displayName;

export default IssueTableRow;
