import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Flex, Spinner } from "@chakra-ui/react";
import { setAccessToken } from "../../redux/slices/app";
import userpool from "../../utils/userpool";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = userpool.getCurrentUser();
    if (!user) {
      setIsLoading(false);
      navigate("/login", { replace: true });
    } else {
      user.getSession((err, session) => {
        if (err) {
          setIsLoading(false);
          navigate("/login", { replace: true });
        } else {
          const token = session.getAccessToken().getJwtToken();
          dispatch(setAccessToken(token));
          setIsLoading(false);
          setIsReady(true);
        }
      });
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <Flex height="100vh" justifyContent="center" alignItems="center">
        <Spinner size="xl" color="blue.500" thickness="4px" speed="0.65s" />
      </Flex>
    );
  }

  if (!isLoading && isReady) {
    return <Outlet />;
  }

  return null;
};
export default PrivateRoute;
