import React, { FC } from 'react'

import { DeleteCardRequestType } from '../../api'
import { PackBaseModalType } from '../../types/pack-modals'
import { ModalButtons } from '../modal-buttons'

type ModalDeleteType = PackBaseModalType<DeleteCardRequestType>
export const ModalDelete: FC<ModalDeleteType> = ({
  payload,
  onSubmit,
  onCancel,
}) => {
  const handleDelete = () => {
    onSubmit(payload)
    onCancel()
  }

  return (
    <>
      <p>Are you sure you want to delete the card?</p>

      <ModalButtons
        submitButtonName={'Delete'}
        onSubmit={handleDelete}
        onCancel={onCancel}
      />
    </>
  )
}
