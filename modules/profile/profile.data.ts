import { Href } from 'expo-router'

import Lock from '@/assets/icons/lock.svg'
import Notification from '@/assets/icons/notification-unread.svg'
import Support from '@/assets/icons/chat.svg'

import { FaqSection, ProfileDataType, TransactionStatus } from './profile.types'
import { COLORS } from '@/constants/theme'

export const PROFILE_DATA: ProfileDataType[] = [
  {
    title: 'Password & security',
    description: 'Update your password and manage your account security.',
    icon: Lock,
    link: '/(profile)/password-and-security',
  },
  {
    title: 'Notifications',
    description:
      'Control the alerts you receive for live updates and requests.',
    icon: Notification,
  },
  {
    title: 'Help and support',
    description: 'Get answers to questions or contact us for help.',
    icon: Support,
    link: '/(profile)/support' as Href,
  },
]

export const FAQ_DATA: FaqSection[] = [
  {
    title: 'ACCOUNT',
    items: [
      {
        question: 'How do I update my profile information?',
        answer:
          'Go to your Profile tab, tap "Edit profile" next to your name, update your details, and tap Save.',
      },
      {
        question: 'What should I do if I forgot my password?',
        answer:
          'On the login screen, tap "Forgot password" and follow the instructions to reset your password via email.',
      },
      {
        question: 'How do I change my location or notification preferences?',
        answer:
          'Visit your Profile tab. Location can be updated in the app settings. Notification preferences are under the Notifications section.',
      },
    ],
  },
  {
    title: 'REQUESTS',
    items: [
      {
        question: 'How do I make a new request on the app?',
        answer:
          'Tap the "+" button on the Home tab, fill in the request details including location, description, duration, and reward, then submit.',
      },
      {
        question: 'Can I cancel or edit a request after posting it?',
        answer:
          'Yes. Go to the Requests tab, open your request, and tap the edit or cancel option before it is accepted.',
      },
      {
        question: 'How do I choose who fulfills my request?',
        answer:
          'After posting a request, you will see a list of responders. You can review their profiles and approve the one you prefer.',
      },
    ],
  },
  {
    title: 'WITHDRAW',
    items: [
      {
        question: "What's the minimum amount I can withdraw?",
        answer: 'The minimum withdrawal amount is ₦1,000.',
      },
      {
        question:
          'How long does it take to receive my earnings after withdrawal?',
        answer:
          'Withdrawals are typically processed within 1-3 business days depending on your bank.',
      },
    ],
  },
]

export const STATUS_COLORS = {
  credit: {
    text: COLORS.green[500],
    background: COLORS.green[50],
  },
  debit: {
    text: COLORS.primary[500],
    background: COLORS.primary[50],
  },
}
