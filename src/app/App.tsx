import { Route, Routes } from 'react-router-dom'

import { Loader, Header, Error404 } from '../components'
import { MAIN_PATH } from '../constants'
import { useDefaultPage } from '../hooks'
import { Auth, Cards } from '../modules'
import { useAuthMeQuery } from '../modules/auth/api'
import { AuthProvider } from '../modules/auth/components'
import { GlobalStyle, ModuleContainer } from '../styles'

export const App = () => {
  const { isFetching } = useAuthMeQuery('auth')
  const { defaultPage } = useDefaultPage(MAIN_PATH.Cards, MAIN_PATH.Auth)

  return (
    <>
      <GlobalStyle />
      <Header />
      <Loader isLoading={isFetching}>
        <ModuleContainer>
          <Routes>
            <Route path={MAIN_PATH.Root} element={defaultPage} />
            <Route path={`${MAIN_PATH.Auth}/*`} element={<Auth />} />
            <Route element={<AuthProvider />}>
              <Route path={`${MAIN_PATH.Cards}/*`} element={<Cards />} />
            </Route>
            <Route path={MAIN_PATH.Error} element={<Error404 />} />
          </Routes>
        </ModuleContainer>
      </Loader>
    </>
  )
}
