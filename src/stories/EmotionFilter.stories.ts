import { EmotionFilter } from "../components";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof EmotionFilter> = {
  title: "Components/EmotionFilter",
  component: EmotionFilter,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    backgrounds: {
      default: "twitter",
      values: [
        { name: "twitter", value: "#00aced" },
        { name: "facebook", value: "#3b5998" },
      ],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EmotionFilter>;

export default meta;

type story = StoryObj<typeof EmotionFilter>;

export const EmotionFilterStory: story = {
  args: { url: "http://192.168.29.245:8000/api/feelings" },
};
