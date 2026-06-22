export type CloudinaryUploadResponse = {
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  resource_type: 'image' | 'video' | 'raw'
  format: string
  bytes: number
  url: string
  secure_url: string
  folder: string
  original_filename: string
  created_at: string
  etag: string
  tags: string[]
  // image-only
  width?: number
  height?: number
  // video-only
  duration?: number
  bit_rate?: number
  frame_rate?: number
  nb_frames?: number
  audio?: {
    codec: string
    bit_rate: string
    frequency: number
    channels: number
    channel_layout: string
  }
  video?: { pix_format: string; codec: string; level: number; bit_rate: string }
  // eager transformation results
  eager?: Array<{
    url: string
    secure_url: string
    width?: number
    height?: number
    bytes: number
    format: string
    transformation: string
  }>
}

export type MediaResponseType = {
  url: string
  public_id: string
  type: 'image' | 'video' | 'raw'
}
