import { EmotionButton } from "../components";
import { Meta,StoryObj} from "@storybook/react";

const meta:Meta<typeof EmotionButton> = {
    title: "Components/Emotionbutton",
    component: EmotionButton,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
        backgrounds: {
            default: 'twitter',
            values: [
              { name: 'twitter', value: '#00aced' },
              { name: 'facebook', value: '#3b5998' },
            ],
          },
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],


}satisfies Meta<typeof EmotionButton>;

export default meta;

type story = StoryObj<typeof EmotionButton>;

export const EmotionButtonStory:story= {
    args: {
        emotion_value: "😊",
        useLabel: false,
        setValue: 0
    }
}