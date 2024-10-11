import React, { useEffect } from 'react';
import { ToastBar } from 'react-hot-toast';
import { RQWrapper } from '../src/components/RQWrapper';
import List from './components/List';
import { ToastCustomUndoContent, toast, ToastCustomContent } from '../src';

const CustomContent: ToastCustomContent = (toastProps) => {
  useEffect(() => {
    return () => {
      console.log('unmount ToastWrapper');
    };
  }, []);

  return (
    <ToastBar toast={toastProps} position={toastProps.position}>
      {({ icon, message }) => {
        return (
          <>
            {icon}
            {message}

            <svg
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                cursor: 'pointer',
              }}
              viewBox="0 0 24 24"
              width="15"
              height="15"
              onClick={() => {
                toast.dismiss(toastProps.id);
              }}
            >
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </>
        );
      }}
    </ToastBar>
  );
};

const CustomUndoContent: ToastCustomUndoContent = ({ message, type, onUndo }) => {
  useEffect(() => {
    return () => {
      console.log('unmount ToastCustomUndoContent');
    };
  }, []);

  const buttonText = (() => {
    switch (type) {
      case 'delete-many': {
        return 'Cancel delete-many';
      }

      case 'delete-one': {
        return 'Cancel delete-one';
      }

      case 'update-many': {
        return 'Cancel update-many';
      }

      case 'update-one': {
        return 'Cancel update-one';
      }

      default: {
        return 'Undo';
      }
    }
  })();

  return (
    <div>
      <span>{message}</span>
      <button type="button" onClick={onUndo}>{buttonText}</button>
    </div>
  );
};

export default function App() {
  return (
    <RQWrapper
      isDevTools
      devToolsOptions={{
        buttonPosition: 'bottom-left',
      }}
      apiUrl="https://jsonplaceholder.typicode.com"
      apiAuthorization={() => 'Bearer 12345'}
      apiOnSuccess={(...args) => {
        console.log('apiOnSuccess: ', args);
      }}
      apiOnError={(...args) => {
        console.log('apiOnError: ', args);
      }}
      toast={{
        globalProps: {
          position: 'bottom-center',
        },
        CustomContent,
        CustomUndoContent,
      }}
    >
      <List />
    </RQWrapper>
  );
}
