/* @flow */

import type { IntlShape } from 'react-intl';
import type { WalletObjectType } from '@colony/purser-core';
import type { Socket } from 'socket.io-client';

import React, { Component } from 'react';
import { Router } from '@reach/router';
import { defineMessages, injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import SEO from '~parts/SEO';

import type { Provider, User } from '~types';

import Login from './Login';
import MetaMask from './MetaMask';
import Sidebar from './Sidebar';

import Account from './Account';
import Colonies from './Colonies';
import Contributions from './Contributions';

import styles from './Dashboard.module.css';

const MSG = defineMessages({
  pageDescription: {
    id: 'pages.Dashboard.pageDescription',
    defaultMessage: `A dashboard for developers building with Colony. Manage
    your developer account, add and remove colonies from your watchlist, and
    earn reputation and tokens for contributing to our open source projects.`,
  },
  pageTitle: {
    id: 'pages.Dashboard.pageTitle',
    defaultMessage: 'Developer Dashboard',
  },
});

export type Props = {|
  intl: IntlShape,
  page: string,
  setUser: (user: ?User) => void,
  socket: ?Socket,
  user: ?User,
  wallet: ?WalletObjectType,
|};

class Dashboard extends Component<Props> {
  static displayName = 'pages.Dashboard';

  authenticate = (provider: Provider) => {
    const { socket } = this.props;
    if (socket) {
      const api = process.env.API_URL || 'http://localhost:8080';
      const url = `${api}/auth/${provider}/?socketId=${socket.id}`;
      if (typeof window !== 'undefined') window.open(url);
    }
  };

  disconnect = (provider: Provider) => {
    const { setUser, user } = this.props;
    if (setUser && provider === 'discourse') {
      setUser({ ...user, discourse: null });
    }
    if (setUser && provider === 'github') {
      setUser(null);
    }
  };

  render = () => {
    const {
      intl: { formatMessage },
      page,
      setUser,
      user,
      wallet,
    } = this.props;
    const title = formatMessage(MSG.pageTitle);
    const closing = page === 'close';

    if (typeof window !== 'undefined' && closing) {
      window.close();
    }
    if (!wallet && !closing) {
      return <MetaMask />;
    }
    if (wallet && !user && !closing) {
      return <Login wallet={wallet} authenticate={this.authenticate} />;
    }
    return (
      <>
        <SEO description={MSG.pageDescription} title={title} />
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <main className={styles.main}>
          <div className={styles.mainInnerContainer}>
            <div className={styles.sidebar}>
              <Sidebar active={page || 'account'} />
            </div>
            {user && wallet ? (
              <main className={styles.content}>
                <Router primary={false}>
                  <Account
                    path={page ? '/dashboard/account' : '/dashboard'}
                    authenticate={this.authenticate}
                    disconnect={this.disconnect}
                    setUser={setUser}
                    user={user}
                    wallet={wallet}
                  />
                  <Colonies
                    path="/dashboard/colonies"
                    user={user}
                    wallet={wallet}
                  />
                  <Contributions
                    path="/dashboard/contributions"
                    user={user}
                    wallet={wallet}
                  />
                </Router>
              </main>
            ) : (
              <div style={{ height: '100vh' }} />
            )}
          </div>
        </main>
      </>
    );
  };
}

export default injectIntl(Dashboard);
