import React, { FC } from 'react'

import { LogoutOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'

import { useNavigateToOnclick } from '../../../../hooks'
import { WidgetProfileData } from '../../components/widget-profile-data'
import { ABSOLUTE_AUTH_PATH } from '../../constants'
import { useAuthorised, useAuthMutation } from '../../hooks'

import { StyledAuthWidgetButton } from './styles'

export const AuthWidget: FC = () => {
  const { isAuthorised, data: userData } = useAuthorised()
  const [handleLogOut] = useAuthMutation('logout')

  const profileRedirect = useNavigateToOnclick(ABSOLUTE_AUTH_PATH.Profile)
  const signInRedirect = useNavigateToOnclick(ABSOLUTE_AUTH_PATH.SignIn)
  const signUpRedirect = useNavigateToOnclick(ABSOLUTE_AUTH_PATH.SignUp)

  const location = useLocation()

  const unauthorisedButtonProps =
    location.pathname === '/auth/sign-up'
      ? { children: 'Sign in', onClick: signInRedirect }
      : { children: 'Sign up', onClick: signUpRedirect }

  if (!isAuthorised) {
    return <StyledAuthWidgetButton type={'primary'} {...unauthorisedButtonProps} />
  }

  return (
    <>
      <WidgetProfileData onClick={profileRedirect} userName={userData?.name} />
      <StyledAuthWidgetButton icon={<LogoutOutlined />} onClick={handleLogOut}>
        Log out
      </StyledAuthWidgetButton>
    </>
  )
}
