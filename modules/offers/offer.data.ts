import { COLORS } from '@/constants/theme'
import { RequestStatusType } from '@/services/requests/request.types'

export const DEFAULT_CHECKLIST = [
  'Clearly and carefully taken.',
  'Inclusive of places specified by the requester.',
  'Moments and people in-action, accurately illustrating what the respondent wants to see.',
]

export const BADGE_CONFIG: Partial<
  Record<
    RequestStatusType,
    { bg: string; color: string; label: string; headerBg: string }
  >
> = {
  pending: {
    bg: COLORS.yellow[100],
    color: COLORS.yellow[900],
    label: 'Pending approval',
    headerBg: COLORS.white,
  },
  'waiting for approval': {
    bg: COLORS.grey[50],
    color: COLORS.grey[400],
    label: 'Not selected',
    headerBg: COLORS.grey[50],
  },
}
