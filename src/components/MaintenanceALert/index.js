import React from "react";
import {
  Box,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";

const MaintenanceAlert = () => {
  return (
    <Alert status="warning">
      <AlertIcon />
      <Box>
        <AlertTitle>Your account is pending verification!</AlertTitle>
        <AlertDescription>
          Access to some features may be limited. Thank you for your patience.
        </AlertDescription>
      </Box>
    </Alert>
  );
};

export default MaintenanceAlert;
