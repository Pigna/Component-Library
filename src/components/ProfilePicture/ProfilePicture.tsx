import { type HTMLAttributes, type Ref, useState } from 'react';
import styles from './ProfilePicture.module.scss';

export type ProfilePictureSize = 'sm' | 'md' | 'lg' | 'xl';
export type ProfilePictureStatus = 'online' | 'offline' | 'away' | 'busy';

export interface ProfilePictureProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref forwarded to the container `<div>`. */
  ref?: Ref<HTMLDivElement>;
  /** Image URL. Falls back to initials on error or when omitted. */
  src?: string;
  /** Accessible alt text for the image. */
  alt: string;
  /** 1–2 character fallback when image is unavailable. */
  initials?: string;
  /** Sizes: sm=32px, md=40px, lg=56px, xl=80px. */
  size?: ProfilePictureSize;
  /** Optional status dot indicator. */
  status?: ProfilePictureStatus;
}

const statusLabels: Record<ProfilePictureStatus, string> = {
  online: 'Status: online',
  offline: 'Status: offline',
  away: 'Status: away',
  busy: 'Status: busy',
};

/**
 * Avatar component with image, fallback initials, and optional status indicator.
 *
 * Displays an image when `src` is provided and loads successfully. Falls back to
 * initials when the image fails to load or is not provided. An optional status
 * dot indicates online/offline/away/busy state.
 *
 * @example
 * ```tsx
 * <ProfilePicture src="/avatar.jpg" alt="Jane Doe" size="lg" status="online" />
 * <ProfilePicture initials="JD" alt="Jane Doe" />
 * ```
 */
export function ProfilePicture({
  src,
  alt,
  initials,
  size = 'md',
  status,
  className,
  ref,
  ...rest
}: ProfilePictureProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;

  const classNames = [styles.container, styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classNames} {...rest}>
      {showImage ? (
        <img
          className={styles.image}
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={styles.initials} role="img" aria-label={alt}>
          {initials ?? ''}
        </span>
      )}
      {status && (
        <span className={`${styles.status} ${styles[status]}`} aria-hidden="true" />
      )}
      {status && <span className={styles.srOnly}>{statusLabels[status]}</span>}
    </div>
  );
}

