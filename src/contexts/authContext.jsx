import React, { useContext, useEffect, useState } from 'react'
import { account, databases } from '../utils/appwrite'
import { ID } from "appwrite"
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
 
const AuthContext = React.createContext()

export function useAuth(){
   return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const navigate = useNavigate()
    const toast = useToast()

    useEffect(() => {
        account.get().then((accountResponse) => {
            setCurrentUser(accountResponse);
        });
    }, []);

    function signup(email, password, name){
        account.create(ID.unique(), email, password, name)
            .then(
                function (response) {
                    // create a default profile for the user
                    try{
                        const profile = {
                        "user": response.$id,
                        "links": '{"github":"","linkedin":"","twitter":"","instagram":"", "youtube":""}'
                        }
                        databases.createDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID, import.meta.env.VITE_APPWRITE_COLLECTION_ID, ID.unique(), profile)
                        toast({
                            title: "Account created!",
                            status: "success",
                            duration: 3000,
                            isClosable: true,
                        })
                        navigate("/login");
                    }
                    catch(error){
                        console.log(error)
                        toast({
                            title: "Failed to create profile!",
                            description: error.message,
                            status: "error",
                            duration: 3000,
                            isClosable: true,
                        })
                    }
                }
            )
            .catch(function (error) {
                toast({
                    title: "Failed to create account. Try again!",
                    description: error.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            });
    }

    function login(email, password){
        account.createEmailSession(email, password)
        .then(
            function (response) {
                account.get().then((accountResponse) => {
                setCurrentUser(accountResponse);
                navigate('/');
                toast({
                    title: "Logged in!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
                });
            }
        )
        .catch(function (error) {
            toast({
                title: "Failed to login. Try again!",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        });
    }

    function logout(){
        account.deleteSession('current')
        .then(
            function (response) {
                setCurrentUser(null);
                navigate('/login');
                toast({
                    title: "Logged out!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
            }
        )
        .catch(function (error) {
            toast({
                title: "Failed to logout. Try again!",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        });
    }

    const value ={currentUser, signup, login, logout}

  return (
    <AuthContext.Provider value = {value}>
        {children}        
    </AuthContext.Provider>
  )
}