import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { Button, Box } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

const Home = () => {
    const {currentUser} = useAuth();

    return (
        <>
        {currentUser? 
        <Box bgGradient="linear-gradient(90.7deg, rgb(255, 253, 218) 1.9%, rgb(246, 210, 255) 39.3%, rgb(152, 222, 254) 64.7%, rgb(251, 255, 210) 100.8%)
        " minHeight={'100vh'}>
            <div style={{display:"flex"}}>
                <Sidebar />
                <div style={{display:"flex", justifyContent:"center", alignItems:"center", flex:1}}>
                    <Outlet />
                </div>
            </div>
        </Box>
        :
        <Navigate to="/login" />
        }
        </>
    );
}

export default Home
