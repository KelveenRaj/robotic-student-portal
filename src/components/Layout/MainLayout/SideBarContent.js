import React from "react";
import PropTypes from "prop-types";
import SteamCupLogoEdited from "../../../assets/images/STEAM Cup+edited.png";
import {
  Box,
  Flex,
  CloseButton,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { FiHome, FiCompass, FiStar } from "react-icons/fi";
import NavItem from "./NavItem";

const SidebarContent = ({ onClose, ...props }) => {
  const LinkItems = [
    { name: "Dashboard", icon: FiHome, path: "/dashboard" },
    { name: "Achievements", icon: FiStar, path: "/achievements" },
    { name: "Competitions", icon: FiCompass, path: "/competitions" },
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
        <Image src={SteamCupLogoEdited} alt="SteamCup Logo" maxH="12" />
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
