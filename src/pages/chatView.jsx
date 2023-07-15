import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/authContext'
import { useLocation } from 'react-router-dom'
import { VStack, useToast, Box, InputGroup, Input, Button, HStack, Avatar, IconButton, InputRightElement } from '@chakra-ui/react'
import { databases, client, storage } from '../utils/appwrite'
import Picker from '@emoji-mart/react'
import { AiFillSmile } from 'react-icons/ai'

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_CHATS_ID
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID

export const ChatView = () => {
    const {currentUser} = useAuth()
    const toast = useToast()
    const location = useLocation()
    let { doc } = location.state
    const { user1, user2, user1_name, user2_name, user1_avatar, user2_avatar } = doc
    const [messageToSend, setMessageToSend] = useState('')
    const [messages, setMessages] = useState(Array.from(doc.messages))
    const [user1Avatar, setUser1Avatar] = useState('');
    const [user2Avatar, setUser2Avatar] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    useEffect(() => {
        setUser1Avatar(storage.getFilePreview(BUCKET_ID, user1_avatar).href)
        setUser2Avatar(storage.getFilePreview(BUCKET_ID, user2_avatar).href)

        const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents.${doc.$id}`, (response) => {
            // console.log(response)
            doc = response
            setMessages(Array.from(response.payload.messages))
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const handleMessage = async() => {
        if(messageToSend === '') {
            toast({
                title: "Empty message",
                description: "Please enter a message",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
            return
        }
        const newMessage = {
            "sender": currentUser.$id,
            "message": messageToSend
        }
        const updatedMessages = messages
        updatedMessages.push(JSON.stringify(newMessage))
        
        databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {"messages": updatedMessages})
            .then((res) => {
                // console.log(res)
            })
            .catch((error) => {
                toast({
                    title: "Failed to send message!",
                    description: error.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            })

            setMessageToSend('')
        }

    return (
        <Box
            height={'80vh'}
            mx="auto"
            p={10}
            borderRadius="md"
            boxShadow="md"
            bg="rgba(255, 255, 255, 0.75)"
            style={{ backdropFilter: 'blur(10px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)' }}
        >
            <VStack width={'5xl'} alignItems={'start'} h={'full'} justifyContent={'space-between'}>
                <Box overflowY={'auto'} w={'full'}>
                {
                    messages.map((message) => {
                        message = JSON.parse(message)
                        return <HStack>
                            <Avatar size="md" name={message.sender === currentUser.$id? currentUser.name : message.sender === user1 ? user1_name : user2_name} src={message.sender === user1 ? user1Avatar : user2Avatar} mr={2} mt={-8}/>

                            <VStack width={'fit-content'} background={message.sender === currentUser.$id? 'purple.600':'blue.200'} p={2} rounded={'md'} alignItems={'start'} mb={4}>
                                <p style={{fontWeight:"bold", color:"white"}}>{message.message}</p>
                                <small style={{fontStyle:"italic"}}>{message.sender === currentUser.$id? 'You' : message.sender === user1 ? user1_name : user2_name}</small>
                        </VStack>
                        </HStack>
                    })
                }
                </Box>
                <InputGroup>
                    <InputGroup>
                    <Input focusBorderColor='purple.600' placeholder="Type your message here" value={messageToSend} onChange={(e) => setMessageToSend(e.target.value)}/>
                    <InputRightElement>
                    <IconButton
                        aria-label="emoji-picker"
                        mr={2}
                        h={12}
                        w={16}
                        icon={<AiFillSmile size="24px" />}
                        bg={'none'}
                        _hover={{bg:"none", color:"purple.600"}}
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        />
                        {showEmojiPicker && (
                        <Box pos="absolute" zIndex={1} bottom="20" right="20">
                            <Picker
                            onEmojiSelect={(emoji) => {
                                setMessageToSend((prev) => prev + emoji.native);
                                setShowEmojiPicker(false);
                            }}
                            emojiSize={24}
                            title="Pick an emoji"
                            />
                        </Box>
                        )}
                    </InputRightElement>
                    </InputGroup>
                    <Button ml={2} background={'purple.600'} color={'white'} _hover={{bg:"purple.700"}} onClick={() => handleMessage()}>Send</Button>
                </InputGroup>
            </VStack>
        </Box>

    )
}