import React, { useEffect, useState} from 'react'

const AuthContext = React.createContext()

const AuthProvider = (props) => {

    const [user, setUser] = useState({});

    const getUser = () => {
        axios.get('/auth-user')
        .then(res => setUser(res.data.user))
        .catch(err => console.log(err));
    }

    useEffect(() => {
        getUser();
    }, [])

    return (

        <AuthContext.Provider value={[user, getUser]}>
            { props.children }
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}
