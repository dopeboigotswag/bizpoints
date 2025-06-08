import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const TermsPage = () => {
  return (
      <div className="terms-container">
        <h1>BizPoints Loyalty Program Terms & Conditions</h1>

        <div className="terms-content">
          <section>
            <h2>1. Program Overview</h2>
            <p>
              The BizPoints loyalty program ("Program") is a rewards program offered by AlphaBiz Solutions
              to eligible customers. Members earn points ("BizPoints") on qualifying purchases that can be
              redeemed for rewards.
            </p>
          </section>

          <section>
            <h2>2. Eligibility</h2>
            <p>
              2.1 The Program is open to individuals who are at least 18 years old and reside in eligible countries.
            </p>
            <p>
              2.2 Businesses may not participate in the Program unless specifically authorized.
            </p>
          </section>

          <section>
            <h2>3. Earning BizPoints</h2>
            <p>
              3.1 Members earn 1 BizPoint for every $1 spent on qualifying purchases.
            </p>
            <p>
              3.2 Bonus point opportunities may be offered periodically.
            </p>
            <p>
              3.3 Points are credited to accounts within 24-48 hours of purchase.
            </p>
          </section>

          <section>
            <h2>4. Redeeming BizPoints</h2>
            <p>
              4.1 100 BizPoints = $1 in redemption value.
            </p>
            <p>
              4.2 Minimum redemption threshold is 500 BizPoints ($5 value).
            </p>
            <p>
              4.3 Points expire after 12 months of inactivity.
            </p>
          </section>

          <section>
            <h2>5. Program Changes</h2>
            <p>
              We reserve the right to modify, suspend, or terminate the Program at any time with 30 days notice.
            </p>
          </section>

          <section>
            <h2>6. Privacy</h2>
            <p>
              Your participation in the Program is subject to our Privacy Policy, available at [Privacy Policy URL].
            </p>
          </section>

          <section>
            <h2>7. General Terms</h2>
            <p>
              7.1 Points have no cash value and cannot be transferred.
            </p>
            <p>
              7.2 Fraudulent activity will result in account termination.
            </p>
            <p>
              7.3 These terms are governed by the laws of Your State/Country.
            </p>
          </section>

          <p className="effective-date">Effective: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="terms-actions">
          <Link to="/register" className="back-button">Back to Registration</Link>
        </div>
      </div>
  );
};

export default TermsPage;