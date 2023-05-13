import React from 'react'

import { useModalContext } from '../../modal-provider/hooks'
import { DeleteCardRequestType, NewCardRequestType } from '../api'
import { ModalAddCard, ModalDelete } from '../components'
import { PackMutationsObjType } from '../types'
import { PackModalsHandlers } from '../types/pack-modals'

type UsePackModalsType = (mutations: PackMutationsObjType) => PackModalsHandlers
export const usePackModals: UsePackModalsType = mutations => {
  const { showModal, hideModal } = useModalContext()
  const { addCard, deleteCard, updateCard, updatePack, deletePack } = mutations

  const deleteCardModal = (payload: DeleteCardRequestType) =>
    showModal({
      title: 'Delete card',
      content: (
        <ModalDelete
          payload={payload}
          onSubmit={deleteCard.handler}
          onCancel={hideModal}
        />
      ),
    })

  const addCardModal = (payload: NewCardRequestType) => {
    showModal({
      title: 'Add new card',
      content: (
        <ModalAddCard
          payload={payload}
          onSubmit={addCard.handler}
          onCancel={hideModal}
        />
      ),
    })
  }

  const editCardModal = () => {}

  return { addCardModal, deleteCardModal }
}
