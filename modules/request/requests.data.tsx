import {
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from 'react-native-reanimated'

export const REQUESTS_TABS: ListItem[] = [
  {
    label: 'Browse requests',
    value: 'browse-request',
  },
  {
    label: 'Ongoing requests',
    value: 'ongoing-request',
  },
  {
    label: 'My requests',
    value: 'my-request',
  },
]

export const REQUEST_STEP_META = [
  {
    title: 'Create request',
    subtitle: '',
  },
  {
    title: 'Set request conditions',
    subtitle: '',
  },
  {
    title: 'Add reward',
    subtitle: 'Higher rewards can attract faster responses.',
  },
  {
    title: 'Confirm and publish',
    subtitle: '',
  },
]

export const REQUEST_DURATION = [
  {
    label: '30 minutes',
    value: '30 minutes',
  },
  {
    label: '1 hour',
    value: '1 hour',
  },
  {
    label: '1 hour 30 minutes',
    value: '1 hour 30 minutes',
  },
  {
    label: '2 hours',
    value: '2 hours',
  },
  {
    label: '4 hours',
    value: '4 hours',
  },
  {
    label: '8 hours',
    value: '8 hours',
  },
  {
    label: '16 hours',
    value: '16 hours',
  },
  {
    label: '24 hours',
    value: '24 hours',
  },
]

export const REWARD_OPTIONS = [
  {
    id: '1000',
    amount: '₦1,000',
    description: 'Popular for simple tasks, gets casual responses fast.',
    popular: true,
  },
  {
    id: '2500',
    amount: '₦2,500',
    description: 'Attracts faster and more reliable responses.',
    popular: false,
  },
  {
    id: 'custom',
    amount: 'Custom',
    description: 'Set your own price based on urgency or task complexity.',
    popular: false,
  },
]

export const animatedComponentDetails = {
  entering: {
    back: SlideInLeft,
    forward: SlideInRight,
  },
  exiting: {
    back: SlideOutRight,
    forward: SlideOutLeft,
  },
}

export const getRespondersTabData = (responders: number = 0) => {
  return [
    {
      label: 'Overview',
      value: 'overview',
    },
    {
      label: `Responders (${responders})`,
      value: 'responders',
    },
    {
      label: 'Status',
      value: 'status',
    },
  ]
}
