import React from 'react';
import { Helmet } from 'react-helmet';

const HelmetWrapper = () => {
  return (
    <Helmet>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Kalam&display=swap"
      />
    </Helmet>
  );
};

export default HelmetWrapper;
