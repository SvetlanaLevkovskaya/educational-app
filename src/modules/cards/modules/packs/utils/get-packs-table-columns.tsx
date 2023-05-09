import React from 'react'

import { DeleteOutlined, EditOutlined, InfoCircleTwoTone } from '@ant-design/icons'
import { Space, Tooltip } from 'antd'
import { NavLink } from 'react-router-dom'

import { LoginResponseType } from '../../../../auth/types'
import { useModalContext } from '../../../../modal-provider/hooks'
import { MY_BUTTON_NAME } from '../../../constants'
import { PacksModal, DeleteModal } from '../components/packs-modals'
import { packsTableColumns } from '../constants'
import { HandlerPacksFunctionType, PacksTableDataColumnsType, PackType } from '../types'

type GetPacksTableColumnsType = (
  activeButton: string,
  userData: LoginResponseType | undefined,
  handleEdit: HandlerPacksFunctionType,
  handleDelete: HandlerPacksFunctionType,
  handleOk: (id?: string, newName?: string) => void,
  handleDeleteOk: (id?: string) => void
) => PacksTableDataColumnsType[]

export const getPacksTableColumns: GetPacksTableColumnsType = (
  activeButton,
  userData,
  handleEdit,
  handleDelete,
  handleOk,
  handleDeleteOk
) => {
  const { showModal } = useModalContext()

  return [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      render: (text: string, pack: PackType) => (
        <NavLink
          to={`/cards/packs/${pack._id}?name=${pack.name}&own=${pack?.user_id === userData?._id}`}
        >
          {text}
        </NavLink>
      ),
    },
    ...packsTableColumns,
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text: string, pack: PackType) => {
        const hasCards = pack.cardsCount ? pack.cardsCount > 0 : false

        const learnAction = hasCards ? (
          <NavLink to={`/cards/learn/${pack._id}?name=${pack.name}`}>
            <InfoCircleTwoTone />
          </NavLink>
        ) : (
          <InfoCircleTwoTone twoToneColor="lightgrey" />
        )

        const learnTooltipTitle = hasCards ? 'Learn' : 'No cards to learn'

        const handleEditClick = () => {
          showModal({
            title: 'Edit Pack',
            content: (
              <PacksModal
                key={pack._id}
                editing
                onOk={handleOk}
                packName={pack.name}
                id={pack._id}
                isPrivate={pack.isPrivate}
              />
            ),
          })
        }

        const handleDeleteClick = () => {
          showModal({
            title: 'Delete Pack',
            content: <DeleteModal onOk={() => handleDeleteOk(pack._id)} packName={pack.name} />,
          })
        }

        return activeButton === MY_BUTTON_NAME || pack?.user_id === userData?._id ? (
          <Space size="middle">
            <Tooltip title={learnTooltipTitle}>{learnAction}</Tooltip>

            <Tooltip title="Edit">
              <EditOutlined onClick={handleEditClick} />
            </Tooltip>

            <Tooltip title="Delete">
              <DeleteOutlined onClick={handleDeleteClick} />
            </Tooltip>
          </Space>
        ) : (
          <Tooltip title={learnTooltipTitle}>{learnAction}</Tooltip>
        )
      },
    },
  ]
}

/*import React from 'react'

import { DeleteOutlined, EditOutlined, InfoCircleTwoTone } from '@ant-design/icons'
import { Space, Tooltip } from 'antd'
import { NavLink } from 'react-router-dom'

import { LoginResponseType } from '../../../../auth/types'
import { useModalContext } from '../../../../modal-provider/hooks'
import { MY_BUTTON_NAME } from '../../../constants'
import { PacksModal, DeleteModal } from '../components/packs-modals'
import { packsTableColumns } from '../constants'
import { HandlerPacksFunctionType, PacksTableDataColumnsType, PackType } from '../types'

type GetPacksTableColumnsType = (
  activeButton: string,
  userData: LoginResponseType | undefined,
  handleEdit: HandlerPacksFunctionType,
  handleDelete: HandlerPacksFunctionType,
  handleOk: (id?: string, newName?: string) => void,
  handleDeleteOk: (id?: string) => void
) => PacksTableDataColumnsType[]

export const getPacksTableColumns: GetPacksTableColumnsType = (
  activeButton,
  userData,
  handleEdit,
  handleDelete,
  handleOk,
  handleDeleteOk
) => {
  const { showModal } = useModalContext()

  return [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      render: (text: string, pack: PackType) => (
        <NavLink
          to={`/cards/packs/${pack._id}?name=${pack.name}&own=${pack?.user_id === userData?._id}`}
        >
          {text}
        </NavLink>
      ),
    },
    ...packsTableColumns,
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text: string, pack: PackType) => {
        const hasCards = pack.cardsCount ? pack.cardsCount > 0 : false

        return activeButton === MY_BUTTON_NAME || pack?.user_id === userData?._id ? (
          <Space size="middle">
            <Tooltip title="Learn">
              {hasCards ? (
                <InfoCircleTwoTone onClick={() => console.log(pack)} />
              ) : (
                <InfoCircleTwoTone twoToneColor="lightgrey" />
              )}
            </Tooltip>

            <Tooltip title="Edit">
              <EditOutlined
                onClick={() => {
                  showModal({
                    title: 'Edit Pack',
                    content: (
                      <PacksModal
                        key={pack._id}
                        editing
                        onOk={handleOk}
                        packName={pack.name}
                        id={pack._id}
                        isPrivate={pack.isPrivate}
                      />
                    ),
                  })
                }}
              />
            </Tooltip>

            <Tooltip title="Delete">
              <DeleteOutlined
                onClick={() => {
                  showModal({
                    title: 'Delete Pack',
                    content: (
                      <DeleteModal onOk={() => handleDeleteOk(pack._id)} packName={pack.name} />
                    ),
                  })
                }}
              />
            </Tooltip>
          </Space>
        ) : (
          <Tooltip title="Learn">
            {hasCards ? (
              <InfoCircleTwoTone onClick={() => console.log(pack)} />
            ) : (
              <InfoCircleTwoTone twoToneColor="lightgrey" />
            )}
          </Tooltip>
        )
      },
    },
  ]
}*/
