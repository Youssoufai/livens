import { VideoView, useVideoPlayer, VideoViewProps } from 'expo-video'
import { StyleSheet } from 'react-native'

import { VideoProps } from './components.types'

const Video = ({ source, style, ...props }: VideoProps) => {
  const player = useVideoPlayer(source, (player) => {
    player.loop = true
    player.play()
  })

  return (
    <VideoView
      player={player}
      style={[styles.video, style]}
      pointerEvents="none"
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  video: {},
})

export default Video
