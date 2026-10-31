import { useEventListener } from 'expo'
import { VideoView, useVideoPlayer } from 'expo-video'
import { StyleSheet, View } from 'react-native'

import { toStreamUrl } from '@/services/cloudinary'

import { showToastMessage } from './notification'
import { VideoProps } from './components.types'

const Video = ({ source, style, videoStyle, allowFullScreen }: VideoProps) => {
  const streamSource = toStreamUrl(source)
  const player = useVideoPlayer(streamSource, (p) => {
    p.play()
  })

  useEventListener(player, 'statusChange', ({ status, error }) => {
    if (status === 'error') {
      console.error('Video playback error', streamSource, error)
      showToastMessage(error?.message ?? 'Video failed to play', 'error')
    }
  })

  return (
    <View style={[styles.container, style]}>
      <VideoView
        player={player}
        style={[styles.videoView, videoStyle]}
        fullscreenOptions={{ enable: !!allowFullScreen }}
        allowsPictureInPicture
        nativeControls
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  videoView: {
    height: '95%',
    width: '100%',
    borderRadius: 8,
  },
})

export default Video
