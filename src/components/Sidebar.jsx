import {
  Box,
  chakra,
  Button,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout, AiFillHome, AiFillWechat, AiOutlineProfile } from 'react-icons/ai';

export const Sidebar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
    }
  return (
      <Box
        p={4}
        as="nav"
        minHeight={'100vh'}
        w="fit-content"
        bg="rgba(255, 255, 255, 0.75)"
        style={{ backdropFilter: 'blur(10px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)' }}
        color={'purple.600'}
      >
        <VStack spacing={8} align="start" w="100%">
          <button onClick={() => navigate('/')} mb={4}>
            <Text fontSize="2xl" fontWeight="bold" color="purple.600" style={{display:'flex', justifyContent:"space-between", alignItems:"center"}}>
              Rainbow
              <Image w='10' h='10' marginLeft={'3'} src="/rainbow.png" alt="logo" />
            </Text>
          </button>
          <Button
             onClick={() => navigate('/')}
            _hover={{ color: 'purple.700' }}
             color={'purple.600'}
             _focus={{ bg: 'purple.200', color: 'purple.800' }}
             background={'none'}
          >
            <HStack spacing={4} alignItems="center" w="100%">
              <AiFillHome size={24} />
              <chakra.span>Explore</chakra.span>
            </HStack>
          </Button>
          <Button
              onClick={() => navigate(`/profile/${currentUser.$id}`)}
              _hover={{ color: 'purple.700' }}
              color={'purple.600'}
              _focus={{ bg: 'purple.200', color: 'purple.800' }}
              background={'none'}
          >
            <HStack spacing={4} alignItems="center" w="100%">
                <AiOutlineProfile size={24} />
              <chakra.span>Profile</chakra.span>
            </HStack>
          </Button>
          <Button
              onClick={() => navigate('/')}
              _hover={{ color: 'purple.700' }}
              color={'purple.600'}
              _focus={{ bg: 'purple.200', color: 'purple.800' }}
              background={'none'}
          >
            <HStack spacing={4} alignItems="center" w="100%">
                <AiFillWechat size={24} />
              <chakra.span>Chats</chakra.span>
            </HStack>
          </Button>
          <Button
            onClick={() => handleLogout()}
            _hover={{ color: 'purple.700' }}
            color={'purple.600'}
            background={'none'}
          >
            <HStack spacing={4} alignItems="center" w="100%">
                <AiOutlineLogout size={24} />
              <chakra.span>Logout</chakra.span>
            </HStack>
          </Button>
        </VStack>
      </Box>
  );
}
