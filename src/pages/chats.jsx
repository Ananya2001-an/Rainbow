import React, { useEffect, useState } from 'react';
import { Box, Button, HStack, VStack, chakra, useToast } from '@chakra-ui/react';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { databases } from '../utils/appwrite';
import { Query } from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_CHATS_ID;

export const Chats = () => {
    const { currentUser } = useAuth();
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal("user1", currentUser?.$id)])
        .then((response) => {
            if(response.documents.length === 0) {
                databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal("user2", currentUser?.$id)])
                .then((response) => {
                    if(response.documents.length === 0) {
                        toast({
                            title: "No chats found!",
                            isClosable: true,
                            status: "info",
                            duration: 5000,
                        });
                    }
                    setChats(response.documents);
                })
            }
            setChats(response.documents);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    return(
        <Box
            mx="auto"
            p={10}
            borderRadius="md"
            boxShadow="md"
            bg="rgba(255, 255, 255, 0.75)"
            style={{ backdropFilter: 'blur(10px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)' }}
        >
        <VStack>
            <chakra.h1 fontSize={'5xl'} fontWeight="bold" color="purple.600">Chats</chakra.h1>
            {
                chats.map((chat) => {
                    const receiver = chat.user1 !== currentUser.$id? chat.user1_name : chat.user2_name;
                    return <HStack width={'5xl'}>
                        <Button width={'5xl'} onClick={() => navigate('/chats/view', {state:{doc: chat}})}>Chat with 🦄 <i>{receiver}</i></Button>
                    </HStack> 
                })
            }
        </VStack>
        </Box>
    )
}