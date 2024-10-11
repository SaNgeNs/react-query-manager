import toastApi, { Renderable, ToastPosition } from 'react-hot-toast/headless';
import { type Toast, ToastBar as ToastBarToast, resolveValue } from 'react-hot-toast';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { remove, ...restOfToastApi } = toastApi;

/** @notExported */
interface ToastBarProps {
  toast: Toast;
  position?: ToastPosition;
  style?: React.CSSProperties;
  children?: (components: {
      icon: Renderable;
      message: Renderable;
  }) => Renderable;
}

/**
 * Export of `toast` from `react-hot-toast/headless`, which is an API for creating notifications,
 *
 * ⚠️ but without the **`remove`** method ⚠️.
 *
 * See the [documentation](https://react-hot-toast.com/docs/toast) for more details.
 */
export const toast = Object.assign(
  (...args: Parameters<typeof toastApi>) => toastApi(...args),
  restOfToastApi,
);

/**
 * `ToastBar` is a wrapper for displaying notifications from the `react-hot-toast` library.
 * You can use it or create your own implementation. See the [documentation](https://react-hot-toast.com/docs/toast-bar) for more details.
 */
export const ToastBar: React.FC<ToastBarProps> = ToastBarToast;

/**
 * A utility function that resolves the value of a toast message. The value can either be a static value or a function
 * that generates the value based on the provided argument.
 *
 * @example
 * // Resolving a static value
 * const message = resolveToastValue('Hello, World!', toast);
 *
 * @example
 * // Resolving a value from a function
 * const message = resolveToastValue((ctx) => `Hello, ${ctx.userName}!`, toast);
 */
export const resolveToastValue = resolveValue;
