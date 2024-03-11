
### Reach Out UI Library

This library, `@reach-out/ui-library`, is tailored to create professional UI components for the "Reach Out" website. Below are the details of two key components available in this library.

---

### AnimatedWave Component

The `AnimatedWave` component creates a visually appealing animated wave effect using SVG. It offers customization options for various parameters such as phase, amplitude, speed, frequency, and fill color.

#### Installation

To install the Reach Out UI Library, use the following command:

```bash
npm install @reach-out/ui-library
```

#### Usage

```tsx
import React from 'react';
import { AnimatedWave } from '@reach-out/ui-library';

const App = () => {
  return (
    <div>
      <AnimatedWave />
    </div>
  );
};

export default App;
```

#### Props

- `children`: ReactNode (optional) - Children components to be rendered within the wave container.
- `phase`: number (optional, default: 10) - Phase of the wave.
- `amplitude`: number (optional, default: 60) - Amplitude of the wave.
- `speed`: number (optional, default: 10) - Speed of the wave animation.
- `frequency`: number (optional, default: 0.0005) - Frequency of the wave.
- `className`: string (optional) - Additional CSS class for styling purposes.
- `fill`: string (optional, default: '#555555') - Fill color for the wave.

---

### EmotionButton Component

The `EmotionButton` component presents an interactive emoticon button with a draggable slider to express emotional intensity. It supports various emoticons and provides customization options for appearance.

#### Usage

```tsx
import React from 'react';
import { EmotionButton } from '@reach-out/ui-library';

const App = () => {
  return (
    <div>
      <EmotionButton emotion_value="😊" />
    </div>
  );
};

export default App;
```

#### Props

- `emotion_value`: string - Unicode value of the emoticon to display.
- `className`: string - Additional CSS class for styling purposes.
- `setEmotion`: (value: number) => void (optional) - Callback function triggered when the emotional intensity changes.
- `useLabel`: boolean - Whether to display the label for the emotion.
- `setValue`: number (optional, default: 0) - Initial value for the emotional intensity slider.

---

These components, `AnimatedWave` and `EmotionButton`, are meticulously crafted to enhance the user experience on the "Reach Out" website. We plan to introduce more components in the future, but for now, these two are the building blocks of our UI library. Install `@reach-out/ui-library` today and elevate your UI design!

#### Contribution

Contributors are encouraged to collaborate on this project. To contribute, follow these steps:

1. Fork the repository.
2. Clone the forked repository to your local machine.
3. Install dependencies using `npm install`.
4. Make your changes and ensure they follow the Angular commit format.
5. Submit a pull request to the main repository.

We use Semantic Release to automate versioning and package publishing based on the commit messages following the Angular commit format.

Start using Reach Out UI Library in your projects and join us in shaping the future of UI design!