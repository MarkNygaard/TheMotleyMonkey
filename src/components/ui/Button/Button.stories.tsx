import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@ui/Button/Button';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Button',
    intent: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
    intent: 'secondary',
  },
};
