"use client";

import { Toast } from "@/components/primitives/Toast";
import {
  createContext,
  memo,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type ToastProviderProps = {
  children?: ReactNode;
};

export type ToastContextDefaultType = {};

export type ToastContextType = ToastContextDefaultType & {};

const ToastContext = createContext<ToastContextType>({});

type ToastDispatchContextType = {
  showToast: (val: string) => void;
};

const ToastDispatchContext = createContext<ToastDispatchContextType>({
  showToast: () => {},
});

export const ToastProvider = memo(function ToastProvider({
  children,
}: ToastProviderProps): ReactElement {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");

  const showToast = useCallback((val: string) => {
    setText(val);
    setVisible(true);
  }, []);

  const oauthMemo = useMemo(() => {
    return {};
  }, []);

  const oauthDispatchMemo = useMemo(() => {
    return {
      showToast,
    };
  }, [showToast]);

  return (
    <ToastDispatchContext.Provider value={oauthDispatchMemo}>
      <ToastContext.Provider value={oauthMemo}>
        {children}
        {visible && <Toast text={text} onDismiss={() => setVisible(false)} />}
      </ToastContext.Provider>
    </ToastDispatchContext.Provider>
  );
});

export const useToast = () => {
  const context = useContext(ToastContext);
  return context;
};

export const useToastDispatch = () => {
  const context = useContext(ToastDispatchContext);
  return context;
};
