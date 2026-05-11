// src/components/Phase6Components.tsx
// Phase 6: Polish Components Library
// All components include animations, hover states, and enhanced styling

import type { ReactNode } from 'react';

// ============================================================================
// BUTTON COMPONENT - Multiple Variants
// ============================================================================

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseClasses =
    'font-medium rounded-lg transition-all duration-200 ease-in-out active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary:
      'bg-[#cfb991] text-white hover:opacity-90 hover:shadow-lg focus:ring-[#cfb991]',
    secondary:
      'bg-white border-2 border-[#cfb991] text-[#cfb991] hover:bg-[#cfb991] hover:text-white focus:ring-[#cfb991]',
    danger:
      'bg-[#F68B7C] text-white hover:opacity-90 hover:shadow-lg focus:ring-[#F68B7C]',
    ghost:
      'bg-transparent text-[#cfb991] hover:bg-[#cfb991] hover:bg-opacity-10 focus:ring-[#cfb991]',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

// ============================================================================
// CARD COMPONENT
// ============================================================================

export interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className = '',
  hoverable = false,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-lg shadow-md
        ${hoverable ? 'transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// ============================================================================
// STYLED LINK COMPONENT
// ============================================================================

export interface StyledLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}

export function StyledLink({
  href,
  children,
  external = false,
  className = '',
}: StyledLinkProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`text-[#cfb991] hover:opacity-80 transition-opacity duration-200 underline ${className}`}
    >
      {children}
      {external && ' 🔗'}
    </a>
  );
}

// ============================================================================
// FORM INPUT COMPONENT
// ============================================================================

