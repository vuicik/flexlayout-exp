'use client'

import { useContext } from 'react'
import { AppContext } from '../context'

export default function Square() {
  const { store, dispatch } = useContext(AppContext)
  if (!store) return <></>
  const currentWorkspace: any =
    store.workspaces[store.workspaces.findIndex((w) => w.id === store.current)]
  const getTabColor =
    currentWorkspace.content.layout.children[
      currentWorkspace.content.layout.children.findIndex((el: any) => el.active)
    ].children[
      currentWorkspace.content.layout.children[
        currentWorkspace.content.layout.children.findIndex(
          (el: any) => el.active
        )
      ].selected
        ? currentWorkspace.content.layout.children[
            currentWorkspace.content.layout.children.findIndex(
              (el: any) => el.active
            )
          ].selected
        : 0
    ].config
  return (
    <div
      className="flex justify-center items-center h-[250px] w-[250px] rounded-md"
      style={{ backgroundColor: '#' + getTabColor }}
    >
      <span className="bg-slate-900 rounded-md p-2">#{getTabColor}</span>
      <button
        className="btn"
        onClick={() => {
          dispatch({ type: 'NEW_TAB_COLOR', payload: null })
        }}
      >
        Nova cor
      </button>
    </div>
  )
}
