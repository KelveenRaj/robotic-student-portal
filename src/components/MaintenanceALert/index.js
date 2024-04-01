import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { makeSelectUserStatus } from "../../redux/slices/app/selector";
import {
  Box,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";
import { PENDING_STATUS_MAP } from "../../utils/constants";

const MaintenanceAlert = () => {
  const status = useSelector(makeSelectUserStatus());

  const isPending = Object.values(PENDING_STATUS_MAP).includes(status);

  return (
    <Fragment>
      {isPending ? (
        <Alert status="warning" marginBottom={"8px"}>
          <AlertIcon />
          <Box>
            <AlertTitle>Your account is pending verification!</AlertTitle>
            <AlertDescription>
              Access to some features may be limited. Thank you for your
              patience.
            </AlertDescription>
          </Box>
        </Alert>
      ) : null}
    </Fragment>
  );
};

export default MaintenanceAlert;
