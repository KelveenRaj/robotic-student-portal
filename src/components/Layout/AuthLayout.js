import React from "react";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

const AuthLayout = () => {
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Outlet />
    </Flex>
  );
};

export default AuthLayout;
