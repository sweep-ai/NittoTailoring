export type LegalSection = {
  id: string
  title: string
  paragraphs: string[]
  list?: string[]
}

export type LegalDocument = {
  slug: string
  title: string
  lastUpdated: string
  intro?: string
  sections: LegalSection[]
}

export const privacyPolicy: LegalDocument = {
  slug: 'privacy-policy',
  title: 'Privacy Policy',
  lastUpdated: 'June 1, 2026',
  intro:
    'This Privacy Policy describes how we collect, use, and protect personal information when you visit our website, submit an application, or otherwise interact with our marketing and coaching services.',
  sections: [
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      paragraphs: [
        'We may collect information you voluntarily provide when you complete forms on this site, book a call, apply for coaching, or contact us. This may include your name, email address, phone number, and any other details you choose to submit.',
        'We may also collect limited technical information automatically, such as browser type, device information, IP address, and pages visited, to help maintain and improve the website.',
      ],
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      paragraphs: ['We use the information we collect to:'],
      list: [
        'Respond to your application or inquiry and schedule coaching consultations',
        'Send marketing communications you have requested or consented to receive',
        'Improve our website, offers, and customer experience',
        'Comply with legal obligations and protect our rights',
      ],
    },
    {
      id: 'marketing-consent',
      title: 'Marketing & Communications',
      paragraphs: [
        'By submitting your information through our forms, you consent to being contacted by us via email, phone, SMS, or other channels regarding our programs, promotions, and services. You may opt out of marketing messages at any time by following the unsubscribe instructions in our emails or by contacting us directly.',
        'Message and data rates may apply for SMS communications where permitted. Message frequency varies.',
      ],
    },
    {
      id: 'third-parties',
      title: 'Third Party Services',
      paragraphs: [
        'We use trusted third party providers to operate this website and process form submissions, including embedded form providers and video hosting platforms. These providers may process your information according to their own privacy policies.',
        'We do not sell your personal information to third parties for their own marketing purposes.',
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies & Tracking',
      paragraphs: [
        'This website may use essential cookies and similar technologies required for basic functionality. If analytics or advertising tools are added in the future, this policy will be updated to describe those practices and any choices available to you.',
      ],
    },
    {
      id: 'retention',
      title: 'Data Retention',
      paragraphs: [
        'We retain personal information for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required or permitted by law.',
      ],
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      paragraphs: [
        'Depending on your location, you may have the right to access, correct, delete, or restrict the use of your personal information, or to withdraw consent where processing is based on consent. To exercise these rights, contact us using the information below.',
        'Residents of certain jurisdictions may have additional rights under applicable privacy laws, including the right to opt out of the sale or sharing of personal information where applicable.',
      ],
    },
    {
      id: 'children',
      title: "Children's Privacy",
      paragraphs: [
        'Our services are intended for adults. We do not knowingly collect personal information from anyone under 18 years of age.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to This Policy',
      paragraphs: [
        'We may update this Privacy Policy from time to time. The revised version will be posted on this page with an updated effective date.',
      ],
    },
    {
      id: 'contact',
      title: 'Contact Us',
      paragraphs: [
        'If you have questions about this Privacy Policy or wish to make a privacy related request, please contact us at the email address listed in the site footer.',
      ],
    },
  ],
}

export const termsOfService: LegalDocument = {
  slug: 'terms',
  title: 'Terms of Service',
  lastUpdated: 'June 1, 2026',
  intro:
    'These Terms of Service govern your access to and use of this website and any related marketing pages, applications, and coaching inquiry forms. By using this site, you agree to these terms.',
  sections: [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      paragraphs: [
        'By accessing or using this website, submitting an application, or booking a consultation, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, do not use this site.',
      ],
    },
    {
      id: 'services',
      title: 'Services & Offers',
      paragraphs: [
        'This website provides information about coaching programs and allows you to apply or request more information. Program details, pricing, guarantees, and eligibility requirements may vary and will be confirmed separately before enrollment.',
        'Marketing statements, testimonials, and before and after images represent individual experiences and are not a guarantee of similar results for every user.',
      ],
    },
    {
      id: 'eligibility',
      title: 'Eligibility',
      paragraphs: [
        'You must be at least 18 years old to use this site or submit an application. You agree to provide accurate and complete information when requested.',
      ],
    },
    {
      id: 'no-medical-advice',
      title: 'No Medical Advice',
      paragraphs: [
        'Content on this website is for general informational and marketing purposes only. It is not medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before starting any diet, exercise, or wellness program.',
      ],
    },
    {
      id: 'guarantees',
      title: 'Promotional Guarantees',
      paragraphs: [
        'Any money back, results based, or promotional guarantees are subject to the specific terms communicated at the time of purchase or enrollment. Qualification requirements, timelines, and exclusions apply and must be met to receive any guaranteed benefit.',
      ],
    },
    {
      id: 'user-conduct',
      title: 'Acceptable Use',
      paragraphs: ['You agree not to:'],
      list: [
        'Use the site for unlawful, fraudulent, or abusive purposes',
        'Attempt to interfere with the security or operation of the website',
        'Submit false, misleading, or unauthorized information',
      ],
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      paragraphs: [
        'All content on this website, including text, graphics, logos, videos, and design elements, is owned by or licensed to us and may not be copied, reproduced, or distributed without permission.',
      ],
    },
    {
      id: 'limitation',
      title: 'Limitation of Liability',
      paragraphs: [
        'To the fullest extent permitted by law, we are not liable for any indirect, incidental, special, or consequential damages arising from your use of this website or reliance on its content. Your use of the site is at your own risk.',
      ],
    },
    {
      id: 'indemnification',
      title: 'Indemnification',
      paragraphs: [
        'You agree to indemnify and hold us harmless from claims arising out of your misuse of the website or violation of these terms.',
      ],
    },
    {
      id: 'governing-law',
      title: 'Governing Law',
      paragraphs: [
        'These terms are governed by the laws of the jurisdiction in which the business operates, without regard to conflict of law principles. Any disputes shall be resolved in the courts of that jurisdiction unless otherwise required by applicable law.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to These Terms',
      paragraphs: [
        'We may modify these Terms of Service at any time by posting an updated version on this page. Continued use of the site after changes are posted constitutes acceptance of the revised terms.',
      ],
    },
  ],
}

export const disclaimer: LegalDocument = {
  slug: 'disclaimer',
  title: 'Disclaimer',
  lastUpdated: 'June 1, 2026',
  intro:
    'Please read this disclaimer carefully before using this website or relying on any information, testimonials, or results presented herein.',
  sections: [
    {
      id: 'general',
      title: 'General Information Only',
      paragraphs: [
        'The information provided on this website is for general marketing and educational purposes only. It should not be interpreted as professional medical, nutritional, psychological, or legal advice.',
      ],
    },
    {
      id: 'health',
      title: 'Health & Fitness Disclaimer',
      paragraphs: [
        'Participation in any fitness, nutrition, or coaching program involves inherent risks. You should consult your physician or qualified health provider before beginning any new exercise or nutrition program, especially if you have a medical condition, injury, or are taking medication.',
        'You assume full responsibility for your participation and agree that we are not responsible for any injury, loss, or damage related to your use of information or services obtained through this site.',
      ],
    },
    {
      id: 'results',
      title: 'Results Disclaimer',
      paragraphs: [
        'Individual results vary based on factors including starting point, effort, consistency, genetics, health status, and adherence to program guidelines. Testimonials, case studies, and before and after photos reflect real client experiences but are not typical and do not guarantee that you will achieve the same outcome.',
        'Any references to weight loss, performance improvements, or other physical changes are illustrative only and should not be viewed as a promise or warranty of results.',
      ],
    },
    {
      id: 'earnings',
      title: 'No Professional Relationship',
      paragraphs: [
        'Use of this website or submission of an application does not create a coach client, medical, or fiduciary relationship unless and until a separate written agreement is executed.',
      ],
    },
    {
      id: 'external',
      title: 'Third Party Content & Links',
      paragraphs: [
        'This site may include embedded content or links to third party websites and services. We are not responsible for the content, policies, or practices of third parties.',
      ],
    },
    {
      id: 'accuracy',
      title: 'Accuracy of Information',
      paragraphs: [
        'While we strive to keep information current and accurate, we make no warranties regarding completeness, reliability, or suitability of the content for any particular purpose.',
      ],
    },
    {
      id: 'contact',
      title: 'Questions',
      paragraphs: [
        'If you have questions about this disclaimer, please contact us using the information provided in the site footer.',
      ],
    },
  ],
}

export const legalDocuments = {
  'privacy-policy': privacyPolicy,
  terms: termsOfService,
  disclaimer,
} as const

export type LegalDocumentSlug = keyof typeof legalDocuments
