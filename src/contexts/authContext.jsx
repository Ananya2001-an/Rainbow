import React, { useContext, useEffect, useState } from 'react'
import { account } from '../utils/appwrite'
import {ID} from "appwrite"
import { useNavigate } from 'react-router-dom'
 
const AuthContext = React.createContext()

export function useAuth(){
   return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        account.get().then((accountResponse) => {
            setCurrentUser(accountResponse);
        });
    }, []);

    function signup(email, password, name){
        account.create(ID.unique(), email, password, name)
            .then(
                function (response) {
                    alert("Success! Account created successfully.");
                    navigate("/login");
                }
            )
            .catch(function (error) {
                alert(error.message);
            });
    }

    function login(email, password){
        account.createEmailSession(email, password)
        .then(
            function (response) {
                account.get().then((accountResponse) => {
                setCurrentUser(accountResponse);
                navigate('/');
                });
            }
        )
        .catch(function (error) {
            alert(error.message);
        });
    }

    function logout(){
        account.deleteSession('current')
        .then(
            function (response) {
                setCurrentUser(null);
                navigate('/login');
            }
        )
        .catch(function (error) {
            alert(error.message);
        });
    }

    const value ={currentUser, signup, login, logout}

  return (
    <AuthContext.Provider value = {value}>
        {children}        
    </AuthContext.Provider>
  )
}