import React from 'react';
import { Dimensions } from 'react-native';
import { Svg, Defs, Rect, Mask, Ellipse } from 'react-native-svg';
import { backdropColor } from '../constants';

const { width, height } = Dimensions.get('window');

export const SelfieMask = () => (
  <Svg width={height * 0.6} height={height * 0.6}>
    <Defs>
      <Mask id="mask" x="0" y="0" height="100%" width="100%">
        <Rect height="100%" width="100%" fill="#fff" />
        <Ellipse
          cx={width * 0.5}
          cy={height * 0.3}
          rx={height * 0.2}
          ry={height * 0.25}
        />
      </Mask>
    </Defs>
    <Rect
      height="100%"
      width="100%"
      fill={backdropColor}
      mask="url(#mask)"
      fill-opacity="0"
    />
  </Svg>
);
