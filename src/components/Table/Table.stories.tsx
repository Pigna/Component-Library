import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';

const sampleData = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'Diana Ross', email: 'diana@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'Active' },
  { id: 8, name: 'Henry Wilson', email: 'henry@example.com', role: 'Viewer', status: 'Active' },
];

const columns = [
  { key: 'id', label: 'ID', sortable: true, width: '60px' },
  { key: 'name', label: 'Name', sortable: true, resizable: true },
  { key: 'email', label: 'Email', resizable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
];

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    stripedRows: { control: 'boolean' },
    stripedColumns: { control: 'boolean' },
    searchable: { control: 'boolean' },
    paginated: { control: 'boolean' },
    pageSize: { control: 'number' },
    accentColor: { control: 'color' },
    headerColor: { control: 'color' },
    headerTextColor: { control: 'color' },
    selectable: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

/** Default table. */
export const Default: Story = {
  args: { columns, data: sampleData, caption: 'User list' },
};

/** Table with search, sorting, and pagination. */
export const FullFeatured: Story = {
  args: {
    columns,
    data: sampleData,
    searchable: true,
    paginated: true,
    pageSize: 4,
    stripedRows: true,
    caption: 'User list',
  },
};

/** Striped rows. */
export const StripedRows: Story = {
  args: { columns, data: sampleData, stripedRows: true },
};

/** Striped columns. */
export const StripedColumns: Story = {
  args: { columns, data: sampleData, stripedColumns: true },
};

/** Table with accent color. */
export const AccentColor: Story = {
  args: { columns, data: sampleData, accentColor: '#0055cc', stripedRows: true },
};

/** Table with footer. */
export const WithFooter: Story = {
  args: {
    columns,
    data: sampleData,
    footer: <strong>Total: {sampleData.length} users</strong>,
  },
};

/** Empty table. */
export const Empty: Story = {
  args: { columns, data: [], caption: 'Empty table' },
};

/** Table with a colored header. */
export const ColoredHeader: Story = {
  args: {
    columns,
    data: sampleData,
    headerColor: '#1e3a5f',
    headerTextColor: '#ffffff',
    stripedRows: true,
  },
};

/** Selectable rows — click or press Enter/Space to select; click again or press Escape to deselect. */
export const SelectableRows: Story = {
  args: {
    columns,
    data: sampleData,
    selectable: true,
    accentColor: '#0055cc',
  },
};

/** Loading skeleton — shown while data is being fetched. */
export const Loading: Story = {
  args: {
    columns,
    data: [],
    loading: true,
    pageSize: 5,
  },
};

/** Error state — displayed when data could not be loaded. */
export const ErrorState: Story = {
  args: {
    columns,
    data: [],
    error: 'Failed to load users. Please try again.',
  },
};

/** Error state with selectable rows disabled, loading finished. */
export const ErrorStateWithContext: Story = {
  args: {
    columns,
    data: [],
    searchable: true,
    error: 'Could not connect to the server. Check your network and retry.',
  },
};

/** Full-featured table with header color, selectable rows, search, pagination. */
export const KitchenSink: Story = {
  args: {
    columns,
    data: sampleData,
    searchable: true,
    paginated: true,
    pageSize: 4,
    stripedRows: true,
    selectable: true,
    headerColor: '#1e3a5f',
    headerTextColor: '#ffffff',
    accentColor: '#0055cc',
    caption: 'Full-featured user list',
  },
};


