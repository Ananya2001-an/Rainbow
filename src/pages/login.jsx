import {
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  Image
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/authContext"
import { account } from '../utils/appwrite';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        account.deleteSession('current');
    }, []);

    const handleSignin = () => {
        login(email, password);
    };

    return (
        <Box bgGradient="linear-gradient(90.7deg, rgb(255, 253, 218) 1.9%, rgb(246, 210, 255) 39.3%, rgb(152, 222, 254) 64.7%, rgb(251, 255, 210) 100.8%)
        " py={12} h="full">
        <Box
            maxW="xl"
            mx="auto"
            px={24}
            py={8}
            borderRadius="md"
            boxShadow="md"
            bg="rgba(255, 255, 255, 0.75)"
            style={{ backdropFilter: 'blur(10px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)' }}
        >
            <div style={{display:"flex", justifyContent:"center"}}>
                <Image src="/rainbow.png" alt="logo" h={'100px'} w={'100px'}/>
            </div>
            <chakra.h1 fontSize="4xl" mb={8} fontWeight="bold" textAlign="center" color="purple.600">
            Login to Rainbow
            </chakra.h1>
            {/* <Button
            colorScheme="transparent"
            mb={4}
            w="full"
            fontSize="lg"
            borderRadius="md"
            color="green.500"
            borderWidth={2}
            isLoading={githubLoading}
            borderColor="green.500"
            onClick={handleGithubSignIn}
            >
            <FaGithub style={{ marginRight: '0.5em' }} />
            Continue With Github
            </Button> */}
            <Flex align="center" justify="center" my={4}>
            <Divider flex="1" bgColor="gray.300" />
            {/* <Text mx={2} color="gray.300" fontWeight="bold" fontSize="sm">
                or
            </Text> */}
            <Divider flex="1" bgColor="gray.300" />
            </Flex>
            <FormControl id="email" mb={4}>
            <FormLabel color="purple.600">Email address</FormLabel>
            <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                focusBorderColor='purple.600'
            />
            </FormControl>
            <FormControl id="password" mb={6}>
            <FormLabel color="purple.600">Password</FormLabel>
            <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                focusBorderColor='purple.600'
            />
            </FormControl>
            {error && (
            <Text my={4} textAlign="center" color="red.500">
                {error}
            </Text>
            )}
            <Button
            background={'purple.600'}
            onClick={handleSignin}
            mb={4}
            //   isLoading={loading}
            w="full"
            fontSize="lg"
            borderRadius="md"
            fontWeight="bold"
            _hover={{ bg: 'purple.700' }}
            color={'white'}
            >
            Log In
            </Button>
            <a href="/forgotpassword">
            <Button
                variant="link"
                colorScheme="white"
                _hover={{ color: 'purple.600' }}
                w="full"
                my={8}
            >
                Forgot your password?
            </Button>
            </a>
            <Divider bgColor="gray.300" />
            <HStack spacing={2} my={8} justifyContent="center">
            <Text color="gray.300">Don&apos;t have an account?</Text>
            <a href="/signup">
                <Button variant="link" color={'purple.600'}>
                Sign Up
                </Button>
            </a>
            </HStack>
        </Box>
        </Box>
  );
};
