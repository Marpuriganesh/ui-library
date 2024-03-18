import React, { useRef, useState, useEffect, ReactNode } from 'react';
import './AnimatedWave.css';
import throttle from 'lodash/throttle';

interface AnimatedWaveProps {
    children?:ReactNode;
    phase?: number;
    amplitude?: number;
    speed?: number;
    frequency?: number;
    className?: string;
    fill?: string;
}

const AnimatedWave: React.FC<AnimatedWaveProps> = ({ phase = 10, amplitude = 60, speed = 10, frequency = 0.0005, className='',fill,children,...props }) => {
  const myDivRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (myDivRef.current) {
        const { offsetWidth, offsetHeight } = myDivRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (myDivRef.current) {
      const { offsetWidth, offsetHeight } = myDivRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  useEffect(() => {
    const updateValue = () => {
      setValue((prev) => prev + 0.01);
    };
    const throttledUpdate = throttle(updateValue, speed);
    const intervalId = setInterval(throttledUpdate, speed);
    return () => {
      clearInterval(intervalId);
      throttledUpdate.cancel();
    };
  }, [speed]);

  const wavePath = (x: number): string => {
    const y = dimensions.height / 1.5 + amplitude * Math.sin(2 * Math.PI * frequency * x + (phase + value));
    return `${x} ${y}`;
  };

  const points = Array.from({ length: dimensions.width }, (_, i) => wavePath(i)).join(' ');

  return (
    <div style={{ display: 'inline-block' }} ref={myDivRef} className={(className===''?'animated-wave':className)} aria-label="Animated wave" {...props}>
      <svg width={dimensions.width} height={dimensions.height}>
        {children}
        <path d={`M0 ${dimensions.height} ${points} L${dimensions.width} ${dimensions.height}`} fill={fill || '#000000'} />
      </svg>
    </div>
  );
};



export default AnimatedWave;
