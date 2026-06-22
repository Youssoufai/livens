import { VideoView, useVideoPlayer } from 'expo-video'
import { StyleSheet, View } from 'react-native'

import { VideoProps } from './components.types'

const Video = ({ source, style, videoStyle, allowFullScreen }: VideoProps) => {
  const player = useVideoPlayer(source, (p) => {
    p.play()
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
