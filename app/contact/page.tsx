import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Mail, Building2, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Rage Room Near Me — listing corrections, business enquiries, or general questions.',
}

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-red-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Contact</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-600">We&apos;d love to hear from you. Email us directly and we&apos;ll get back to you within 2 business days.</p>
      </div>

      <div className="space-y-4 mb-8">
        <a
          href="mailto:hello@rageroomnearme.org"
          className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5 hover:border-red-300 hover:shadow-md transition-all group"
        >
          <div className="bg-red-100 p-3 rounded-xl shrink-0">
            <Mail className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">General Enquiries</p>
            <p className="text-sm text-gray-500 mb-0.5">Questions, feedback, partnerships</p>
            <p className="text-sm text-red-600 font-medium">hello@rageroomnearme.org</p>
          </div>
        </a>

        <a
          href="mailto:hello@rageroomnearme.org?subject=Business%20Listing%20Enquiry"
          className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5 hover:border-red-300 hover:shadow-md transition-all group"
        >
          <div className="bg-blue-100 p-3 rounded-xl shrink-0">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">Business Owners</p>
            <p className="text-sm text-gray-500 mb-0.5">Claim your listing, update details, or add your venue</p>
            <p className="text-sm text-red-600 font-medium">hello@rageroomnearme.org</p>
          </div>
        </a>

        <a
          href="mailto:hello@rageroomnearme.org?subject=Listing%20Correction"
          className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5 hover:border-red-300 hover:shadow-md transition-all group"
        >
          <div className="bg-yellow-100 p-3 rounded-xl shrink-0">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">Report Incorrect Info</p>
            <p className="text-sm text-gray-500 mb-0.5">Wrong hours, closed venue, bad phone number</p>
            <p className="text-sm text-red-600 font-medium">hello@rageroomnearme.org</p>
          </div>
        </a>
      </div>

      <p className="text-xs text-gray-400 text-center">
        We typically respond within 1–2 business days.
      </p>
    </div>
  )
}
