import axios from 'axios'
import type {
  CloudinaryUploadResponse,
  MediaResponseType,
} from './cloudinary.types'

const CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME ?? 'db8t4o5e4'
const UPLOAD_PRESET =
  process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? 'livelens_mobile'

const resolveCloudinaryApi = (type: 'image' | 'video') =>
  `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${type}/upload`

const resolveMediaType = (file: FileType): 'image' | 'video' =>
  file.type?.startsWith('video') ? 'video' : 'image'

export const uploadMedia = async (
  file: FileType,
  onProgress?: (percent: number) => void
): Promise<MediaResponseType> => {
  try {
    const type = resolveMediaType(file)

    const formdata = new FormData()
    formdata.append('file', file as any)
    formdata.append('upload_preset', UPLOAD_PRESET)
    formdata.append('folder', 'livelens_response_upload')

    const { data }: { data: CloudinaryUploadResponse } = await axios.post(
      resolveCloudinaryApi(type),
      formdata,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: onProgress
          ? ({ loaded, total }) => {
              if (total) onProgress(Math.round((loaded / total) * 100))
            }
          : undefined,
      }
    )

    return {
      url: data.secure_url ?? data.url,
      public_id: data.public_id,
      type: data.resource_type,
    }
  } catch (error) {
    throw error
  }
}
