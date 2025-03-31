import React from 'react';
import Svg, {
  Defs,
  FeBlend,
  FeColorMatrix,
  FeComposite,
  FeFlood,
  FeGaussianBlur,
  FeOffset,
  Filter,
  G,
  Mask,
  Path,
  Rect,
} from 'react-native-svg';

export const StartIcon = ({ width, height }: { width: number; height: number }) => (
  <Svg width={width} height={height} fill="none">
    <Mask id="mask0_168_51" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.0583 8.80059C12.3796 8.70195 11.7929 8.2756 11.4895 7.66053L9.99999 4.64083L8.51049 7.66053C8.2071 8.2756 7.62042 8.70195 6.94172 8.80059L3.60826 9.28505L6.02077 11.6371C6.51173 12.1158 6.73572 12.8054 6.61974 13.4812L6.05021 16.8L9.03049 15.2331C9.63744 14.914 10.3625 14.914 10.9695 15.2331L13.9498 16.8L13.3802 13.4812C13.2643 12.8054 13.4883 12.1158 13.9792 11.6371L16.3917 9.28505L13.0583 8.80059ZM19.3535 7.61027C19.7667 7.67166 20.0548 8.05421 19.9911 8.46745C19.9674 8.63275 19.8895 8.78388 19.7714 8.89959L15.4336 13.1288L16.4584 19.1008C16.5292 19.5117 16.253 19.9013 15.8421 19.9722C15.6791 20.0005 15.5091 19.9745 15.3627 19.8966L9.99999 17.0771L4.63727 19.8966C4.51259 19.9624 4.37197 19.992 4.23134 19.982C4.09072 19.9719 3.95571 19.9227 3.84164 19.8399C3.72757 19.757 3.63899 19.6439 3.58596 19.5132C3.53292 19.3826 3.51755 19.2397 3.54158 19.1008L4.56643 13.1288L0.228546 8.89959C0.0849021 8.75957 0.00272316 8.56825 6.64636e-05 8.36767C-0.00259023 8.16709 0.0744927 7.97365 0.214378 7.82988C0.330086 7.71181 0.481215 7.63388 0.646513 7.61027L6.64209 6.73891L9.32227 1.30535C9.50882 0.932246 9.96221 0.778756 10.3353 0.962945C10.4841 1.03615 10.6045 1.15658 10.6777 1.30535L13.3579 6.73891L19.3535 7.61027Z"
        fill="#006FFD"
      />
    </Mask>
    <G mask="url(#mask0_168_51)">
      <G filter="url(#filter0_d_168_51)">
        <Rect y="0.88501" width="20" height="20" fill="#D4D6DD" />
      </G>
    </G>
    <Defs>
      <Filter id="filter0_d_168_51" x="-4" y="0.88501" width="28" height="28" filterUnits="userSpaceOnUse">
        <FeFlood floodOpacity="0" result="BackgroundImageFix" />
        <FeColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <FeOffset dy="4" />
        <FeGaussianBlur stdDeviation="2" />
        <FeComposite in2="hardAlpha" operator="out" />
        <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_168_51" />
        <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_168_51" result="shape" />
      </Filter>
    </Defs>
  </Svg>
);
