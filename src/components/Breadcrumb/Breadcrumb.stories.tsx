import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

/** Default breadcrumb trail. */
export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/products">Products</BreadcrumbItem>
      <BreadcrumbItem>Widget Pro</BreadcrumbItem>
    </Breadcrumb>
  ),
};

/** Breadcrumb with custom separator. */
export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb separator="›">
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
      <BreadcrumbItem>Getting Started</BreadcrumbItem>
    </Breadcrumb>
  ),
};

/** Single item (current page only). */
export const SingleItem: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>Dashboard</BreadcrumbItem>
    </Breadcrumb>
  ),
};

