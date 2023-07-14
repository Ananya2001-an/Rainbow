import {
  Box,
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Image
} from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { account } from '../utils/appwrite';

export const ForgotPasswordConfirm = () => {
    const searchParams = new URLSearchParams(useLocation().search);
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');
    const navigate = useNavigate();  
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isResetSuccessful, setIsResetSuccessful] = useState(false);
    const [error, setError] = useState('');

    const handlePasswordReset = () => {
        if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
        }

        account.updateRecovery(
        userId,
        secret,
        password,
        password
        )
        .then((response) => {
            setIsResetSuccessful(true);
            setError('');
        })
        .catch((error) => {
            setIsResetSuccessful(false);
            setError('Failed to reset the password. Something went wrong.');
        });
    };

    const handleLogin = () => {
        navigate('/login')
    };

    return (
        <Box bgGradient="linear-gradient(90.7deg, rgb(255, 253, 218) 1.9%, rgb(246, 210, 255) 39.3%, rgb(152, 222, 254) 64.7%, rgb(251, 255, 210) 100.8%)" py={12} h="full" minHeight={'100vh'}>
        <Box
        maxW="xl"
        mx="auto"
        px={24}
        py={8}
        mt={12}
        borderRadius="md"
        boxShadow="md"
        bg="rgba(255, 255, 255, 0.75)"
        style={{ backdropFilter: 'blur(10px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)' }}
        color={'purple.600'}
        >
        <div style={{display:"flex", justifyContent:"center"}}>
            <Image src="/rainbow.png" alt="logo" h={'100px'} w={'100px'}/>
        </div>
        <chakra.h1 fontSize="4xl" mb={8} fontWeight="bold" textAlign="center">
            Password Reset
        </chakra.h1>
        {isResetSuccessful ? (
            <>
            <Text my={4} textAlign="center" color="purple.600">
                Password reset successfully! You can now log in using your new
                password.
            </Text>
            <Button
                background={'purple.600'}
                onClick={handleLogin}
                mb={4}
                w="full"
                fontSize="lg"
                borderRadius="md"
                fontWeight="bold"
                _hover={{ bg: 'purple.700' }}
                color={'white'}
            >
                Log In
            </Button>
            </>
        ) : (
            <>
            <FormControl id="password" mb={4}>
                <FormLabel>Password</FormLabel>
                <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                focusBorderColor='purple.600'
                color='black'
                />
            </FormControl>
            <FormControl id="confirmPassword" mb={6}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                focusBorderColor='purple.600'
                color='black'
                />
            </FormControl>
            {error && (
                <Text my={4} textAlign="center" color="red.500">
                {error}
                </Text>
            )}
            <Button
                background={'purple.600'}
                onClick={handlePasswordReset}
                mb={4}
                w="full"
                fontSize="lg"
                borderRadius="md"
                fontWeight="bold"
                _hover={{ bg: 'purple.700' }}
                color={'white'}
            >
                Reset Password
            </Button>
            </>
        )}
        </Box>
        </Box>
    );
};