import Svg, { SvgProps, Path, Mask, G } from 'react-native-svg'

const SearchIcon = ({ fill, ...props }: SvgProps) => (
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
        fill={fill ?? '#f34'}
        d="m19.6 21-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.887T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5a6.1 6.1 0 0 1-1.3 3.8l6.3 6.3zM9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5t-1.312-3.187T9.5 5 6.313 6.313 5 9.5t1.313 3.188T9.5 14"
      />
    </G>
  </Svg>
)
export default SearchIcon
