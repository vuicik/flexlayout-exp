'use client'

import { IJsonModel } from 'flexlayout-react'
import React, { createContext, Dispatch, useEffect, useReducer } from 'react'
import { v4 } from 'uuid'
import randColor from '../helpers/generateHexColor'

interface IWorkspace {
  id: string
  label: string
  content: IJsonModel
}

type AppActionKind =
  | 'ADD_WORKSPACE'
  | 'REM_WORKSPACE'
  | 'SET_WORKSPACE'
  | 'UPDATE_TABSET'
  | 'NEW_TAB_COLOR'

interface AppAction {
  type: AppActionKind
  payload: any
}

interface AppState {
  current: string | null
  workspaces: IWorkspace[]
}

const initialValues: AppState = {
  current: null,
  workspaces: [
    {
      id: v4(),
      label: 'Workspace Teste',
      content: {
        global: { tabEnablePopout: false },
        borders: [],
        layout: {
          type: 'row',
          weight: 100,
          children: [
            {
              id: v4(),
              active: true,
              type: 'tabset',
              weight: 50,
              selected: 0,
              children: [
                {
                  id: v4(),
                  type: 'tab',
                  name: 'Primeira aba',
                  component: 'iframe',
                  config: randColor(),
                },
              ],
            },
          ],
        },
      },
    },
  ],
}

export const AppContext = createContext<{
  store: AppState
  dispatch: Dispatch<AppAction>
}>({
  store: initialValues,
  dispatch: () => null,
})

function reducer(state: AppState, action: AppAction) {
  const newWorkspaces = JSON.parse(JSON.stringify(state.workspaces))
  const currentWorkspace = newWorkspaces.findIndex(
    (a: any) => a.id === state.current
  )
  switch (action.type) {
    case 'ADD_WORKSPACE':
      newWorkspaces.push({
        id: v4(),
        label: action.payload.label,
        content: action.payload.content,
      })
      return {
        ...state,
        workspaces: newWorkspaces,
      }
    case 'SET_WORKSPACE':
      return {
        ...state,
        current: action.payload,
      }
    case 'UPDATE_TABSET':
      newWorkspaces[currentWorkspace].content = action.payload
      return {
        ...state,
        workspaces: newWorkspaces,
      }
    case 'NEW_TAB_COLOR':
      newWorkspaces[currentWorkspace].content.layout.children[
        newWorkspaces[currentWorkspace].content.layout.children.findIndex(
          (el: any) => el.active
        )
      ].children[
        newWorkspaces[currentWorkspace].content.layout.children[
          newWorkspaces[currentWorkspace].content.layout.children.findIndex(
            (el: any) => el.active
          )
        ].selected
          ? newWorkspaces[currentWorkspace].content.layout.children[
              newWorkspaces[currentWorkspace].content.layout.children.findIndex(
                (el: any) => el.active
              )
            ].selected
          : 0
      ].config = randColor()
      return {
        ...state,
        workspaces: newWorkspaces,
      }
    default:
      return state
  }
}

function getInitialState() {
  if (typeof window !== 'undefined' && window.localStorage) {
    const store = localStorage.getItem('store')
    return store ? JSON.parse(store) : initialValues
  }
}

export function AppStore({ children }: React.PropsWithChildren) {
  const [store, dispatch] = useReducer(reducer, getInitialState())

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('store', JSON.stringify(store))
    }
  }, [store])

  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
