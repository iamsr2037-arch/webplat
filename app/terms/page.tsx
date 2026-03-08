'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background" suppressHydrationWarning>
      <Header />

      <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: January 2026
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using this marketplace, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Use License</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on Script Marketplace for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the marketplace</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Product Sales and Licensing</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All products sold on this marketplace are provided under specific licensing terms:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Purchase grants you the right to use the product for personal or business purposes</li>
                <li>You may not resell, redistribute, or sublicense products without explicit permission</li>
                <li>Download links expire 30 days after purchase</li>
                <li>Installation services are optional and paid separately</li>
                <li>Custom development services are subject to separate project agreements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall Script Marketplace or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Script Marketplace, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Accuracy of Materials</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials appearing on Script Marketplace could include technical, typographical, or photographic errors. Script Marketplace does not warrant that any of the materials on its marketplace are accurate, complete, or current. Script Marketplace may make changes to the materials contained on its marketplace at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Refund Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We offer a 7-day money-back guarantee for all product purchases if you are not satisfied with the product. Custom development services are non-refundable after work has begun. To request a refund, contact our support team with your order details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Modifications to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                Script Marketplace may revise these terms of service for its marketplace at any time without notice. By using this marketplace, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-muted-foreground mt-4">
                Email: <a href="mailto:support@scriptmarketplace.com" className="text-primary hover:underline">support@scriptmarketplace.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