export interface FormInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function FormInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  className = '',
}: FormInputProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[#333333] mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`
          w-full px-4 py-2 rounded-lg
          border-2 border-[#cfb991]
          focus:outline-none focus:border-[#b39b77] focus:ring-2 focus:ring-[#cfb991] focus:ring-opacity-30
          transition-all duration-200
          disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50
          ${error ? 'border-[#F68B7C]' : ''}
        `}
      />
      {error && (
        <p className="text-[#F68B7C] text-sm mt-1 font-bold">{error}</p>
      )}
    </div>
  );
}

// ============================================================================
// LOADING SPINNER COMPONENT
// ============================================================================

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div
        className="
        w-10 h-10 border-4 border-[#e0e0e0]
        border-t-[#cfb991] rounded-full
        animate-spin
      "
      />
    </div>
  );
}

// ============================================================================
// SKELETON LOADER COMPONENT
// ============================================================================

export interface SkeletonLoaderProps {
  count?: number;
  height?: string;
  className?: string;
}

export function SkeletonLoader({
  count = 1,
  height = 'h-10',
  className = '',
}: SkeletonLoaderProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`
            w-full ${height} bg-gray-200 rounded-lg
            animate-pulse mb-3
            ${className}
          `}
        />
      ))}
    </>
  );
}

// ============================================================================
// MODAL COMPONENT
// ============================================================================

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center animate-fade-in z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full mx-4 animate-slide-in-up">
        <div className="bg-[#cfb991] px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-bold text-black">{title}</h2>
          <button
            onClick={onClose}
            className="
              text-2xl font-bold hover:opacity-70
              transition-opacity duration-200
              active:scale-95
            "
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-gray-200">{footer}</div>}
      </div>
    </div>
  );
}

// ============================================================================
// BADGE COMPONENT
// ============================================================================

export interface BadgeProps {
  children: ReactNode;
  color?: 'primary' | 'danger' | 'success' | 'warning' | 'info';
  className?: string;
}

export function Badge({
  children,
  color = 'primary',
  className = '',
}: BadgeProps) {
  const colors = {
    primary: 'bg-[#cfb991] text-white',
    danger: 'bg-[#F68B7C] text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <span
      className={`
        inline-block px-3 py-1 rounded-full
        text-xs font-semibold
        ${colors[color]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

// ============================================================================
// NOTIFICATION CARD COMPONENT
// ============================================================================

export interface NotificationCardProps {
  icon?: string;
  title: string;
  description: string;
  timestamp: string;
  onClick?: () => void;
  type?: 'info' | 'warning' | 'error' | 'success';
}

export function NotificationCard({
  icon = '🔔',
  title,
  description,
  timestamp,
  onClick,
  type = 'info',
}: NotificationCardProps) {
  const borderColors = {
    info: 'border-l-[#cfb991]',
    warning: 'border-l-yellow-500',
    error: 'border-l-[#F68B7C]',
    success: 'border-l-green-500',
  };

  return (
    <Card
      hoverable
      onClick={onClick}
      className={`
        border-l-4 ${borderColors[type]}
        p-4 mb-3
      `}
    >
      <div className="flex gap-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <h3 className="font-bold text-[#333333]">{title}</h3>
          <p className="text-sm text-[#666666] mt-1">{description}</p>
          <p className="text-xs text-[#999999] mt-2">{timestamp}</p>
        </div>
      </div>
    </Card>
  );
}

// ============================================================================
// FILTER PILL COMPONENT
// ============================================================================

export interface FilterPillProps {
  id: string;
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}

export function FilterPill({
  label,
  count,
  active,
  onClick,
}: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full whitespace-nowrap
        font-medium transition-all duration-200
        ${
          active
            ? 'bg-[#cfb991] text-white shadow-md scale-105'
            : 'bg-gray-100 text-[#333333] hover:bg-gray-200'
        }
      `}
    >
      {label} {count !== undefined && `(${count})`}
    </button>
  );
}

// ============================================================================
// MAP FILTER CONTAINER
// ============================================================================

export interface MapFilterContainerProps {
  children: ReactNode;
}

export function MapFilterContainer({
  children,
}: MapFilterContainerProps) {
  return (
    <div className="flex gap-2 px-4 py-2 bg-white rounded-lg shadow-md overflow-x-auto">
      {children}
    </div>
  );
}

// ============================================================================
// IMAGE PLACEHOLDER COMPONENT
// ============================================================================

export interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function ImagePlaceholder({
  src,
  alt,
  width = 300,
  height = 200,
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`
        bg-gray-200 rounded-lg flex items-center justify-center
        ${className}
      `}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <div className="text-center">
          <p className="text-4xl mb-2">🖼️</p>
          <p className="text-gray-500 text-sm">{alt}</p>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// ALERT COMPONENT
// ============================================================================

export interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  onClose?: () => void;
}

export function Alert({
  type,
  title,
  message,
  onClose,
}: AlertProps) {
  const colors = {
    info: 'bg-blue-100 border-blue-400 text-blue-800',
    success: 'bg-green-100 border-green-400 text-green-800',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-800',
    error: 'bg-red-100 border-red-400 text-red-800',
  };

  const icons = {
    info: 'ℹ️',
    success: '✓',
    warning: '⚠️',
    error: '✕',
  };

  return (
    <div
      className={`
        border-l-4 p-4 rounded-lg mb-4
        ${colors[type]}
        animate-slide-in-down
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <span className="text-xl">{icons[type]}</span>
          <div>
            <h4 className="font-bold">{title}</h4>
            <p className="text-sm mt-1">{message}</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="
              text-lg hover:opacity-70
              transition-opacity duration-200
            "
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// DIVIDER COMPONENT
// ============================================================================

export interface DividerProps {
  className?: string;
}

export function Divider({ className = '' }: DividerProps) {
  return <div className={`border-t border-[#e0e0e0] ${className}`} />;
}

// ============================================================================
// SECTION HEADER COMPONENT
// ============================================================================

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <h2 className="text-2xl font-bold text-[#333333]">{title}</h2>
      {subtitle && (
        <p className="text-[#666666] text-sm mt-1">{subtitle}</p>
      )}
    </div>
  );
}

// ============================================================================
// Export all components
// ============================================================================

export const Phase6Components = {
  Button,
  Card,
  StyledLink,
  FormInput,
  LoadingSpinner,
  SkeletonLoader,
  Modal,
  Badge,
  NotificationCard,
  FilterPill,
  MapFilterContainer,
  ImagePlaceholder,
  Alert,
  Divider,
  SectionHeader,
};
