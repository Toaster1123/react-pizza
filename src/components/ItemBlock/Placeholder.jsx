import React from 'react';
import ContentLoader from 'react-content-loader';

export const Placeholder = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="138" cy="138" r="138" />
    <rect x="0" y="295" rx="10" ry="10" width="280" height="20" />
    <rect x="1" y="337" rx="10" ry="10" width="274" height="88" />
    <rect x="1" y="443" rx="10" ry="10" width="95" height="30" />
    <rect x="122" y="442" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
);
