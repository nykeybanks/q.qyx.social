import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QLogo } from "@/components/icons/q-logo"
import { Footer } from "@/components/shared/footer"
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Scale, 
  Globe,
  ArrowLeft,
  Bitcoin,
  Users,
  Lock
} from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-accent/3 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <header className="sticky top-0 relative z-50 border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-3 sm:px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 group">
            <QLogo className="h-8 w-8 text-accent transition-transform" />
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Q Social
            </span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="inline sm:hidden">Back</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 backdrop-blur-sm mb-6">
            <Scale className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Legal Agreement</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-6">
            Last Updated: January 17, 2026
          </p>
          <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-accent" />
              <span>Your Rights Protected</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-accent" />
              <span>Global Coverage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="mx-auto max-w-4xl">
          {/* Quick Navigation */}
          <Card className="mb-8 border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <FileText className="h-5 w-5 text-accent" />
                Quick Navigation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a href="#acceptance" className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group">
                  <CheckCircle className="h-4 w-4 text-accent/50 group-hover:text-accent transition-colors" />
                  <span>1. Acceptance of Terms</span>
                </a>
                <a href="#eligibility" className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group">
                  <CheckCircle className="h-4 w-4 text-accent/50 group-hover:text-accent transition-colors" />
                  <span>2. Eligibility</span>
                </a>
                <a href="#account" className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group">
                  <CheckCircle className="h-4 w-4 text-accent/50 group-hover:text-accent transition-colors" />
                  <span>3. User Accounts</span>
                </a>
                <a href="#qbp" className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group">
                  <CheckCircle className="h-4 w-4 text-accent/50 group-hover:text-accent transition-colors" />
                  <span>4. QBP & Rewards</span>
                </a>
                <a href="#conduct" className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group">
                  <CheckCircle className="h-4 w-4 text-accent/50 group-hover:text-accent transition-colors" />
                  <span>5. User Conduct</span>
                </a>
                <a href="#content" className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group">
                  <CheckCircle className="h-4 w-4 text-accent/50 group-hover:text-accent transition-colors" />
                  <span>6. Content Policy</span>
                </a>
                <a href="#privacy" className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group">
                  <CheckCircle className="h-4 w-4 text-accent/50 group-hover:text-accent transition-colors" />
                  <span>7. Privacy & Data</span>
                </a>
                <a href="#termination" className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group">
                  <CheckCircle className="h-4 w-4 text-accent/50 group-hover:text-accent transition-colors" />
                  <span>8. Termination</span>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Terms Content */}
          <div className="space-y-8">
            {/* Section 1 */}
            <Card id="acceptance" className="scroll-mt-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                    <CheckCircle className="h-5 w-5 text-accent" />
                  </div>
                  1. Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using Q Social and its associated platforms (Q Vibes, Q Circles, Q Gram, and QNEKTn), 
                  you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not 
                  agree with any part of these terms, you may not use our services.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  These terms constitute a legally binding agreement between you and Q Social, a service powered by the 
                  QuantumYield Innovation Technology Stack.
                </p>
              </CardContent>
            </Card>

            {/* Section 2 */}
            <Card id="eligibility" className="scroll-mt-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  2. Eligibility
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  You must be at least 13 years old to use Q Social. By using our services, you represent and warrant that:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                  <li>You are at least 13 years of age</li>
                  <li>You have the legal capacity to enter into these terms</li>
                  <li>You are not prohibited from using our services under applicable laws</li>
                  <li>All information you provide is accurate and truthful</li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 3 */}
            <Card id="account" className="scroll-mt-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                    <Lock className="h-5 w-5 text-accent" />
                  </div>
                  3. User Accounts
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  To access certain features, you must create a Q-ID account. You agree to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and update your account information</li>
                  <li>Keep your password secure and confidential</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
                <div className="mt-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
                  <p className="text-sm text-accent font-medium mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Q-ID Universal Identity
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Your Q-ID serves as your universal identity across all Q Social platforms. Your Q-Score reflects 
                    your verification level, account longevity, engagement, and community trust.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 4 */}
            <Card id="qbp" className="scroll-mt-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                    <Bitcoin className="h-5 w-5 text-accent" />
                  </div>
                  4. Quantum Bit Points (QBP) & Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  QBP is the reward currency on Q Social. You can earn QBP through various activities:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                  <li>Daily login bonuses</li>
                  <li>Creating quality content (Q-Bits)</li>
                  <li>Engaging with the community</li>
                  <li>Completing platform challenges</li>
                  <li>Referring new users</li>
                </ul>
                <div className="mt-4 p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
                  <p className="text-sm text-amber-500 font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Important Notice
                  </p>
                  <p className="text-xs text-muted-foreground">
                    QBP has no monetary value and cannot be exchanged for real currency. QBP is awarded at our 
                    discretion and may be adjusted, modified, or discontinued at any time. We reserve the right to 
                    revoke QBP earned through fraudulent activities.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 5 */}
            <Card id="conduct" className="scroll-mt-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                    <Shield className="h-5 w-5 text-accent" />
                  </div>
                  5. User Conduct & Prohibited Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  You agree not to engage in any of the following prohibited activities:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                  <li>Violating any applicable laws or regulations</li>
                  <li>Posting harmful, illegal, or offensive content</li>
                  <li>Harassing, threatening, or impersonating others</li>
                  <li>Spamming or engaging in fraudulent activities</li>
                  <li>Attempting to gain unauthorized access to our systems</li>
                  <li>Manipulating QBP earning mechanisms</li>
                  <li>Creating multiple accounts to abuse rewards</li>
                  <li>Using bots or automated tools without permission</li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 6 */}
            <Card id="content" className="scroll-mt-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>
                  6. Content Policy & Intellectual Property
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  When you post content (Q-Bits) on Q Social:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                  <li>You retain ownership of your content</li>
                  <li>You grant us a worldwide, non-exclusive license to use, display, and distribute your content</li>
                  <li>You represent that you have the rights to post the content</li>
                  <li>You are responsible for the content you post</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We reserve the right to remove any content that violates these terms or is otherwise objectionable.
                </p>
              </CardContent>
            </Card>

            {/* Section 7 */}
            <Card id="privacy" className="scroll-mt-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                    <Lock className="h-5 w-5 text-accent" />
                  </div>
                  7. Privacy & Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  Your privacy is important to us. Our collection and use of personal information is governed by our{" "}
                  <Link href="/privacy" className="text-accent hover:underline">
                    Privacy Policy
                  </Link>
                  . By using Q Social, you consent to the collection and use of information as described in our Privacy Policy.
                </p>
                <div className="mt-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
                  <p className="text-sm text-accent font-medium">Web3 & Blockchain</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Q Social operates on Web3 principles. While we strive to protect your data, blockchain transactions 
                    are permanent and public. Exercise caution when interacting with blockchain features.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 8 */}
            <Card id="termination" className="scroll-mt-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                    <AlertTriangle className="h-5 w-5 text-accent" />
                  </div>
                  8. Account Termination
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to suspend or terminate your account at any time for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                  <li>Violation of these Terms of Service</li>
                  <li>Fraudulent or illegal activities</li>
                  <li>Abuse of the platform or other users</li>
                  <li>Prolonged inactivity</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  You may also delete your account at any time through your account settings. Upon termination, 
                  your access to services will cease, and any accumulated QBP may be forfeited.
                </p>
              </CardContent>
            </Card>

            {/* Additional Sections */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">9. Disclaimers & Limitations</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <p>
                  Q Social is provided "as is" without warranties of any kind. We do not guarantee that our services 
                  will be uninterrupted, secure, or error-free.
                </p>
                <p>
                  To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, 
                  special, or consequential damages arising from your use of our services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">10. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <p>
                  We reserve the right to modify these terms at any time. We will notify you of material changes 
                  through the platform or via email. Your continued use of Q Social after changes constitutes 
                  acceptance of the modified terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">11. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <p>
                  If you have questions about these Terms of Service, please contact us:
                </p>
                <ul className="list-none space-y-2 mt-4">
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Email:</span>
                    <a href="mailto:legal@qsocial.io" className="text-accent hover:underline">
                      legal@qsocial.io
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Support:</span>
                    <Link href="/support" className="text-accent hover:underline">
                      Q Social Support Center
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <Card className="mt-12 border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
            <CardContent className="p-6 sm:p-8 text-center">
              <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Ready to Join Q Social?</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
                By creating an account, you agree to these Terms of Service and our Privacy Policy.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                    Create Account
                  </Button>
                </Link>
                <Link href="/privacy">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                    View Privacy Policy
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
