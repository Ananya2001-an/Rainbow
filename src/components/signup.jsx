import {
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
// import { FaGithub } from 'react-icons/fa';
// import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../contexts/authContext';

export const SignUp = () => {
    const {signup} = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    // const { showNotification } = useNotification();

    const handleSignup = () => {
        signup(email, password, username);
    };

    return (
        <Box bgGradient="linear-gradient(90.7deg, rgb(255, 253, 218) 1.9%, rgb(246, 210, 255) 39.3%, rgb(152, 222, 254) 64.7%, rgb(251, 255, 210) 100.8%)" py={12} h="full">
        <Box
        maxW="xl"
        mx="auto"
        my={12}
        px={24}
        py={8}
        borderRadius="md"
        boxShadow="md"
        bg="rgba(255, 255, 255, 0.75)"
        style={{ backdropFilter: 'blur(10px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)' }}
        color={'purple.600'}
        >
            <chakra.h1 fontSize="4xl" mb={8} fontWeight="bold" textAlign="center">
            Sign Up
            </chakra.h1>
            {/* <Button
            mb={4}
            w="full"
            fontSize="lg"
            borderRadius="md"
            borderWidth={2}
            onClick={handleGithubSignup}
            >
            <FaGithub style={{ marginRight: '0.5em' }} />
            Sign up with Github
            </Button> */}
            <Flex align="center" justify="center" my={4}>
            <Divider flex="1" />
            {/* <Text mx={2} fontWeight="bold" fontSize="sm">
                or
            </Text> */}
            <Divider flex="1" />
            </Flex>

            <FormControl id="email" mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="on"
                focusBorderColor="purple.600"
                color="black"
            />
            </FormControl>

            <FormControl id="password" mb={6}>
            <FormLabel>Password</FormLabel>
            <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="on"
                focusBorderColor="purple.600"
                color="black"
            />
            </FormControl>

            <FormControl id="username" mb={6}>
            <FormLabel>Username</FormLabel>
            <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="on"
                focusBorderColor="purple.600"
                color="black"
            />
            </FormControl>

            <Button
            background={'purple.600'}
            onClick={handleSignup}
            mb={4}
            w="full"
            fontSize="lg"
            borderRadius="md"
            fontWeight="bold"
            _hover={{ bg: 'purple.700' }}
            color={'white'}
            >
            Sign Up
            </Button>
            {error && (
            <Text my={4} textAlign="center" color="red.500">
                {error}
            </Text>
            )}
            <Stack direction="row" spacing={2} my={8} justifyContent="center">
            <Text color="gray.500">Already have an account?</Text>
            <a href="/login">
                <Button variant="link" colorScheme="white">
                Log in
                </Button>
            </a>
            </Stack>
        </Box>
        </Box>
    );
};
