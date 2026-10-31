import { COLORS } from '@/constants/theme'

import { OfferStatusType } from './offers.types'
import { DimensionValue } from 'react-native'

export const DEFAULT_CHECKLIST = [
  'Clearly and carefully taken.',
  'Inclusive of places specified by the requester.',
  'Moments and people in-action, accurately illustrating what the respondent wants to see.',
]

export const BADGE_CONFIG: Partial<
  Record<
    OfferStatusType,
    {
      bg: string
      color: string
      label: string
      headerBg: string
      width: DimensionValue
    }
  >
> = {
  pending: {
    bg: COLORS.yellow[100],
    color: COLORS.yellow[900],
    label: 'Pending approval',
    headerBg: COLORS.white,
    width: '20%',
  },
  'waiting for approval': {
    bg: COLORS.primary[50],
    color: COLORS.primary[400],
    label: 'Pending response approval',
    headerBg: COLORS.primary[50],
    width: '60%',
  },
  completed: {
    bg: COLORS.green[50],
    color: COLORS.green[400],
    label: 'Response approved',
    headerBg: COLORS.green[50],
    width: '40%',
  },
  rejected: {
    bg: COLORS.grey[50],
    color: COLORS.grey[400],
    label: 'Not selected',
    headerBg: COLORS.grey[50],
    width: '40%',
  },
}
