'use client'

import { Actions, DockLocation, Layout, Model, TabNode } from 'flexlayout-react'
import './style.css'
import { useContext, useRef } from 'react'
import { AppContext } from '@/app/context'
import { v4 } from 'uuid'
import randColor from '@/app/helpers/generateHexColor'
import Image from 'next/image'

export default function Tabs() {
  const { store, dispatch } = useContext(AppContext)
  const layoutRef: any = useRef(null)
  if (!store) return <></>
  const currentWorkspace: any =
    store.workspaces[store.workspaces.findIndex((w) => w.id === store.current)]

  if (!currentWorkspace)
    return (
      <div className="flex z-0 bg-slate-600 h-[100vh] w-[calc(100%-10px)]">
        <div
          className="w-[30px]"
          style={{
            background:
              'linear-gradient(90deg, rgba(71,85,105,1) 0%, rgba(15,23,42,1) 100%)',
          }}
        ></div>
        <div className="flex justify-center items-center relative flex-1 text-white">
          Escolha um workspace.
        </div>
      </div>
    )

  const model = Model.fromJson(currentWorkspace.content)
  const factory = (node: TabNode) => {
    const component = node.getComponent()
    if (component === 'iframe') {
      return (
        <iframe
          style={{ width: '100%', height: '100%' }}
          src={'/square?id=' + node.getId()}
        ></iframe>
      )
    }
  }

  return (
    <div className="flex z-0 bg-slate-600 h-[100vh] w-[calc(100%-10px)]">
      <div
        className="w-[30px]"
        style={{
          background:
            'linear-gradient(90deg, rgba(71,85,105,1) 0%, rgba(15,23,42,1) 100%)',
        }}
      ></div>
      <div className="relative flex-1">
        <Layout
          model={model}
          ref={layoutRef}
          factory={factory}
          onModelChange={(mod) => {
            dispatch({ type: 'UPDATE_TABSET', payload: mod.toJson() })
          }}
          onRenderTabSet={(node, renderValues) => {
            renderValues.stickyButtons.push(
              <Image
                src="/images/add.svg"
                alt="Add"
                key="Add button"
                style={{ width: '1.1em', height: '1.1em' }}
                className="flexlayout__tab_toolbar_button"
                onClick={() => {
                  model.doAction(
                    Actions.addNode(
                      {
                        type: 'tab',
                        component: 'iframe',
                        name: 'Nova Aba',
                        id: v4(),
                        config: randColor(),
                      },
                      node.getId(),
                      DockLocation.CENTER,
                      -1
                    )
                  )
                }}
              />
            )
          }}
        />
      </div>
    </div>
  )
}
