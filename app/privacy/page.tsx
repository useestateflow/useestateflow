"use client";
import { supabase } from "@/lib/supabase";

export default function PrivacyPolicy() {
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
        <a href="/" className="back">← Back to Home</a>
        
        <a href="/" className="logo">
          <img src="/logo.png" alt="Logo" className="logo-icon" />
          <span className="logo-text">
            Estate<strong>Flow</strong>
          </span>
        </a>

        <h1>Privacy Policy</h1>
        <p>Last updated: May 15, 2026</p>

        <p>At EstateFlow, we take your privacy seriously. This policy explains how we collect, use, and protect your information when you join our waitlist.</p>

        <h2>1. Information We Collect</h2>
        <p>When you sign up for our waitlist, we collect the following information:</p>
        <ul>
          <li>Full Name</li>
          <li>Email Address</li>
          <li>WhatsApp/Phone Number</li>
          <li>Your Market (Country)</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the data collected to:</p>
        <ul>
          <li>Provide you with early access to the EstateFlow platform.</li>
          <li>Send you updates about our product and launch progress.</li>
          <li>Reach out via WhatsApp or Email to coordinate onboarding.</li>
          <li>Understand which markets are most interested in our services.</li>
        </ul>

        <h2>3. Data Protection</h2>
        <p>We do not sell, rent, or trade your personal information to third parties. Your data is stored securely and is only accessible to the EstateFlow team for the purposes mentioned above.</p>

        <h2>4. Your Choices</h2>
        <p>You can request to be removed from our waitlist at any time by contacting us at useestateflow@gmail.com. Upon request, we will permanently delete your information from our records.</p>

        <h2>5. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at <strong>useestateflow@gmail.com</strong>.</p>

        <footer>
          © {new Date().getFullYear()} EstateFlow. All rights reserved.
        </footer>
      </div>
    </>
  );
}
