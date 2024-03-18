import React, { useState, useEffect, useRef, TouchEvent } from 'react';
import './EmotionButton.css';
import { motion, AnimatePresence } from 'framer-motion';
import Happy from './assets/happy_emoji.svg';
import Happy_back from './assets/happy_emoji_back.svg';
import Sad from './assets/sad_emoji.svg';
import Sad_back from './assets/sad_emoji_back.svg';
import Angry from './assets/angry_emoji.svg';
import Angry_back from './assets/angry_emoji_back.svg';
import Surprise from './assets/surprise_emoji.svg';
import Surprise_back from './assets/surprise_emoji_back.svg';
import Disgust from './assets/disgust_emoji.svg';
import Disgust_back from './assets/disgust_emoji_back.svg';
import Fear from './assets/fear_emoji.svg';
import Fear_back from './assets/fear_emoji_back.svg';

type EmotionImagesType = {
  [key:string]:{
    front:any,
    back:any,
    name:string
  }
}


const EmotionImages:EmotionImagesType = {
  '😊': { front: Happy, back: Happy_back, name: 'Happy' },
  '😢': { front: Sad, back: Sad_back, name: 'Sad' },
  '😡': { front: Angry, back: Angry_back, name: 'Angry' },
  '😮': { front: Surprise, back: Surprise_back, name: 'Surprise' },
  '🤢': { front: Disgust, back: Disgust_back, name: 'Disgust' },
  '😨': { front: Fear, back: Fear_back, name: 'Fear' }
};

interface EmotionButtonProps {
  emotion_value: string;
  className: string;
  setEmotion?: (value: number) => void;
  useLabel: boolean;
  setValue?: number;
}

const EmotionButton: React.FC<EmotionButtonProps> = ({ emotion_value='😊', className='', setEmotion, useLabel=false, setValue = 0 }) => {
  const [drag, setDrag] = useState(false);
  const [progress, setProgress] = useState(setValue);
  const [showLabel, setShowLabel] = useState(false);
  const [pointerEvents, setPointerEvents] = useState<'auto' | 'none'>('auto');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (event: MouseEvent | TouchEvent) => {
      if (drag) {
        const rect = containerRef.current!.getBoundingClientRect();
        const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
        const offsetY = rect.bottom - clientY;
        const newProgress = Math.max(0, Math.min(100, (offsetY / rect.height) * 100));
        setProgress(newProgress);
        if (setEmotion !== undefined) {
          const newValue = +(progress / 100).toFixed(2);
          setEmotion(newValue);
        }
      }
    };

    const handleEnd = () => {
      setPointerEvents('auto');
      setDrag(false);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove as EventListener);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd as EventListener);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove as EventListener);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd as EventListener);
    };
  }, [drag, progress, setEmotion]);

  const handleMouseDown = () => {
    setPointerEvents('none');
    setDrag(true);
  };

  const handleTouchStart = (event: TouchEvent) => {
    setPointerEvents('none');
    event.preventDefault(); // Prevent page scrolling on touch devices
    setDrag(true);
  };

  return (
    <div
      className={`emotion_container`}
      ref={containerRef}
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
      onTouchStart={() => setShowLabel(true)}
      onTouchEnd={() => setShowLabel(false)}
      style={{ touchAction: 'none', userSelect: 'none', pointerEvents: pointerEvents }}
    >
      <motion.div
        className={`${className} emotion-button `}
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
        whileTap={{ scale: 1.1 }}
        style={{
          touchAction: 'none',
          pointerEvents: pointerEvents,
          width: className === '' ? '15vh' : '',
          height: className === '' ? '15vh' : ''
        }}
      >
        <img id='image' src={EmotionImages[emotion_value].front} alt='' style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }} />
        <img id='image-back' src={EmotionImages[emotion_value].back} alt='' style={{ clipPath: `inset(0 0 ${progress}% 0)` }} />
      </motion.div>
      <AnimatePresence>
        {showLabel && useLabel && (
          <motion.label
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ y: -10, opacity: 0 }}
          >
            {EmotionImages[emotion_value].name}
          </motion.label>
        )}
      </AnimatePresence>
    </div>
  );
};



export default EmotionButton;
