import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/authContext'
import { useLocation } from 'react-router-dom'
import { VStack, useToast, Box, Button, HStack, Avatar, AvatarBadge, IconButton, InputRightElement, Heading, Text, Badge} from '@chakra-ui/react'
import { databases, storage } from '../utils/appwrite'
import { AiFillTwitterCircle, AiFillLinkedin, AiFillGithub, AiFillYoutube, AiFillInstagram, AiFillMessage } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { ID, Query } from 'appwrite'

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const PROFILES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_PROFILES_ID
const CHATS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_CHATS_ID
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID

export const ProfileView = () => {
    const {currentUser} = useAuth();  
    const toast = useToast()
    const location = useLocation()
    let { profile } = location.state
    const { bio, identity, user, skills, links, avatar, user_name } = profile
    let linksJSON = JSON.parse(links)
    const [avatarPreview, setAvatarPreview] = useState('');
    const navigate = useNavigate();
    const [currentUserAvatar, setCurrentUserAvatar] = useState('')

    useEffect(() => {
        setAvatarPreview(storage.getFilePreview(BUCKET_ID, avatar).href)
        
        databases.listDocuments(DATABASE_ID, PROFILES_COLLECTION_ID, [Query.equal('user', currentUser.$id)]).then((response) => {
            setCurrentUserAvatar(response.documents[0].avatar)
        })
    }, [])

    const createChat = () => {
        databases.listDocuments(DATABASE_ID, CHATS_COLLECTION_ID, [Query.equal('user1', currentUser.$id), Query.equal('user2', user)]).then((response) => {
            if(response.documents.length > 0) {
                toast({
                    title: "Chat already exists!",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                })
                navigate('/chats/view', {state: {doc: response.documents[0]}})
            }
            else{
                databases.listDocuments(DATABASE_ID, CHATS_COLLECTION_ID, [Query.equal('user1', user), Query.equal('user2', currentUser.$id)]).then((response) => {
                if(response.documents.length > 0) {
                    toast({
                        title: "Chat already exists!",
                        status: "info",
                        duration: 3000,
                        isClosable: true,
                    })
                    navigate('/chats/view', {state: {doc: response.documents[0]}})
                }
                else{
                    const chat = {
                    "user1": currentUser.$id,
                    "user2": user,
                    "messages": [JSON.stringify({"sender": currentUser.$id, "message": "Hello!"})],
                    "user1_name": currentUser.name,
                    "user2_name": user_name,
                    "user1_avatar": currentUserAvatar,
                    "user2_avatar": avatar
                    }
                    databases.createDocument(DATABASE_ID, CHATS_COLLECTION_ID, ID.unique(), chat).then((response) => {
                            toast({
                                title: "Chat created!",
                                status: "success",
                                duration: 3000,
                                isClosable: true,
                            })
                            navigate('/chats/view', {state: {doc: response}})
                        })
                        .catch((error) => {
                            toast({
                                title: "Failed to create chat!",
                                description: error.message,
                                status: "error",
                                duration: 3000,
                                isClosable: true,
                            })
                        })
                }})
                .catch((error) => {
                    console.log(error)
                })   
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <Box 
        width={'5xl'}
        mx="auto"
        p={10}
        borderRadius="md"
        boxShadow="md"
        bg="rgba(255, 255, 255, 0.75)"
        style={{ backdropFilter: 'blur(10px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)' }}>
        <VStack>
            <HStack>
                <Avatar size="2xl" src={avatarPreview}>
                <AvatarBadge fontSize={"12px"} p={1} bg='purple.600'>
                    {identity}
                </AvatarBadge>
                </Avatar>
                <Heading color={'purple.600'}>{user_name}</Heading>
                <Button display={user === currentUser.$id ? 'none' : 'block'} bg={'transparent'} _hover={{bg:"transparent", color:"purple.600"}} onClick={() => createChat()}>
                    <AiFillMessage size={30}/>
                </Button>
            </HStack>
            <Text mt={2}>{bio}</Text>
            <HStack spacing={2}>
            {
                skills && skills.map((skill) => {
                    return <Badge p={1} variant={'subtle'} rounded={'md'} colorScheme='purple'>{skill}</Badge>
                })
            }
            </HStack>
            <VStack mt={3}>
                {
                    linksJSON.github !== "" && linksJSON.github !== "github" && <Button w={'3xl'} as="a" href={linksJSON.github} target='_blank' rounded={'3xl'} p={6} mb={2} bg={'transparent'} border={'2px'} borderColor={'black'} _hover={{boxShadow:"lg", bg:"purple.500"}} fontSize={20}>
                        <AiFillGithub style={{marginRight:"5px"}}/> GitHub
                    </Button>
                }
                {
                    linksJSON.linkedin !== "" && linksJSON.linkedin !== "linkedin" && <Button w={'3xl'} as="a" href={linksJSON.linkedin} target='_blank' rounded={'3xl'} p={6} mb={2} bg={'transparent'} border={'2px'} borderColor={'blue.500'} _hover={{boxShadow:"lg", bg:"purple.500"}} color={'blue.500'} fontSize={20}>
                      <AiFillLinkedin style={{marginRight:"5px"}}/> LinkedIn
                    </Button>
                }
                {
                    linksJSON.twitter !== "" && linksJSON.twitter !== "twitter" && <Button w={'3xl'} as="a" href={linksJSON.twitter} target='_blank' rounded={'3xl'} p={6} mb={2} bg={'transparent'} border={'2px'} borderColor={'blue.300'} _hover={{boxShadow:"lg", bg:"purple.500"}} color={'blue.300'} fontSize={20}>
                      <AiFillTwitterCircle style={{marginRight:"5px"}}/> Twitter
                    </Button>
                }
                {
                    linksJSON.instagram !== "" && linksJSON.instagram !== "instagram" && <Button w={'3xl'} as="a" href={linksJSON.instagram} target='_blank' rounded={'3xl'} p={6} mb={2} bg={'transparent'} border={'2px'} borderColor={'pink.300'} _hover={{boxShadow:"lg", bg:"purple.500"}} color={'pink.300'} fontSize={20}>
                       <AiFillInstagram style={{marginRight:"5px"}}/> Instagram
                    </Button>
                }
                {
                    linksJSON.youtube !== "" && linksJSON.youtube !== "youtube" && <Button as="a" w={'3xl'} href={linksJSON.youtube} target='_blank' rounded={'3xl'} p={6} mb={2} bg={'transparent'} border={'2px'} borderColor={'red'} _hover={{boxShadow:"lg", bg:"purple.500"}} color={'red'} fontSize={20}>
                        <AiFillYoutube style={{marginRight:"5px"}}/> YouTube
                    </Button>
                }
            </VStack>
        </VStack>
        </Box>
    )
}