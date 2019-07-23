/* @flow */

import type { Element } from 'react';

import React, { Component, useRef } from 'react';

import type { Appearance as HeaderAppearance } from './Header/types';

import ThemeContext from './context';
import Footer from './Footer';
import Header from './Header';
import { useElementHeight } from '~hooks';

type Props = {|
  children: Element<typeof Component>,
  headerAppearance?: HeaderAppearance,
|};

const displayName = 'layouts.WebsiteLayout';

const WebsiteLayout = ({ children, headerAppearance }: Props) => {
  const ref = useRef(null);
  const height = useElementHeight(ref);
  return (
    <ThemeContext.Provider value={{ headerHeight: height }}>
      <div ref={ref}>
        <Header appearance={headerAppearance} showOnScrollHeight={300} />
      </div>
      {children}
      <Footer />
    </ThemeContext.Provider>
  );
};

WebsiteLayout.displayName = displayName;

export default WebsiteLayout;
