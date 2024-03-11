import { AnimatedWave } from "../components";
import { Meta,StoryObj} from "@storybook/react";


const meta:Meta<typeof AnimatedWave> = {
    title: "Components/AnimatedWave",
    component: AnimatedWave,
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

    argTypes: {
        fill: { control: 'color' },
      },
}satisfies Meta<typeof AnimatedWave>;

export default meta;

type story = StoryObj<typeof AnimatedWave>;

export const AnimatedWaveStory:story = {
    args: {
        phase : 10,
        amplitude :60,
        speed : 10,
        frequency :0.0005
    }
}


