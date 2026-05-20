import {
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from 'react-native-reanimated'

import RequestSuccessIcon from '@/assets/icons/request-sucess.svg'
import BoostIcon from '@/assets/icons/boost.svg'
import RequestCompletedContent from './components/reques-complete-content'

import {
  RequestSuccessModalContentType,
  RequestSuccessModalType,
} from './requests.types'
import RatingContent from './components/response-rating-content'
import BoostContent from './components/request-boost-content'

export const REQUESTS_TABS: ListItem[] = [
  {
    label: 'Browse requests',
    value: 'browse',
  },
  {
    label: 'Ongoing requests',
    value: 'ongoing',
  },
  {
    label: 'My requests',
    value: 'myrequests',
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
    id: '500',
    amount: '₦500',
    description: 'Popular for simple tasks, gets casual responses fast.',
    popular: true,
  },
  {
    id: '1000',
    amount: '₦1,000',
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

export const getRequestSuccessModalContent = (
  responder: User,
  dismissModal: VoidFunction,
  updateModal?: (type: RequestSuccessModalType) => void,
  type?: RequestSuccessModalType
) => {
  if (!type) return null

  const successModalContents: Partial<
    Record<RequestSuccessModalType, RequestSuccessModalContentType>
  > = {
    request_completed: {
      title: 'Your request has been completed!',
      description:
        'Your request has been completed, you got real-time info from your desired place.',
      icon: <RequestSuccessIcon width={158} height={118} />,
      content: (
        <RequestCompletedContent
          responder={responder.name}
          onRateResponder={() => updateModal?.('rating')}
          onDismissModal={dismissModal}
        />
      ),
    },
    rating: {
      title: `How was ${responder.name} response?`,
      description: 'How would you rate your experience with this responder?',
      icon: <></>,
      content: (
        <RatingContent
          userId={responder.id.toString()}
          responderName={responder.name}
          onDismissModal={dismissModal}
        />
      ),
    },
    boost: {
      title: 'We’re giving you a free boost for your next post!',
      description:
        'To congratulate you on completing your first successful request, we’re giving you a free boost to promote your next post. ',
      icon: <BoostIcon width={212} height={168} />,
      content: <BoostContent onDismissModal={dismissModal} />,
    },
  }

  return successModalContents[type]
}

export const responderActionOptions = [
  { label: 'Withdraw responder', value: 'withdraw-responder' },
]
