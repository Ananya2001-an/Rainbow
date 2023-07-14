import { Box, Button, chakra, Avatar, Input, InputGroup, InputLeftElement, Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon, Radio, RadioGroup, Stack, useToast } from "@chakra-ui/react"
import { useAuth } from "../contexts/authContext"
import { AiFillGithub, AiFillTwitterCircle, AiFillLinkedin, AiFillInstagram, AiFillYoutube, AiFillEdit, AiFillTool, AiFillCamera } from "react-icons/ai";
import { useEffect, useState, useRef } from "react";
import { databases, storage } from "../utils/appwrite";
import { Query, AppwriteException, ID } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

export const Profile = () => {
    const {currentUser} = useAuth();
    const [profile, setProfile] = useState(null);
    const [identity, setIdentity] = useState('Other');
    const [github, setGithub] = useState('');
    const [twitter, setTwitter] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [instagram, setInstagram] = useState('');
    const [youtube, setYoutube] = useState('');
    const [bio, setBio] = useState('');
    const [skills, setSkills] = useState('');
    const [avatar, setAvatar] = useState('');
    const toast = useToast()
    const avatarRef = useRef()

    useEffect(() => {
        try{    
            databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal("user", currentUser?.$id)])
            .then((response) => {
                if(response.documents.length < 0){
                    toast({
                        title: "Profile not found",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        })
                    return
                }
                setProfile(response.documents[0])
                const links = JSON.parse(response.documents[0].links)
                setGithub(links.github)
                setTwitter(links.twitter)
                setLinkedin(links.linkedin)
                setInstagram(links.instagram)
                setYoutube(links.youtube)
                setBio(response.documents[0].bio)
                setSkills(response.documents[0].skills.join(','))
                const {href} = storage.getFilePreview(BUCKET_ID, response.documents[0].avatar)
                setAvatar(href)
            }
        )}
        catch(AppwriteException){
            console.log(AppwriteException)
            toast({
                title: "Error fetching profile",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }, [])

    useEffect(() => {
        if(profile?.avatar){
        const {href} = storage.getFilePreview(BUCKET_ID, profile.avatar)
        setAvatar(href)
        }
    }, [profile])

    const handleAvatar = () => {
        storage.createFile(BUCKET_ID, ID.unique(), avatarRef.current.files[0])
        .then(function (response) {
            const updatedAvavtar = {"avatar": response?.$id}
            try{
                setProfile(databases.updateDocument(DATABASE_ID, COLLECTION_ID, profile.$id, updatedAvavtar))
                toast({
                    title: "Avatar updated successfully!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
            }
            catch(AppwriteException){
                console.log(AppwriteException)
                toast({
                    title: "Error updating avatar",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            }
        }, function (error) {
            console.log(error);
            toast({
                title: "Error updating avatar",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        });
    }
    const handleLinks = () => {
        
        let links = `{"github":"${github}","twitter":"${twitter}","linkedin":"${linkedin}","instagram":"${instagram}","youtube":"${youtube}"}`
        const updatedLinks = {"links": links}
        try{
            setProfile(databases.updateDocument(DATABASE_ID, COLLECTION_ID, profile.$id, updatedLinks))
            toast({
                title: "Links updated successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
        catch(AppwriteException){
            console.log(AppwriteException)
            toast({
                title: "Error updating links",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }
    const handleIdentity = () => {
        const updatedIdentity = {"identity": identity}
        try{
            setProfile(databases.updateDocument(DATABASE_ID, COLLECTION_ID, profile.$id, updatedIdentity))
            toast({
                title: "Identity updated successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
        catch(AppwriteException){
            console.log(AppwriteException)
            toast({
                title: "Error updating identity",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }
    const handlePersonal = () => {
        if (profile.bio !== bio){
            const updatedBio = {"bio": bio}
            try{
                setProfile(databases.updateDocument(DATABASE_ID, COLLECTION_ID, profile.$id, updatedBio))
                toast({
                    title: "Bio updated successfully!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
            }
            catch(AppwriteException){
                console.log(AppwriteException)
                toast({
                    title: "Error updating bio",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            }
        }

        if (profile.skills.join(',') !== skills){
            const skillsArray = skills.split(',')  
            const updatedSkills = {"skills": skillsArray}
            try{
                setProfile(databases.updateDocument(DATABASE_ID, COLLECTION_ID, profile.$id, updatedSkills))
                toast({
                    title: "Skills updated successfully!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
            }
            catch(AppwriteException){
                console.log(AppwriteException)
                toast({
                    title: "Error updating skills",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            }
        }
        
    }

    return(
        <Box
            mx="auto"
            p={10}
            borderRadius="md"
            boxShadow="md"
            bg="rgba(255, 255, 255, 0.75)"
            style={{ backdropFilter: 'blur(10px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)' }}
        >
        <div style={{display:"flex", height:"70vh"}}>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:'20px', marginRight:"100px"}}>
                <Avatar size="2xl" name={currentUser?.name} src={avatar} />
                <Input mt={3} type="file" ref={avatarRef} onChange={handleAvatar}/>
                <chakra.h1 fontSize="4xl" fontWeight="bold" textAlign="center" color="purple.600">
                {currentUser?.name.toUpperCase()}
                </chakra.h1>
                <i>{currentUser?.email}</i>
            </div>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", flex:1, padding:'20px'}}>
                <Accordion allowToggle shadow={'lg'} defaultValue={'1'}>
                    <AccordionItem borderTop={0} value='1'>
                    <h2>
                    <AccordionButton _expanded={{ bg: 'purple.600', color: 'white' }}>
                        <Box as="span" flex='1' textAlign='left' width={'2xl'}>
                        Social Links
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    <InputGroup w={'2xl'} mb={3}>
                        <InputLeftElement pointerEvents='none'>
                        <AiFillGithub color='black' fontSize={'25px'}/>
                        </InputLeftElement>
                        <Input borderWidth={'thin'}
                        _hover={{borderColor: 'black'}}
                        borderColor={'purple.600'} focusBorderColor="black" type='url' placeholder='github' onChange={(e) => setGithub(e.target.value)} value={github}/>
                    </InputGroup>
                    <InputGroup w={'2xl'} mb={3}>
                        <InputLeftElement pointerEvents='none'>
                        <chakra.span color={'blue.400'}>
                        <AiFillTwitterCircle fontSize={'25px'}/>
                        </chakra.span>
                        </InputLeftElement>
                        <Input borderWidth={'thin'}
                        _hover={{borderColor: 'blue.400'}} borderColor={'purple.600'} focusBorderColor="blue.400" type='url' placeholder="twitter" value={twitter} onChange={(e) => setTwitter(e.target.value)}/>
                    </InputGroup>
                    <InputGroup w={'2xl'} mb={3}>
                        <InputLeftElement pointerEvents='none'>
                        <chakra.span color={'blue.600'}>
                        <AiFillLinkedin fontSize={'25px'}/>
                        </chakra.span>
                        </InputLeftElement>
                        <Input borderWidth={'thin'}
                        _hover={{borderColor: 'blue.600'}}
                        borderColor={'purple.600'} focusBorderColor="blue.600" type='url' placeholder='linkedin' onChange={(e) => setLinkedin(e.target.value)} value={linkedin}/>
                    </InputGroup>
                    <InputGroup w={'2xl'} mb={3}>
                        <InputLeftElement pointerEvents='none'>
                        <chakra.span color={'pink.400'}>
                        <AiFillInstagram fontSize={'25px'}/>
                        </chakra.span>
                        </InputLeftElement>
                        <Input borderWidth={'thin'}
                        _hover={{borderColor: 'pink.400'}}
                        borderColor={'purple.600'} focusBorderColor="pink.400" type='url' placeholder='instagram' onChange={(e) => setInstagram(e.target.value)} value={instagram}/>
                    </InputGroup>
                    <InputGroup w={'2xl'} mb={3}>
                        <InputLeftElement pointerEvents='none'>
                        <AiFillYoutube color="red" fontSize={'25px'}/>
                        </InputLeftElement>
                        <Input borderWidth={'thin'} 
                        _hover={{borderColor: 'red'}}
                        borderColor={'purple.600'} focusBorderColor="red" type='url' placeholder='youtube' onChange={(e) => setYoutube(e.target.value)} value={youtube}/>
                    </InputGroup>
                    <Button onClick={handleLinks} background={'purple.600'} color={'white'} mt={'2'} _hover={{background: 'purple.700'}}>Save changes</Button>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem value='2'>
                    <h2>
                    <AccordionButton _expanded={{ bg: 'purple.600', color: 'white' }}>
                        <Box as="span" flex='1' textAlign='left' width={'2xl'}>
                        Identify as
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <RadioGroup onChange={setIdentity} value={identity} >
                        <Stack direction='column'>
                            <Radio value='Other'>Other</Radio>
                            <Radio value='Woman'>Woman</Radio>
                            <Radio value='Non-Binary'>Non-Binary</Radio>
                            <Radio value='Transgender'>Transgender</Radio>
                            <Radio value='Cisgender'>Cisgender</Radio>
                            <Radio value='Genderqueer'>Genderqueer</Radio>
                            <Radio value='Genderfluid'>Genderfluid</Radio>
                            <Radio value='Agender'>Agender</Radio>
                            <Radio value="Demigender">Demigender</Radio>
                        </Stack>
                        </RadioGroup>
                        <Button onClick={handleIdentity} background={'purple.600'} color={'white'} mt={'2'} _hover={{background: 'purple.700'}}>Save changes</Button>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem borderBottom={0} value='3'>
                    <h2>
                    <AccordionButton _expanded={{ bg: 'purple.600', color: 'white' }}>
                        <Box as="span" flex='1' textAlign='left' width={'2xl'}>
                        Personal Details
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <InputGroup w={'2xl'} mb={3}>
                            <InputLeftElement pointerEvents='none'>
                            <AiFillEdit color='gray' fontSize={'25px'}/>
                            </InputLeftElement>
                            <Input borderWidth={'thin'}
                            _hover={{borderColor: 'black'}}
                            borderColor={'purple.600'} focusBorderColor="black" type='text' placeholder='Bio' onChange={(e) => setBio(e.target.value)} value={bio}/>
                        </InputGroup>
                        <InputGroup w={'2xl'} mb={3}>
                            <InputLeftElement pointerEvents='none'>
                            <AiFillTool color='gray' fontSize={'25px'}/>
                            </InputLeftElement>
                            <Input borderWidth={'thin'}
                            _hover={{borderColor: 'black'}}
                            borderColor={'purple.600'} focusBorderColor="black" type='text' placeholder='Skills (separarted by commas)' onChange={(e) => setSkills(e.target.value)} value={skills}/>
                        </InputGroup>
                        <Button onClick={handlePersonal} background={'purple.600'} color={'white'} mt={'2'} _hover={{background: 'purple.700'}}>Save changes</Button>
                    </AccordionPanel>
                </AccordionItem>
                </Accordion>
            </div>
        </div>
        </Box>
    )
}