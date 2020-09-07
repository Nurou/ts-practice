import React, { createContext, useContext, useReducer } from 'react';
import { Patient, Diagnosis } from '../types';

import { Action } from './reducer';

export type State = {
  patients: { [id: string]: Patient };
  diagnoses: { [id: string]: Diagnosis };
};

const initialState: State = {
  patients: {},
  diagnoses: {},
};

// default values passed in to state
// this holds app state & dispatcher for changing state
export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

/**
 * provides state to all child components
 * @param reducer:
 */
export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children,
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    /* state and dispatch method available to all children */
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

// useContext called (through useStateValue) by a child whenever it needs access to this context
export const useStateValue = () => useContext(StateContext);
