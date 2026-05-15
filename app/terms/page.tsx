"use client";

export default function TermsOfService() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #FFFFFF; color: #111110; line-height: 1.6; padding: 40px 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        .logo { display: flex; align-items: center; gap: 8px; text-decoration: none; margin-bottom: 40px; }
        .logo-icon { width: 32px; height: 32px; object-fit: contain; }
        .logo-text { font-size: 18px; font-weight: 500; color: #111110; letter-spacing: -0.2px; }
        .logo-text strong { font-weight: 800; }
        h1 { font-size: 32px; font-weight: 800; margin-bottom: 24px; letter-spacing: -0.5px; }
        h2 { font-size: 20px; font-weight: 700; margin-top: 32px; margin-bottom: 16px; }
        p { margin-bottom: 16px; color: #4A4845; }
        ul { margin-bottom: 16px; padding-left: 20px; color: #4A4845; }
        li { margin-bottom: 8px; }
        .back { display: inline-block; margin-bottom: 20px; color: #2563EB; text-decoration: none; font-weight: 600; font-size: 14px; }
        .back:hover { text-decoration: underline; }
        footer { margin-top: 60px; padding-top: 20px; border-top: 1px solid #E2E0DE; font-size: 14px; color: #7A7775; }
      `}</style>

      <div className="container">
        <a href="/" className="back">
          ← Back to Home
        </a>

        <a href="/" className="logo">
          <img src="/logo.png" alt="Logo" className="logo-icon" />
          <span className="logo-text">
            Estate<strong>Flow</strong>
          </span>
        </a>

        <h1>Terms of Service</h1>
        <p>Last updated: May 15, 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By joining the EstateFlow waitlist, you agree to these Terms of
          Service. These terms govern your participation in the pre-launch phase
          of EstateFlow.
        </p>

        <h2>2. Waitlist Nature</h2>
        <p>
          Signing up for the waitlist does not guarantee immediate access to the
          EstateFlow platform. Access will be granted in phases at the sole
          discretion of the EstateFlow team.
        </p>

        <h2>3. Evolving Platform</h2>
        <p>
          EstateFlow is currently in active development. Features, pricing, and
          availability are subject to change without notice. We provide the
          waitlist and early access "as is" without any warranties.
        </p>

        <h2>4. Acceptable Usage</h2>
        <p>
          You agree to provide accurate information when signing up. Any attempt
          to use the platform for illegal activities, spamming, or fraudulent
          real estate listings will result in immediate termination of your
          access.
        </p>

        <h2>5. Intellectual Property</h2>
        <p>
          All content, branding, and technology related to EstateFlow are the
          property of EstateFlow. You may not copy, modify, or redistribute any
          part of our platform without explicit written permission.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          EstateFlow shall not be liable for any direct, indirect, or incidental
          damages arising from your participation in the waitlist or use of the
          early access platform.
        </p>

        <h2>7. Contact Information</h2>
        <p>
          For any legal inquiries or support, please reach out to us at{" "}
          <strong>useestateflow@gmail.com</strong>.
        </p>

        <footer>
          © {new Date().getFullYear()} EstateFlow. All rights reserved.
        </footer>
      </div>
    </>
  );
}
