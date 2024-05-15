import { Spinner } from "../components";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
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
} satisfies Meta<typeof Spinner>;

export default meta;

type story = StoryObj<typeof Spinner>;

export const SpinnerStory: story = {
  args: {
    count: 8,
    speed: 0.7,
    center_radius: 16,
  },
};
