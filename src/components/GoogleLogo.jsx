import React from 'react';
import googleLogo from '../assets/Google__G__logo.svg.png';

export function GoogleLogo({ size = 75, className = '' }) {
  return (
    <img
      src={googleLogo}
      alt="Google"
      width={size}
      height={size}
      className={`google-logo ${className}`}
      style={{
        objectFit: 'contain',
        display: 'block'
      }}
    />
  );
}
