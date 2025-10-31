import * as React from 'react';
import { ToastActionElement, ToastProps } from './toast';

const TOAST_LIMIT = 1;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

let count = 0;

function genId() {
  count = (count + 1) % 100000;
  return String(count);
}

type Action =
  | {
      type: typeof actionTypes.ADD_TOAST;
      toast: ToasterToast;
    }
  | {
      type: typeof actionTypes.UPDATE_TOAST;
      toast: Partial<ToasterToast>;
    }
  | {
      type: typeof actionTypes.DISMISS_TOAST;
      toastId?: ToasterToast['id'];
    }
  | {
      type: typeof actionTypes.REMOVE_TOAST;
      toastId?: ToasterToast['id'];
    };

interface State {
  toasts: ToasterToast[];
}

const initialState: State = {
  toasts: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      if (toastId) {
        return {
          ...state,
          toasts: state.toasts.map((t) =>
            t.id === toastId ? { ...t, open: false } : t
          ),
        };
      }

      return {
        ...state,
        toasts: state.toasts.map((t) => ({
          ...t,
          open: false,
        })),
      };
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return initialState;
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
}

const listeners: Array<(state: State) => void> = [];

let state = initialState;

function setState(value: State) {
  state = value;
  listeners.forEach((listener) => {
    listener(state);
  });
}

function dispatch(action: Action) {
  setState(reducer(state, action));
}

export function useToast() {
  const [activeToasts, setActiveToasts] = React.useState(state);

  React.useEffect(() => {
    listeners.push(setActiveToasts);
    return () => {
      const index = listeners.indexOf(setActiveToasts);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [activeToasts]);

  return {
    ...activeToasts,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  };
}

type Toast = Omit<ToasterToast, 'id'>;

export function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({ type: 'UPDATE_TOAST', toast: { ...props, id } });
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id,
    dismiss,
    update,
  };
}

export { reducer };