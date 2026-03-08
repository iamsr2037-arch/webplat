'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background" suppressHydrationWarning>
      <Header />

      <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: January 2026
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Script Marketplace ("we," "our," or "us") operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Information Collection and Use</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect several different types of information for various purposes to provide and improve our service to you.
              </p>
              <h3 className="text-xl font-semibold text-foreground mb-2">Types of Data Collected:</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Personal identification information (name, email address, phone number)</li>
                <li>Payment information (processed securely through SSLCommerz)</li>
                <li>Usage data (pages visited, time spent, interactions)</li>
                <li>Device information (browser type, operating system)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Use of Data</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Script Marketplace uses the collected data for various purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>To provide and maintain our service</li>
                <li>To process transactions and send related information</li>
                <li>To provide customer support and respond to your requests</li>
                <li>To gather analysis or valuable information for improvement of service</li>
                <li>To monitor the usage of our service</li>
                <li>To detect, prevent and address fraudulent transactions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Security of Data</h2>
              <p className="text-muted-foreground leading-relaxed">
                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-muted-foreground mt-4">
                Email: <a href="mailto:privacy@scriptmarketplace.com" className="text-primary hover:underline">privacy@scriptmarketplace.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
