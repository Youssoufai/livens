import Lock from '@/assets/icons/lock.svg'
import Notification from '@/assets/icons/notification-unread.svg'
import Support from '@/assets/icons/chat.svg'

import { ProfileDataType } from './profile.types'

export const PROFILE_DATA: ProfileDataType[] = [
  {
    title: 'Password & security',
    description: 'Update your password and manage your account security.',
    icon: Lock,
    link: '/(profile)/security',
  },
  {
    title: 'Notifications',
    description:
      'Control the alerts you receive for live updates and requests.',
    icon: Notification,
  },
  // {
  //     title: 'Refer users and earn',
  //     description: "Invite friends and earn rewards when they join and use the app.",
  //     icon: <></>,
  //     link: ''
  // },
  {
    title: 'Help and support',
    description: '',
    icon: Support,
    link: '/(profile)/support',
  },
]
