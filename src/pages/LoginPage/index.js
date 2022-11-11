import React from 'react'
import { useDispatch } from 'react-redux'
import { clickAction } from 'actions'
import { Input } from 'library'
import * as Styled from './styled'

const Login = (props) => {
    const dispatch = useDispatch()

    const handleLogin = () => {
        dispatch(clickAction())
    }

    return (
        <Styled.LoginContainer>
            <Input />
            <Styled.Button onClick={handleLogin}>Activate Lasers</Styled.Button>
        </Styled.LoginContainer>
    )
}

export default Login
