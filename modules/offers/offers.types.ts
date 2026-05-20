export interface StepReviewProps {
  requestId: string
  media: FileType[]
  comment: string
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
