import { MediaType, RequestStatusType } from '@/services/requests/request.types'
import {
  Approved,
  OfferSentResponseType,
} from '@/services/response/response.types'

export interface StepReviewProps {
  requestId: string
  responseId?: string
  media: (MediaType | FileType)[]
  comment: string
  disableEdit?: boolean
  onEditMedia: () => void
  onEditComment: () => void
}

export interface CameraModalProps {
  visible: boolean
  onClose: () => void
  onPhotoCaptured: (photo: FileType) => void
  onVideoCaptured: (video: FileType) => void
  canAddPhoto: boolean
  canAddVideo: boolean
}

export interface StepCaptureProps {
  descriptionItems: string[]
  media: (FileType | MediaType)[]
  onMediaChange: (media: (FileType | MediaType)[]) => void
  onNext: () => void
}

export interface SentOfferCardProps {
  id: string
  description: string
  status?: OfferStatusType
  timestamp: string
  onPress: (id: string) => void
}

export type OfferStatusType =
  | 'pending'
  | 'active'
  | 'waiting for approval'
  | 'completed'
  | 'rejected'

export interface SentOfferListProps {
  type: string
  data?: Approved[]
  isLoading: boolean
  refreshing?: boolean
  onRefresh?: () => void
  emptyTitle?: string
  emptyDescription?: string
}
