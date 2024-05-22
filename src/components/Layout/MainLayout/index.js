import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useGetUserDataQuery } from "../../../redux/slices/app/api";
import { saveUserData } from "../../../redux/slices/app";
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
} from "@chakra-ui/react";
import SidebarContent from "./SideBarContent";
import MobileNav from "./MobileNavItem";
import MaintenanceAlert from "../../MaintenanceALert";
import AnimatedPage from "../../AnimatedPage";
import Spin from "../../Spin";
import userpool from "../../../utils/userpool";

const Layout = ({ children, isLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading: isUserLoading, isError } = useGetUserDataQuery();

  useEffect(() => {
    if (!isUserLoading && !isError && data) {
      if (data?.data?.status === "rejected") {
        const user = userpool.getCurrentUser();
        if (user) {
          user.getSession((err, session) => {
            if (!err && session) {
              user.deleteUser((deleteErr, result) => {
                if (deleteErr) {
                  console.error("Error deleting user:", deleteErr);
                } else {
                  console.log("Successfully deleted user:", result);
                  navigate("/login", { replace: true });
                }
              });
            }
          });
        }
      }
      dispatch(saveUserData(data?.data));
    } else if (isError) {
      onLogout();
    }
  }, [data, isLoading, isError, dispatch]);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const onLogout = () => {
    navigate("/logout");
  };

  const onClickProfile = () => {
    navigate("/profile");
  };

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav
        onOpen={onOpen}
        onLogout={onLogout}
        onClickProfile={onClickProfile}
      />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {isLoading ? (
          <Spin />
        ) : (
          <AnimatedPage>
            <MaintenanceAlert />
            {children}
          </AnimatedPage>
        )}
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  isLoading: PropTypes.bool,
};

Layout.defaultProps = {
  isLoading: false,
};

export default Layout;
