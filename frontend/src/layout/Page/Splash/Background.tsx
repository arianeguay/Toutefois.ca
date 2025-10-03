'use client';
import { useTheme } from 'styled-components';
import Splash1 from './Splash1';
import Splash2 from './Splash2';
import Splash3 from './Splash3';

export type SplashName = 'Splash1' | 'Splash2' | 'Splash3';
interface BackgroundProps {
  items: SplashName[];
  startingSide?: 'left' | 'right';
}
const Background: React.FC<BackgroundProps> = ({
  items,
  startingSide = 'right',
}) => {
  const theme = useTheme();
  const otherSide = startingSide === 'left' ? 'right' : 'left';
  const splashColor = theme.colors.headerBackground + '10';
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        width: '100vw',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {items.map((item, index) => {
        switch (item) {
          case 'Splash1':
            return (
              <Splash1
                key={index}
                color={splashColor}
                size="large"
                side={index % 2 === 0 ? startingSide : otherSide}
                top={index * 1200}
              />
            );
          case 'Splash2':
            return (
              <Splash2
                key={index}
                color={splashColor}
                size="large"
                side={index % 2 === 0 ? startingSide : otherSide}
                top={index * 1200}
              />
            );
          case 'Splash3':
            return (
              <Splash3
                key={index}
                color={splashColor}
                size="large"
                side={index % 2 === 0 ? startingSide : otherSide}
                top={index * 1200}
              />
            );
        }
      })}
    </div>
  );
};

export default Background;
