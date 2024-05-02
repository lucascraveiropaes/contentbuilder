import { createContext, useReducer, useContext, ReactNode, Dispatch, Reducer } from "react";

export interface Action {
  type: string;
  payload?: any;
}

export interface DataProviderProps<T> {
  data: T;
  reducer: Reducer<T, Action>;
  children?: ReactNode;
}

export const Context = createContext<{
  state: any;
  dispatch: Dispatch<Action>;
} | null>(null);

export function DataProvider<T>({ data, reducer, ...props }: DataProviderProps<T>) {
  const [state, dispatch] = useReducer<Reducer<T, Action>>(reducer, data);

  return (
    <Context.Provider value={{ state, dispatch }} {...props} />
  );
}

DataProvider.defaultProps = {
  data: {},
}

export function useData<T>(): [T, Dispatch<Action>] {
  const context = useContext(Context);
  if (context === null) {
    throw new Error('useData must be used within a DataProvider');
  }
  const { state, dispatch } = context;
  return [state, dispatch];
}
