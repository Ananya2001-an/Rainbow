import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import withAuth from "../utils/withAuth";
import { Button } from "@chakra-ui/react";

const Home = () => {
    const {currentUser} = useAuth();
    const {logout} = useAuth();
    const handleLogout = () => {
        logout();
    }
    
    return (
        <div>
        <h1>{currentUser.name}</h1>
        <Button colorScheme="blue" onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default withAuth(Home)
