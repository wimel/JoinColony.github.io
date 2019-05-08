/* @flow */

import type { IntlShape } from 'react-intl';
import type { WalletObjectType } from '@colony/purser-core';
import type { Socket } from 'socket.io-client';

import React, { Component } from 'react';
import { Router } from '@reach/router';
import { defineMessages, injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { accountChangeHook, open } from '@colony/purser-metamask';
import io from 'socket.io-client';

import SEO from '~parts/SEO';

import type { Provider, Discourse, GitHub, UserItem } from './types';

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
  page: string,
  intl: IntlShape,
  setGitHub: boolean => void,
  setWallet: boolean => void,
|};

type State = {
  fetchingWallet: boolean,
  discourse?: Discourse,
  github?: GitHub,
  socket?: Socket,
  wallet?: WalletObjectType,
};

class Dashboard extends Component<Props, State> {
  static displayName = 'pages.Dashboard';

  constructor(props) {
    super(props);
    this.state = {
      fetchingWallet: true,
      discourse: undefined,
      github: undefined,
      socket: undefined,
      wallet: undefined,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getUserItem('wallet');
    this.getUserItem('github');
    this.getUserItem('discourse');
    this.connectMetaMask();
    this.openUserWallet();
    this.connectSocket();
  }

  componentWillUnmount() {
    this._isMounted = false;
    const {
      setUserDiscourse,
      setUserGitHub,
      state: { socket },
    } = this;
    if (socket) {
      socket.off('discourse', setUserDiscourse);
      socket.off('github', setUserGitHub);
      socket.disconnect();
    }
  }

  _isMounted = false;

  authenticate = (provider: Provider) => {
    const { socket } = this.state;
    if (socket) {
      const api = process.env.API_URL || 'http://localhost:8080';
      const url = `${api}/auth/${provider}/?socketId=${socket.id}`;
      if (typeof window !== 'undefined') window.open(url);
    }
  };

  connectMetaMask = async () => {
    const handleAccountChange = metamask => {
      if (this._isMounted) {
        const { fetchingWallet, wallet } = this.state;
        if (!fetchingWallet && wallet && !metamask.selectedAddress) {
          this.setUserWallet(undefined);
        } else if (
          wallet &&
          fetchingWallet === false &&
          metamask.selectedAddress &&
          metamask.selectedAddress !== wallet.address
        ) {
          this.setState({ fetchingWallet: true });
          this.openUserWallet();
        }
      }
    };
    await accountChangeHook(handleAccountChange);
  };

  connectSocket = () => {
    const { setUserDiscourse, setUserGitHub } = this;
    const socket = io.connect(process.env.SOCKET || 'http://localhost:8080');
    socket.on('discourse', setUserDiscourse);
    socket.on('github', setUserGitHub);
    this.setState({ socket });
  };

  disconnect = (provider: Provider) => {
    if (typeof window !== 'undefined') {
      this.connectSocket();
      window.localStorage.removeItem(provider);
      const { state } = this;
      state[provider] = undefined;
      this.setState({ ...state });
    }
  };

  getUserItem = (name: UserItem) => {
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem(name);
      this.setState({ [name]: item ? JSON.parse(item) : undefined });
    }
  };

  openUserWallet = async () => {
    const wallet = await open();
    if (wallet) {
      this.setUserWallet(wallet);
    } else {
      this.setUserWallet(undefined);
    }
  };

  setUserDiscourse = (discourse: Discourse) => {
    if (typeof window !== 'undefined') {
      if (discourse) {
        window.localStorage.setItem('discourse', JSON.stringify(discourse));
      } else {
        window.localStorage.removeItem('discourse');
      }
      this.setState({ discourse });
    }
  };

  setUserGitHub = (github: GitHub) => {
    if (typeof window !== 'undefined') {
      if (github) {
        window.localStorage.setItem('github', JSON.stringify(github));
      } else {
        window.localStorage.removeItem('github');
      }
      this.setState({ github });
    }
  };

  setUserWallet = (wallet: WalletObjectType) => {
    if (typeof window !== 'undefined') {
      if (wallet) {
        window.localStorage.setItem('wallet', JSON.stringify(wallet));
      } else {
        window.localStorage.removeItem('wallet');
      }
      this.setState({ fetchingWallet: false, wallet });
    }
  };

  render = () => {
    const {
      page,
      intl: { formatMessage },
      setGitHub,
      setWallet,
    } = this.props;
    const { discourse, github, wallet } = this.state;
    const title = formatMessage(MSG.pageTitle);
    const closing = page === 'close';

    if (wallet) {
      setWallet(true);
    } else {
      setWallet(false);
    }
    if (github) {
      setGitHub(true);
    } else {
      setGitHub(false);
    }

    if (typeof window !== 'undefined' && closing) {
      window.close();
    }
    if (!wallet && !closing) {
      return <MetaMask />;
    }
    if (wallet && !github && !closing) {
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
            {github && wallet ? (
              <main className={styles.content}>
                <Router primary={false}>
                  <Account
                    path={page ? '/dashboard/account' : '/dashboard'}
                    authenticate={this.authenticate}
                    disconnect={this.disconnect}
                    discourse={discourse}
                    github={github}
                    wallet={wallet}
                  />
                  <Colonies
                    path="/dashboard/colonies"
                    discourse={discourse}
                    github={github}
                    wallet={wallet}
                  />
                  <Contributions
                    path="/dashboard/contributions"
                    discourse={discourse}
                    github={github}
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
