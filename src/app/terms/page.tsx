import { Metadata } from 'next'
import { FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service | TheQbitlabs',
  description: 'Read the terms and conditions for using TheQbitlabs services and website.',
  keywords: ['terms of service', 'terms and conditions', 'user agreement', 'legal'],
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Scale className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Please read these terms carefully before using our services.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-gray max-w-none">
            
            <div className="mb-8 p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Last updated:</strong> December 11, 2025<br />
                <strong>Effective date:</strong> December 11, 2025
              </p>
            </div>

            <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </div>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2 text-primary" />
                Acceptance of Terms
              </h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using TheQbitlabs website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Use License</h2>
              <p className="text-muted-foreground mb-4">
                Permission is granted to temporarily download one copy of the materials on TheQbitlabs' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Disclaimer</h2>
              <p className="text-muted-foreground mb-4">
                The materials on TheQbitlabs' website are provided on an 'as is' basis. TheQbitlabs makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Limitations</h2>
              <p className="text-muted-foreground mb-4">
                In no event shall TheQbitlabs or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on TheQbitlabs' website, even if TheQbitlabs or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Accuracy of Materials</h2>
              <p className="text-muted-foreground mb-4">
                The materials appearing on TheQbitlabs' website could include technical, typographical, or photographic errors. TheQbitlabs does not warrant that any of the materials on its website are accurate, complete, or current. TheQbitlabs may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Links</h2>
              <p className="text-muted-foreground mb-4">
                TheQbitlabs has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by TheQbitlabs of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Modifications</h2>
              <p className="text-muted-foreground mb-4">
                TheQbitlabs may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Governing Law</h2>
              <p className="text-muted-foreground mb-4">
                These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction], and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-medium">TheQbitlabs</p>
                <p className="text-muted-foreground">Email: legal@theqbitlabs.com</p>
                <p className="text-muted-foreground">Address: [Your Business Address]</p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}