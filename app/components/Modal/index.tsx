'use client'

import { AppContext } from '@/app/context'
import randColor from '@/app/helpers/generateHexColor'
import { useContext } from 'react'
import { v4 } from 'uuid'

export default function Modal() {
  const { dispatch } = useContext(AppContext)
  return (
    <dialog
      id="modal"
      className="modal"
      onClose={() => {
        window.modal.close()
      }}
    >
      <div className="modal-box">
        <form
          method="dialog"
          className="modal-backdrop text-white"
          onSubmit={(e: any) => {
            if (e.target.name.value.length > 0) {
              dispatch({
                type: 'ADD_WORKSPACE',
                payload: {
                  label: e.target.name.value,
                  content: {
                    global: { tabEnablePopout: false },
                    borders: [],
                    layout: {
                      type: 'row',
                      weight: 100,
                      children: [
                        {
                          id: v4(),
                          type: 'tabset',
                          weight: 50,
                          active: true,
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
              })
              e.target.reset()
            }
          }}
        >
          <div className="grid gap-4 grid-cols-1">
            <label className="form-control w-full col-span-1">
              <div className="label">
                <span className="label-text">Nome do Workspace</span>
              </div>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="modal-action">
            <button type="submit" className="btn">
              Criar
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}
