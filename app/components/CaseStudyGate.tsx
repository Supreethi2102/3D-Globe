import React, { useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeSlash } from '@phosphor-icons/react';
import {
  unlockCaseStudies,
  verifyCaseStudiesPassword,
} from '../config/caseStudiesAuth';
import './CaseStudyGate.css';

interface CaseStudyGateProps {
  /** May return a promise (e.g. preloading the hero); the gate stays up until it settles. */
  onUnlock: () => void | Promise<void>;
}

export const CaseStudyGate: React.FC<CaseStudyGateProps> = ({ onUnlock }) => {
  const navigate = useNavigate();
  const passwordId = useId();
  const errorId = useId();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOpening) return;
    if (!verifyCaseStudiesPassword(password)) {
      setError('Incorrect password. Please try again.');
      return;
    }
    unlockCaseStudies();
    setError('');
    setIsOpening(true);
    Promise.resolve(onUnlock()).catch(() => setIsOpening(false));
  };

  return (
    <main className="case-study-gate" aria-labelledby="case-study-gate-title">
      <div className="case-study-gate__inner">
        <button
          type="button"
          className="case-study-gate__back"
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          <ArrowLeft size={24} weight="regular" color="#7150E5" aria-hidden="true" />
          <span>Back</span>
        </button>

        <header className="case-study-gate__heading">
          <h1 id="case-study-gate-title" className="case-study-gate__title">
            Case studies
          </h1>
          <p className="case-study-gate__subtitle">Password protected</p>
        </header>

        <p className="case-study-gate__text">
          Enter the password to view these case studies.
        </p>

        <form className="case-study-gate__form" onSubmit={handleSubmit} noValidate>
          <div className={`case-study-gate__field${error ? ' case-study-gate__field--error' : ''}`}>
            <label className="case-study-gate__field-label" htmlFor={passwordId}>
              Password
            </label>
            <div className="case-study-gate__input-wrap">
              <input
                id={passwordId}
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="case-study-gate__input"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                autoComplete="current-password"
                aria-required="true"
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? errorId : undefined}
                disabled={isOpening}
                autoFocus
              />
              <button
                type="button"
                className="case-study-gate__reveal"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <EyeSlash size={20} weight="regular" color="#7150E5" aria-hidden="true" />
                ) : (
                  <Eye size={20} weight="regular" color="#7150E5" aria-hidden="true" />
                )}
              </button>
            </div>
            {error ? (
              <span id={errorId} className="case-study-gate__error" role="alert">
                {error}
              </span>
            ) : null}
          </div>

          <button type="submit" className="btn btn--primary" disabled={isOpening} aria-busy={isOpening}>
            {isOpening ? 'Opening…' : 'Continue'}
          </button>
        </form>
      </div>
    </main>
  );
};
