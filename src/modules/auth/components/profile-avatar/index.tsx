import React, { FC } from 'react'

import { Avatar, Tooltip, Upload } from 'antd'

import { ProfileAvatarImage } from '../profile-avatar-image'

import { ErrorMessageHandler } from '@/components'
import {
  StyledAvatarGroup,
  StyledCloseCircleTwoTone,
} from '@/modules/auth/components/profile-avatar/styles'
import { PROFILE_AVATAR_TOOLTIP } from '@/modules/auth/constants/profile-avatar'
import { useProfileAvatarData } from '@/modules/auth/hooks/use-profile-avatar-data'

type ProfileAvatarType = {
  avatar?: string
}

//TODO вынести логику в хук
export const ProfileAvatar: FC<ProfileAvatarType> = ({ avatar }) => {
  const {
    handleDeleteAvatar,
    handleUploadAvatar,
    customError,
    isLoading,
    serverError,
  } = useProfileAvatarData()

  return (
    <>
      <StyledAvatarGroup>
        <Upload
          showUploadList={false}
          accept="image/*"
          customRequest={handleUploadAvatar}
        >
          <Tooltip title={PROFILE_AVATAR_TOOLTIP}>
            <Avatar
              shape="square"
              size={96}
              icon={
                <ProfileAvatarImage avatar={avatar} isLoading={isLoading} />
              }
            />
          </Tooltip>
        </Upload>
        {avatar && <StyledCloseCircleTwoTone onClick={handleDeleteAvatar} />}
      </StyledAvatarGroup>
      <ErrorMessageHandler serverError={serverError} textError={customError} />
    </>
  )
}
