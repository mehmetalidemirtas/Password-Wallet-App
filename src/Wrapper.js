import React from 'react';
import Router from './Router';
import FlashMessage from 'react-native-flash-message';

export default () => {
  return (
    <>
      <Router />
      <FlashMessage position="top" />
    </>
  );
};
