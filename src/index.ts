/* ==========================================================================
   Component Library — Public API
   All components are exported from here. Consumers import from this file:
   import { Button } from '@pigna/component-library';

   For global styles (reset + design tokens), import separately:
   import '@pigna/component-library/styles';
   ========================================================================== */

/* --- Components --- */
export { Button } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button';

export { CloseButton } from './components/CloseButton';
export type { CloseButtonProps, CloseButtonSize } from './components/CloseButton';

export { TextLink } from './components/TextLink';
export type { TextLinkProps } from './components/TextLink';

export { Spinner } from './components/Spinner';
export type { SpinnerProps, SpinnerSize } from './components/Spinner';

export { SkeletonLoader } from './components/SkeletonLoader';
export type { SkeletonLoaderProps, SkeletonVariant } from './components/SkeletonLoader';

export { NotificationBadge } from './components/NotificationBadge';
export type { NotificationBadgeProps } from './components/NotificationBadge';

export { ProfilePicture } from './components/ProfilePicture';
export type { ProfilePictureProps, ProfilePictureSize, ProfilePictureStatus } from './components/ProfilePicture';

export { Banner } from './components/Banner';
export type { BannerProps, BannerVariant } from './components/Banner';

export { Dialog } from './components/Dialog';
export type { DialogProps } from './components/Dialog';

export { Tag } from './components/Tag';
export type { TagProps } from './components/Tag';

export { Breadcrumb, BreadcrumbItem } from './components/Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItemProps } from './components/Breadcrumb';

export { Popover } from './components/Popover';
export type { PopoverProps, PopoverPlacement } from './components/Popover';

export { ProgressIndicator } from './components/ProgressIndicator';
export type { ProgressIndicatorProps, ProgressVariant, ProgressDisplayMode } from './components/ProgressIndicator';

/* --- Form Components --- */
export {
  FormField,
  useFormField,
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  Toggle,
} from './components/Form';
export type { FormFieldProps } from './components/Form';
export type { InputProps, InputType } from './components/Form';
export type { TextareaProps, TextareaResize } from './components/Form';
export type { SelectProps, SelectOption } from './components/Form';
export type { CheckboxProps } from './components/Form';
export type { RadioGroupProps, RadioOption } from './components/Form';
export type { ToggleProps } from './components/Form';

/* --- Navigation & Notifications --- */
export { MenuItem } from './components/MenuItem';
export type { MenuItemProps } from './components/MenuItem';

export { MenuItemGroup } from './components/MenuItemGroup';
export type { MenuItemGroupProps } from './components/MenuItemGroup';

export { SideMenu } from './components/SideMenu';
export type { SideMenuProps } from './components/SideMenu';

export { HamburgerMenu } from './components/HamburgerMenu';
export type { HamburgerMenuProps } from './components/HamburgerMenu';

export { NotificationPopup } from './components/NotificationPopup';
export type { NotificationPopupProps, NotificationVariant } from './components/NotificationPopup';

/* --- Data Display --- */
export { Table } from './components/Table';
export type { TableProps, TableColumn, SortDirection } from './components/Table';

