import { RequestStatusType } from '@/services/requests/request.types'
import {
  Approved,
  OfferSentResponseType,
} from '@/services/response/response.types'

export interface StepReviewProps {
  requestId: string
  media: FileType[]
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
  media: FileType[]
  onMediaChange: (media: FileType[]) => void
  onNext: () => void
}

export interface SentOfferCardProps {
  id: string
  description: string
  status?: RequestStatusType
  timestamp: string
  onPress: (id: string) => void
}

export interface SentOfferListProps {
  type: string
  data?: Approved[]
  isLoading: boolean
  refreshing?: boolean
  onRefresh?: () => void
  emptyTitle?: string
  emptyDescription?: string
}
