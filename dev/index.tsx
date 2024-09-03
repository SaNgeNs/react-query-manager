/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable import/no-extraneous-dependencies */
import React, { createElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElem = document.getElementById('root');

function Root() {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}

if (rootElem) {
  createRoot(rootElem).render(
    createElement(
      Root,
    ),
  );
} else {
  alert('Cannot find element with id "root", something went wrong');
}

new EventSource('/esbuild').addEventListener('change', () => location.reload());
