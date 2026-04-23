import Svg, { SvgProps, Mask, Path, G } from 'react-native-svg'

const ScheduleIcon = ({ fill, ...props }: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Mask
      id="a"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}
    >
      <Path fill="#d9d9d9" d="M0 0h24v24H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill={fill ?? '#a1a3a6'}
        d="M3 20V4l14.3 6H17q-.874 0-1.65.2a8 8 0 0 0-1.5.55L5 7v3.5l6 1.5-6 1.5V17l5.4-2.3a7.4 7.4 0 0 0-.3 1.138Q10 16.4 10 17v.05zm10.463.538Q12 19.074 12 17q0-2.075 1.463-3.537Q14.926 12 17 12q2.075 0 3.538 1.463T22 17t-1.462 3.538Q19.074 22 17 22q-2.075 0-3.537-1.462m5.187-1.188.7-.7-1.85-1.85V14h-1v3.2z"
      />
    </G>
  </Svg>
)
export default ScheduleIcon
