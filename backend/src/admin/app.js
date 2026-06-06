import React from 'react';

const SortIcon = () =>
  React.createElement(
    'svg',
    { width: '16', height: '16', viewBox: '0 0 24 24', fill: 'currentColor' },
    React.createElement('path', {
      d: 'M3 18h6v-2H3v2zm0-5h12v-2H3v2zm0-7v2h18V6H3z',
    })
  );

const config = {};

const bootstrap = (app) => {
  app.addMenuLink({
    to: '/project-order',
    icon: SortIcon,
    intlLabel: {
      id: 'project-order.plugin.name',
      defaultMessage: 'Project Order',
    },
    Component: async () => {
      const { default: Page } = await import('./pages/ProjectOrder');
      return { default: Page };
    },
    permissions: [],
  });
};

export default {
  config,
  bootstrap,
};
