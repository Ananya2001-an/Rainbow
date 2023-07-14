import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Text,
  Image
} from '@chakra-ui/react';
import { useState } from 'react';
const baseUrl = 'http://localhost:5173'
import { account } from '../utils/appwrite';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [error, setError] = useState('');

    const handlePasswordRecovery = async() => {
        const promise = account.createRecovery(
        email,
        `${baseUrl}/password_recovery_confirmation/`
        );

        promise
        .then((response) => {
            setIsEmailSent(true);
            setError('');
        })
        .catch((error) => {
            setIsEmailSent(false);
            setError(
            'Failed to send the password recovery email. Please try again.'
            );
        });
    };

    return (
        <Box bgGradient="linear-gradient(90.7deg, rgb(255, 253, 218) 1.9%, rgb(246, 210, 255) 39.3%, rgb(152, 222, 254) 64.7%, rgb(251, 255, 210) 100.8%)
        " py={12} h="full" minHeight={'100vh'}>
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
        color={"purple.600"}
        >
        <div style={{display:"flex", justifyContent:"center"}}>
            <Image src="/rainbow.png" alt="logo" h={'100px'} w={'100px'}/>
        </div>
        <chakra.h1 fontSize="4xl" mb={8} fontWeight="bold" textAlign="center">
            Password Recovery
        </chakra.h1>
        {isEmailSent ? (
            <Text my={4} textAlign="center" color={"purple.600"}>
            Password recovery email has been sent to your email address.
            </Text>
        ) : (
            <>
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
            {error && (
                <Text my={4} textAlign="center" color="red.500">
                {error}
                </Text>
            )}
            <Button
                background={"purple.600"}
                onClick={handlePasswordRecovery}
                mb={4}
                w="full"
                fontSize="lg"
                borderRadius="md"
                fontWeight="bold"
                _hover={{ bg: 'purple.700' }}
                color={'white'}
            >
                Recover Password
            </Button>
            </>
        )}
        </Box>
        </Box>
    );
};