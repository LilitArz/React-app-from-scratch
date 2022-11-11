import React from 'react'
import { Button } from 'library'
import { useHistory } from 'react-router-dom'

const Home = props => {
    const history = useHistory()

    const redirectToLogin = () => {
        history.push('/login')
    }

    return (
        <>
            <Button />
            <button onClick={redirectToLogin}>go to login</button>
        </>
    )
}

export default Home
