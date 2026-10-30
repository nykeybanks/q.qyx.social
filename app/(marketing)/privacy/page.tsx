import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { QLogo } from "@/components/icons/q-logo"
import {
  Shield,
  Lock,
  Eye,
  Database,
  Share2,
  Cookie,
  Bell,
  FileText,
  Mail,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Users,
  Globe,
  Settings,
} from "lucide-react"

export const metadata = {
  title: "Privacy Policy - Q Social",
  description: "Learn how Q Social protects your privacy and handles your personal data across the ecosystem.",
}

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 17, 2026"

  const sections = [
    { id: "information-we-collect", title: "Information We Collect", icon: Database },
    { id: "how-we-use", title: "How We Use Your Information", icon: Settings },
    { id: "data-sharing", title: "Data Sharing & Disclosure", icon: Share2 },
    { id: "data-security", title: "Data Security", icon: Lock },
    { id: "your-rights", title: "Your Privacy Rights", icon: Shield },
    { id: "cookies", title: "Cookies & Tracking", icon: Cookie },
    { id: "third-party", title: "Third-Party Services", icon: Globe },
    { id: "data-retention", title: "Data Retention", icon: Database },
    { id: "children", title: "Children's Privacy", icon: Users },
    { id: "changes", title: "Policy Changes", icon: Bell },
    { id: "contact", title: "Contact Us", icon: Mail },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <QLogo className="h-8 w-8 text-accent" />
            <span className="text-lg font-bold">Q Social</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">
        {/* Title Section */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 backdrop-blur-sm mb-6">
            <Shield className="h-4 w-4 text-accent animate-pulse" />
            <span className="text-sm font-medium text-accent">Privacy & Data Protection</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Privacy{" "}
            <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your privacy matters. Learn how we collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            <strong>Last Updated:</strong> {lastUpdated}
          </p>
        </div>

        {/* Quick Navigation */}
        <Card className="mb-12 border-accent/20 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent" />
              Quick Navigation
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors p-2 rounded-lg hover:bg-accent/5"
                >
                  <section.icon className="h-4 w-4" />
                  {section.title}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Commitment Banner */}
        <Card className="mb-12 border-green-500/20 bg-gradient-to-r from-green-500/5 to-green-500/10">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 shrink-0">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-green-500 mb-2">Our Commitment to Privacy</h3>
                <p className="text-sm text-muted-foreground">
                  Q Social is built on principles of transparency and user control. We never sell your personal data,
                  and we use blockchain technology to give you true ownership of your content and digital identity.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Q Social's Privacy Policy. This policy describes how Q Social ("we," "us," or "our") collects,
              uses, shares, and protects your personal information when you use our Web3-native social ecosystem,
              including Q Vibes, Q Circles, Q Gram, and QNEKTn.
            </p>
          </section>

          {/* 1. Information We Collect */}
          <section id="information-we-collect" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Database className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">1. Information We Collect</h2>
            </div>
            
            <div className="space-y-6 ml-0 sm:ml-13">
              <div>
                <h3 className="text-lg font-semibold mb-2">Information You Provide</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                    <span><strong>Account Information:</strong> Username, email address, display name, avatar, and Q-ID</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                    <span><strong>Profile Data:</strong> Bio, interests, verification status (Q-Scan level)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                    <span><strong>Content:</strong> Posts (Q-Bits), photos, videos, comments, and messages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                    <span><strong>Wallet Information:</strong> Public blockchain addresses for QBP transactions</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Automatically Collected Information</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                    <span><strong>Usage Data:</strong> Pages viewed, features used, time spent on platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                    <span><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                    <span><strong>Location Data:</strong> General location based on IP address (not precise GPS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                    <span><strong>Blockchain Data:</strong> Public transaction records for QBP rewards</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. How We Use Your Information */}
          <section id="how-we-use" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Settings className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">2. How We Use Your Information</h2>
            </div>
            
            <div className="ml-0 sm:ml-13 space-y-4">
              <p className="text-muted-foreground">We use your information to:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span>Provide and maintain the Q Social platform and services</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span>Process and distribute Quantum Bit Points (QBP) rewards</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span>Personalize your experience and recommend relevant content</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span>Verify your identity and calculate your Q-Score</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span>Communicate with you about updates, features, and promotions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span>Detect and prevent fraud, abuse, and security threats</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span>Analyze usage patterns and improve our services</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 3. Data Sharing */}
          <section id="data-sharing" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Share2 className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">3. Data Sharing & Disclosure</h2>
            </div>
            
            <div className="ml-0 sm:ml-13 space-y-4">
              <Card className="border-accent/20 bg-accent/5">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Eye className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-accent mb-1">We Never Sell Your Data</h4>
                      <p className="text-sm text-muted-foreground">
                        Q Social does not sell your personal information to third parties. Your data is yours.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <p className="text-muted-foreground">We may share your information in the following circumstances:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span><strong>Public Content:</strong> Posts, profile information, and activity you choose to make public</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span><strong>Service Providers:</strong> Trusted partners who help operate our platform (hosting, analytics)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span><strong>Legal Requirements:</strong> When required by law or to protect rights and safety</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 4. Data Security */}
          <section id="data-security" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Lock className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">4. Data Security</h2>
            </div>
            
            <div className="ml-0 sm:ml-13 space-y-4">
              <p className="text-muted-foreground">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span>Encryption of data in transit and at rest</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span>Regular security audits and penetration testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span>Access controls and authentication protocols</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span>Blockchain immutability for transaction records</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                While we strive to protect your data, no method of transmission over the internet is 100% secure.
                We encourage you to use strong passwords and enable two-factor authentication.
              </p>
            </div>
          </section>

          {/* 5. Your Privacy Rights */}
          <section id="your-rights" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">5. Your Privacy Rights</h2>
            </div>
            
            <div className="ml-0 sm:ml-13 space-y-4">
              <p className="text-muted-foreground">You have the following rights regarding your personal data:</p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span><strong>Access:</strong> Request a copy of your personal data</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span><strong>Correction:</strong> Update or correct inaccurate information</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span><strong>Deletion:</strong> Request deletion of your account and data (subject to legal requirements)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span><strong>Portability:</strong> Export your data in a machine-readable format</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span><strong>Opt-Out:</strong> Unsubscribe from marketing communications</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                To exercise these rights, visit your account settings or contact us at privacy@qsocial.app
              </p>
            </div>
          </section>

          {/* 6. Cookies & Tracking */}
          <section id="cookies" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Cookie className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">6. Cookies & Tracking Technologies</h2>
            </div>
            
            <div className="ml-0 sm:ml-13 space-y-4">
              <p className="text-muted-foreground">
                We use cookies and similar technologies to enhance your experience:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span><strong>Essential Cookies:</strong> Required for authentication and core functionality</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span><strong>Analytics Cookies:</strong> Help us understand usage patterns and improve services</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span><strong>Preference Cookies:</strong> Remember your settings and preferences</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                You can control cookies through your browser settings, though some features may not work properly if disabled.
              </p>
            </div>
          </section>

          {/* 7. Third-Party Services */}
          <section id="third-party" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Globe className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">7. Third-Party Services</h2>
            </div>
            
            <div className="ml-0 sm:ml-13 space-y-4">
              <p className="text-muted-foreground">
                Q Social may contain links to third-party websites or integrate with external services. We are not
                responsible for the privacy practices of these third parties. Please review their privacy policies
                before sharing your information.
              </p>
            </div>
          </section>

          {/* 8. Data Retention */}
          <section id="data-retention" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Database className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">8. Data Retention</h2>
            </div>
            
            <div className="ml-0 sm:ml-13 space-y-4">
              <p className="text-muted-foreground">
                We retain your personal information for as long as necessary to provide our services and comply with
                legal obligations. After account deletion, we may retain certain data for legal, security, or
                operational purposes. Blockchain transaction records are permanent and cannot be deleted.
              </p>
            </div>
          </section>

          {/* 9. Children's Privacy */}
          <section id="children" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">9. Children's Privacy</h2>
            </div>
            
            <div className="ml-0 sm:ml-13">
              <Card className="border-orange-500/20 bg-orange-500/5">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Q Social is not intended for children under 13 years of age. We do not knowingly collect personal
                      information from children. If you believe we have collected data from a child, please contact us
                      immediately.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 10. Policy Changes */}
          <section id="changes" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Bell className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">10. Changes to This Privacy Policy</h2>
            </div>
            
            <div className="ml-0 sm:ml-13 space-y-4">
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of significant changes by
                posting a notice on our platform or sending you an email. Your continued use of Q Social after changes
                become effective constitutes acceptance of the updated policy.
              </p>
            </div>
          </section>

          {/* 11. Contact Us */}
          <section id="contact" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Mail className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">11. Contact Us</h2>
            </div>
            
            <div className="ml-0 sm:ml-13">
              <Card className="border-accent/20 bg-gradient-to-br from-card to-card/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">
                    If you have questions about this Privacy Policy or how we handle your data, please contact us:
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-accent" />
                      <strong>Email:</strong>{" "}
                      <a href="mailto:privacy@qsocial.app" className="text-accent hover:underline">
                        privacy@qsocial.app
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-accent" />
                      <strong>Website:</strong>{" "}
                      <a href="https://qsocial.app" className="text-accent hover:underline">
                        qsocial.app
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>

        {/* CTA Section */}
        <Card className="mt-16 border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Your Privacy, Your Control</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Experience social media built on transparency, blockchain security, and user ownership. Join Q Social and
              take control of your digital identity.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Create Your Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-8 mt-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Q Social. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="mailto:support@qsocial.app" className="hover:text-accent transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
