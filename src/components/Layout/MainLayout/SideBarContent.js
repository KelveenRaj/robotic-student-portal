import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Flex,
  CloseButton,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { FiHome, FiTrendingUp, FiCompass, FiStar } from "react-icons/fi";
import NavItem from "./NavItem";

const SidebarContent = ({ onClose, ...props }) => {
  const LinkItems = [
    { name: "Dashboard", icon: FiHome, path: "/dashboard" },
    { name: "Test", icon: FiTrendingUp, path: "/test" },
    { name: "Explore", icon: FiCompass, path: "/dashboard" },
    { name: "Past competitions", icon: FiStar, path: "/dashboard" },
  ];

  return (
    <Box
      transition="3s ease"
      bg={"#dde6ed"}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...props}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          color="#27374d"
        >
          Robotclub
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link, index) => (
        <NavItem key={index} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

SidebarContent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SidebarContent;
