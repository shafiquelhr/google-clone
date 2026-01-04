import React from 'react';

export function Button({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'text'
  type = 'button',
  disabled = false,
  loading = false,
  className = ''
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn--${variant} ${loading ? 'btn--loading' : ''} ${className}`}
    >
      {loading ? (
        <span className="btn-spinner">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="31.4159"
              strokeDashoffset="10"
            />
          </svg>
        </span>
      ) : null}
      <span className={loading ? 'btn-text--hidden' : ''}>{children}</span>
    </button>
  );
}
