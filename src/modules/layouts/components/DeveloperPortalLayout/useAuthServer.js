/* @flow */

import type { Socket } from 'socket.io-client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import type { Discourse, GitHub } from '~types';

import { getStore, setStore } from './localStorage';

const useAuthServer = () => {
  const [discourse, setDiscourse] = useState<?Discourse>(null);
  const [github, setGitHub] = useState<?GitHub>(null);
  const [socket, setSocket] = useState<?Socket>(null);

  useEffect(() => setDiscourse(getStore('discourse')), []);
  useEffect(() => setGitHub(getStore('github')), []);

  useEffect(() => setStore('discourse', discourse), [discourse]);
  useEffect(() => setStore('github', github), [github]);

  useEffect(() => {
    if (!socket) {
      const newSocket = io.connect(
        process.env.SOCKET || 'http://localhost:8080',
      );
      newSocket.on('discourse', setDiscourse);
      newSocket.on('github', setGitHub);
      setSocket(newSocket);
    }
    return () => {
      if (socket) {
        socket.off('discourse', setDiscourse);
        socket.off('github', setGitHub);
        socket.disconnect();
      }
    };
  }, [socket]);

  return {
    discourse,
    github,
    setDiscourse,
    setGitHub,
    socket,
  };
};

export default useAuthServer;
