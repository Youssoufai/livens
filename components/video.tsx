import RNVideo, { VideoRef, ReactVideoProps } from 'react-native-video'
import { StyleSheet } from 'react-native'

const Video = ({ source, style, ...props }: Partial<ReactVideoProps>) => {
  return (
    <RNVideo
      source={source}
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
