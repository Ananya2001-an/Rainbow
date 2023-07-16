import React, { useState, useEffect, useRef } from "react";
import { AiFillEye, AiOutlineSearch, AiOutlineSend } from "react-icons/ai";
import { databases, storage } from "../utils/appwrite";
import { Query } from "appwrite";
import {Input, InputGroup, InputLeftElement, InputRightElement, Button, Tabs, Tab, TabList, Card, SimpleGrid, Box, Avatar, CardBody, CardFooter, CardHeader, Heading, Text, VStack} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_PROFILES_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

export const Explore = () => {
    const [profiles, setProfiles] = useState(null);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const toast = useToast();
    const identities = ['All', 'Woman', 'Non-Binary', 'Transgender', 'Cisgender', 'Genderqueer', 'Demigender', 'Agender', 'Genderfluid', 'Other']

    useEffect(() => {
        databases.listDocuments(DATABASE_ID, COLLECTION_ID).then((response) => {
            setProfiles(response.documents);
        })
    }, [])

    const handleSearch = () => {
        if (search === "") {
            toast({
                title: "Search field is empty",
                description: "Please enter a username to search for",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
            return;
        }
        const query = [Query.equal("user_name", search)];
        databases.listDocuments(DATABASE_ID, COLLECTION_ID, query).then((response) => {
            setProfiles(response.documents);
            if(response.documents.length === 0) {
                toast({
                    title: "No results found",
                    description: "Please try another username",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            }
        })
    }

    const handleTabSelection = (identity) => {
        if (identity === "All") {
            databases.listDocuments(DATABASE_ID, COLLECTION_ID).then((response) => {
                setProfiles(response.documents);
                if(response.documents.length === 0) {
                    toast({
                        title: "No Profiles Found!",
                        status: "info",
                        duration: 5000,
                        isClosable: true,
                    })
                }
            })
            return;
        }
        const query = [Query.equal("identity", identity)];
        databases.listDocuments(DATABASE_ID, COLLECTION_ID, query).then((response) => {
            setProfiles(response.documents);
            if(response.documents.length === 0) {
                toast({
                    title: "No Profiles Found With This Identity!",
                    status: "info",
                    duration: 5000,
                    isClosable: true,
                })
            }
        })
    }

    return(
    <>
    <VStack height={"100vh"} p={8}>
    <InputGroup>
        <InputLeftElement pointerEvents="none" children={<AiOutlineSearch/>}/>
        <Input focusBorderColor="purple.600" type="text" placeholder="Search profiles" value={search} onChange={(e) => setSearch(e.target.value)}/>
        <InputRightElement children={<Button onClick={() => handleSearch()} bg={'none'} _hover={{color:"purple.600"}} size={20}><AiOutlineSend/></Button>
}/>
    </InputGroup>
    
    <Tabs variant='soft-rounded' colorScheme='purple'>
        <TabList mb="1em">
            {
                identities.map((identity) => {
                    return <Tab onClick={() => handleTabSelection(identity)}>{identity}</Tab>
                })
            }
        </TabList>
    </Tabs>

    <SimpleGrid spacing={4} columns={4} p={3} overflowY={'auto'}>
    {
        profiles && profiles.map((profile) => {
            const avatar = storage.getFilePreview(BUCKET_ID, profile.avatar).href;
            return <Card boxShadow="md" _hover={{scaleY:"1.05", boxShadow:"lg"}}
                bg="rgba(255, 255, 255, 0.75)"
                style={{ backdropFilter: 'blur(10px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)' }} width={'250px'}>
                <CardHeader w={'full'} textAlign={'center'}>
                    <Avatar size={'xl'} src={avatar} p={2}/>
                    <Heading size='md'>{profile.user_name}</Heading>
                </CardHeader>
                <CardBody textAlign={'center'}>
                    <Text>{profile.bio}</Text>
                </CardBody>
                <CardFooter>
                    <Button bg={'none'} _hover={{bg:"purple.700", color:"white"}} onClick={() => navigate(`/profile/view/${profile.$id}`, {state:{profile: profile}})}>
                        <AiFillEye size={20}/>
                    </Button>
                </CardFooter>
            </Card>
        })
    }
    </SimpleGrid>
    </VStack>
    </>
    )
}