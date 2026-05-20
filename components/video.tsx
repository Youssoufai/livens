import { useVideoPlayer, VideoView } from 'expo-video'
import { StyleSheet } from 'react-native'

import { VideoProps } from './components.types'

const Video = ({ source, style }: VideoProps) => {
  const player = useVideoPlayer(source, (player) => {
    player.loop = true
    player.play()
  })

  if (typeof source === 'string' && !source.toLowerCase().includes('mp4')) {
    return null
  }

  return <VideoView player={player} style={[styles.video, style]} />
}

const styles = StyleSheet.create({
  video: {},
})

export default Video
