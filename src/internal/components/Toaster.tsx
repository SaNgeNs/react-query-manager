/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect } from 'react';
import { type ToasterProps, type ToastPosition } from 'react-hot-toast';
import { resolveValue, useToaster } from 'react-hot-toast/headless';
import { toast } from '../../utils/toast';

const prefersReducedMotion = (() => {
  let shouldReduceMotion: boolean | undefined;

  return () => {
    if (shouldReduceMotion === undefined && typeof window !== 'undefined') {
      const mediaQuery = matchMedia('(prefers-reduced-motion: reduce)');
      shouldReduceMotion = !mediaQuery || mediaQuery.matches;
    }
    return shouldReduceMotion;
  };
})();

function ToastWrapper({
  id,
  visible,
  closeOutside,
  className,
  style,
  onHeightUpdate,
  children,
}: {
  id: string;
  visible: boolean;
  closeOutside: boolean;
  className?: string;
  style?: React.CSSProperties;
  onHeightUpdate: (id: string, height: number) => void;
  children?: React.ReactNode;
}) {
  const ref = useCallback(
    (el: HTMLElement | null) => {
      if (el) {
        const updateHeight = () => {
          const { height } = el.getBoundingClientRect();
          onHeightUpdate(id, height);
        };
        updateHeight();
        new MutationObserver(updateHeight).observe(el, {
          subtree: true,
          childList: true,
          characterData: true,
        });
      }
    },
    [id, onHeightUpdate],
  );

  useEffect(() => {
    const callback = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isInsideToast = target.closest(`[data-toast-id="${id}"]`);

      if (!isInsideToast) {
        toast.dismiss(id);
      }
    };

    if (closeOutside) {
      setTimeout(() => {
        document.addEventListener('click', callback);
      }, 0);
    }

    return () => {
      if (closeOutside) {
        setTimeout(() => {
          document.removeEventListener('click', callback);
        }, 0);
      }
    };
  }, [visible, id, closeOutside]);

  return (
    <div data-toast-id={id} ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

const getPositionStyle = (
  position: ToastPosition,
  offset: number,
): React.CSSProperties => {
  const top = position.includes('top');
  const verticalStyle: React.CSSProperties = top ? { top: 0 } : { bottom: 0 };
  const horizontalStyle: React.CSSProperties = position.includes('center')
    ? { justifyContent: 'center' }
    : position.includes('right')
      ? { justifyContent: 'flex-end' }
      : {};

  return {
    left: 0,
    right: 0,
    display: 'flex',
    position: 'absolute',
    transition: prefersReducedMotion()
      ? undefined
      : 'all 230ms cubic-bezier(.21,1.02,.73,1)',
    transform: `translateY(${offset * (top ? 1 : -1)}px)`,
    ...verticalStyle,
    ...horizontalStyle,
  };
};

const DEFAULT_OFFSET = 16;

export function Toaster({
  reverseOrder,
  position = 'top-center',
  toastOptions,
  gutter,
  children,
  containerStyle,
  containerClassName,
}: ToasterProps) {
  const { toasts, handlers } = useToaster(toastOptions);

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 9999,
        top: DEFAULT_OFFSET,
        left: DEFAULT_OFFSET,
        right: DEFAULT_OFFSET,
        bottom: DEFAULT_OFFSET,
        pointerEvents: 'none',
        ...containerStyle,
      }}
      className={containerClassName}
      onMouseEnter={handlers.startPause}
      onMouseLeave={handlers.endPause}
    >
      {toasts.map((t) => {
        const toastPosition = t.position || position;
        const toast = { ...t, position: toastPosition };

        const offset = handlers.calculateOffset(toast, {
          reverseOrder,
          gutter,
          defaultPosition: position,
        });
        const positionStyle = getPositionStyle(toastPosition, offset);

        return (
          <ToastWrapper
            id={toast.id}
            key={toast.id}
            visible={toast.visible}
            closeOutside={(toast as any)?.extraParams?.closeOutside || false}
            onHeightUpdate={handlers.updateHeight}
            style={{
              ...positionStyle,
              pointerEvents: 'auto',
            }}
          >
            {toast.type === 'custom' ? (
              resolveValue(t.message, toast)
            ) : children ? (
              children(toast)
            ) : (
              <div style={{ display: t.visible ? 'flex' : 'none' }}>
                {resolveValue(toast.message, toast)}
              </div>
            )}
          </ToastWrapper>
        );
      })}
    </div>
  );
}
