import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Rage Room Near Me — how we collect, use, and protect your data.',
  ...pageMeta('/privacy-policy'),
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-red-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Privacy Policy</span>
      </nav>

      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: May 2026</p>

        <div className="space-y-8 text-gray-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Who We Are</h2>
            <p>Rage Room Near Me (<strong>rageroomnearme.org</strong>) is a directory website listing rage rooms, smash rooms, and stress-relief venues across the United States. We are not affiliated with any of the listed venues. For questions, contact us at <a href="mailto:hello@rageroomnearme.org" className="text-red-600 hover:underline">hello@rageroomnearme.org</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <p className="mb-2">We collect minimal data. Specifically:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Usage data</strong> — pages visited, browser type, referring URLs, and approximate location (country/city level) via our analytics provider (Umami). Umami is privacy-focused and does not use cookies or track you across websites.</li>
              <li><strong>Contact form submissions</strong> — if you contact us, we collect your name and email address solely to respond to your inquiry.</li>
              <li><strong>No account required</strong> — we do not require registration or collect personal information to use this site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Cookies</h2>
            <p>Our analytics (Umami) is cookieless. We do not use tracking cookies. Third-party services embedded on this site (such as Google Maps) may set their own cookies — please refer to Google&apos;s privacy policy for details.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Third-Party Services</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Umami Analytics</strong> — privacy-first, cookieless analytics. No personal data is shared.</li>
              <li><strong>Google Maps</strong> — embedded maps on listing pages are served by Google. Google&apos;s privacy policy applies.</li>
              <li><strong>Google AdSense</strong> — we may display ads served by Google AdSense. Google may use cookies to show relevant ads based on your browsing. You can opt out at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">adssettings.google.com</a>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. How We Use Your Information</h2>
            <p>We use collected data solely to operate and improve this website. We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Data Retention</h2>
            <p>Analytics data is retained for 12 months. Contact form data is retained only as long as needed to resolve your inquiry.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Your Rights</h2>
            <p>You have the right to request access to, correction of, or deletion of any personal data we hold about you. Contact us at <a href="mailto:hello@rageroomnearme.org" className="text-red-600 hover:underline">hello@rageroomnearme.org</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. Changes to This Policy</h2>
            <p>We may update this policy from time to time. Changes will be posted on this page with an updated date.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">9. Contact</h2>
            <p>Questions about this policy? Email us at <a href="mailto:hello@rageroomnearme.org" className="text-red-600 hover:underline">hello@rageroomnearme.org</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
