'use client'

import { AppContext } from '@/app/context'
import { useContext } from 'react'
import Modal from '../Modal'

export default function Menu() {
  const { store, dispatch } = useContext(AppContext)
  if (!store) return <></>
  const { current, workspaces } = store
  return (
    <nav className="flex flex-col justify-between absolute z-10 left-0 bg-slate-800 h-full hover:max-w-[216px] max-w-[52px] overflow-hidden transition-all ease-in-out duration-100 select-none">
      <ul>
        {workspaces.map((item, index) => {
          const isCurr = item.id === current
          return (
            <li
              className={`flex items-center gap-2 w-[200px] ${
                isCurr ? 'bg-slate-600' : 'hover:bg-slate-700'
              } m-2 rounded-md cursor-pointer`}
              onClick={() =>
                dispatch({ type: 'SET_WORKSPACE', payload: item.id })
              }
              key={item.id}
            >
              <div className="flex items-center justify-center w-9 h-9 bg-slate-900 rounded-md">
                {index + 1}
              </div>
              <div>{item.label}</div>
            </li>
          )
        })}
      </ul>
      <ul>
        <li
          className={`flex items-center gap-2 w-[200px] hover:bg-slate-700 m-2 rounded-md cursor-pointer`}
          onClick={() => window.modal.showModal()}
        >
          <div className="flex items-center justify-center w-9 h-9 bg-slate-900 rounded-md">
            +
          </div>
          <div>Criar Workspace</div>
        </li>
      </ul>
      <Modal />
    </nav>
  )
}
