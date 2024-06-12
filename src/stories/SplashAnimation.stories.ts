import { Meta, StoryObj } from "@storybook/react";
import { SplashAnimation } from "../components";

const meta: Meta<typeof SplashAnimation> = {
    title: "Components/SplashAnimation",
    component: SplashAnimation,
    tags: ["autodocs"],
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
}satisfies Meta<typeof SplashAnimation>;

export default meta;

type story = StoryObj<typeof SplashAnimation>;

export const SplashAnimationStory: story = {
  args: {
    style:{
        filter:'invert()'
    }
  },
}