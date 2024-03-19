import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import get from "lodash/get";
import { Spinner } from "@chakra-ui/react";
import {
  setAccessToken,
  saveUserData,
  resetUserData,
} from "../../redux/slices/app";
import { jsonParseFromStorage } from "../../utils/helper";

const RequireAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(true);

  const token = jsonParseFromStorage("token");

  useEffect(() => {
    if (token) {
      initTokenDecode(token);
    } else {
      dispatch(resetUserData());
      setIsLoading(false);
      navigate("/login", { replace: true });
    }
  }, [token]);

  const initTokenDecode = (token) => {
    const decodeJWT = jwtDecode(token?.accessToken);
    if (decodeJWT) {
      const userData = {
        firstName: get(decodeJWT, ["firstName"], ""),
        lastName: get(decodeJWT, ["lastName"], ""),
      };
      dispatch(saveUserData(userData));
      dispatch(setAccessToken(token?.accessToken));
      setIsLoading(false);
      setIsReady(true);
    } else {
      setIsLoading(false);
      console.log("error at token decode");
    }
  };

  if (isLoading) {
    return (
      <div>
        <Spinner size="xl" color="blue.500" thickness="4px" speed="0.65s" />
      </div>
    );
  }

  if (!isLoading && isReady) {
    return <Outlet />;
  }

  return null;
};
export default RequireAuth;
