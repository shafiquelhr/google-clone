import React, { useState } from 'react';

const languages = [
  'English (United States)',
  'Español (España)',
  'Français (France)',
  'Deutsch (Deutschland)',
  '日本語',
  '中文 (简体)',
  'Português (Brasil)',
  'Italiano',
  'Nederlands',
  'Polski',
  'Русский',
  '한국어'
];

export function Footer() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="language-selector" onClick={() => setShowDropdown(!showDropdown)}>
            <span>{selectedLanguage}</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M7 10l5 5 5-5z" />
            </svg>

            {showDropdown && (
              <ul className="language-dropdown">
                {languages.map((lang) => (
                  <li
                    key={lang}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLanguage(lang);
                      setShowDropdown(false);
                    }}
                    className={lang === selectedLanguage ? 'selected' : ''}
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="footer-right">
          <a href="https://support.google.com/accounts" target="_blank" rel="noopener noreferrer">Help</a>
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy</a>
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms</a>
        </div>
      </div>
    </footer>
  );
}
