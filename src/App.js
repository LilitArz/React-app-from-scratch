import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Login, Home } from 'pages'
import { Header } from 'components'
import { store } from './redux/store'
import * as Styled from './styled'

const App = ({ routeBase = '' }) => {
    return (
        <Provider store={store}>
            <Styled.ResetStyles />
            <Header />
            <BrowserRouter basename={routeBase}>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="" component={Home} />
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default App
