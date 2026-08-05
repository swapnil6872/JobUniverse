import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-xl border border-slate-200 shadow-sm">
        <div className="border-b border-slate-200 pb-6 mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Terms and Conditions</h1>
          <p className="text-sm text-slate-500 mt-2">Last Updated: August 2026</p>
        </div>

        <div className="space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using JobUniverse ("the Platform"), you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">2. User Accounts</h2>
            <p className="mb-2">
              To access certain features, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Provide accurate, current, and complete information during registration.</li>
              <li>Maintain and safeguard the confidentiality of your login credentials.</li>
              <li>Accept responsibility for all activities that occur under your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">3. Acceptable Use Policy</h2>
            <p className="mb-2">Users agree not to engage in any of the following prohibited activities:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Posting fraudulent, misleading, or deceptive job listings or resume profiles.</li>
              <li>Soliciting payments or financial information from applicants.</li>
              <li>Scraping, harvesting, or extracting platform data automatically without consent.</li>
              <li>Harassing, abusing, or harming another user on the platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">4. Intellectual Property</h2>
            <p>
              All content, features, and functionality on JobUniverse—including text, graphics, logos, and software—are the exclusive property of JobUniverse and protected by international copyright and trademark laws.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">5. Limitation of Liability</h2>
            <p>
              JobUniverse acts as a venue for job seekers and employers. We do not guarantee employment, background verify all listings, or accept liability for interactions resulting from connections made on the platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">6. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account and access to the platform at our sole discretion, without prior notice, for conduct that violates these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">7. Contact Us</h2>
            <p>
              If you have any questions regarding these Terms and Conditions, please contact us at <span className="text-indigo-600 font-medium">legal@jobuniverse.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;