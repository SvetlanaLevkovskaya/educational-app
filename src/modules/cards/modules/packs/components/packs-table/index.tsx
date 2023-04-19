import { FC, useEffect, useState } from 'react'

import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Space, Tooltip } from 'antd'

import { Loader } from '../../../../../../components'
import { useAuthorised } from '../../../../../auth/hooks'
import { useCardPacksQuery } from '../../../../api'
import { StyledCardTable } from '../../../../styles'

const windowHeight = window.innerHeight * 0.53

type PacksTableProps = {
  activeButton: string
}
export const PacksTable: FC<PacksTableProps> = ({ activeButton }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(10)
  const [currentHeight, setCurrentHeight] = useState(windowHeight)
  const { data: userData } = useAuthorised()

  const user_id = userData?._id

  const { data, isLoading, isError } = useCardPacksQuery({
    page: currentPage,
    pageCount: pageCount,
    user_id: activeButton === 'My' ? user_id : undefined,
  })

  const handleLearn = (record: any) => {
    console.log('record', record)
  }
  const handleEdit = (record: any) => {
    console.log('record', record)
  }

  const handleDelete = (record: any) => {
    console.log('record', record)
  }

  const handleResize = () => {
    setCurrentHeight(windowHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [window.innerHeight])

  useEffect(() => {
    const scrollableElement = document.getElementById('.ant-table-body')

    scrollableElement?.addEventListener('wheel', handleScroll, { passive: true })

    return () => scrollableElement?.removeEventListener('wheel', handleScroll)
  }, [])

  const handleScroll = () => {
    console.log('Scrolled')
  }

  const handlePageChange = (page: number, pageCount?: number) => {
    setCurrentPage(page)
    if (pageCount) {
      setPageCount(pageCount)
    }
  }

  const columns: any = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Cards',
      dataIndex: 'cards',
      sorter: (a: any, b: any) => a.cards - b.cards,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      sorter: (a: any, b: any) => a.lastUpdated - b.lastUpdated,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      sorter: (a: any, b: any) => a.createdBy.localeCompare(b.createdBy),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text: any, record: any) => {
        if (activeButton === 'My') {
          return (
            <Tooltip title="Learn">
              <InfoCircleOutlined onClick={() => handleLearn(record)} />
            </Tooltip>
          )
        }

        return (
          <Space size="middle">
            <Tooltip title="Learn">
              <InfoCircleOutlined onClick={() => handleLearn(record)} />
            </Tooltip>
            <Tooltip title="Edit">
              <EditOutlined onClick={() => handleEdit(record)} />
            </Tooltip>
            <Tooltip title="Delete">
              <DeleteOutlined onClick={() => handleDelete(record)} />
            </Tooltip>
          </Space>
        )
      },
    },
  ]

  if (isLoading) {
    return <Loader isLoading={isLoading} />
  }

  if (isError) {
    return <div>Error fetching data</div>
  }

  const formattedData = data?.cardPacks.map((card: any) => ({
    key: card._id,
    name: card.name,
    cards: card.cardsCount,
    lastUpdated: new Date(card.updated).toLocaleDateString('ru-RU'),
    createdBy: card.user_name,
  }))

  return (
    <>
      <StyledCardTable
        size={'small'}
        columns={columns}
        dataSource={formattedData}
        pagination={{
          pageSizeOptions: ['10', '20', '50'],
          showQuickJumper: true,
          onChange: handlePageChange,
          total: data?.cardPacksTotalCount || 0,
          current: currentPage,
          pageSize: pageCount,
          showSizeChanger: true,
        }}
        scroll={{
          y: currentHeight,
          scrollToFirstRowOnChange: true,
        }}
      />
    </>
  )
}
