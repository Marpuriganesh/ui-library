import { CustomInput } from "../components";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CustomInput> = {
  title: "Components/CustomInput",
  component: CustomInput,
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
} satisfies Meta<typeof CustomInput>;

export default meta;
type story = StoryObj<typeof CustomInput>;

export const CustomInputStory: story = {
  args: {
    type: "password",
    placeholder: "Password",
    disabled: true,
    spellCheck:true
  },
};
