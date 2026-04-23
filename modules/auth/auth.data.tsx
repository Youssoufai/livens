import Text from '@/components/text'

export const getForgotPasswordHeaderData = (email?: string) => [
  {
    title: 'Forgot password?',
    description:
      'Enter the email address you used to create your Livelens account. We will send a code to confirm it\'s you.',
  },
  {
    title: 'Verify your email',
    description: (
      <>
        Enter the code sent to{' '}
        <Text size={16} lineHeight={20} weight={600} color="grey-500">
          {email}
        </Text>
      </>
    ),
  },
  {
    title: 'Create new password',
    description: '',
  },
]

export const getCreateAccountHeaderData = (email?: string) => [
  {
    title: 'Create your account',
    description:
      'Get real-time location updates and full access to all features.',
  },
  {
    title: 'Confirm your email',
    description: (
      <>
        Enter the code we sent to{' '}
        <Text size={16} lineHeight={20} weight={600} color="grey-500">
          {email}
        </Text>{' '}
        to confirm it’s really you.
      </>
    ),
  },
  {
    title: 'Last step! where do you live?',
    description: 'We’ll recommend requests with the best offers for you.',
  },
]
