import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { useDispatch } from "react-redux";
import { jsonParseFromStorage } from "../../utils/helper";
import { useLoginMutation } from "../../redux/slices/app/api";
import { setAccessToken } from "../../redux/slices/app";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [token, setToken] = useState({});
  const authToken = jsonParseFromStorage("token");

  const [login, { isLoading }] = useLoginMutation();

  // if localStrage contains token on mount
  useEffect(() => {
    if (authToken?.accessToken !== undefined) {
      navigate("/dashboard");
    }
  }, [authToken, navigate]);

  // if localStrage is empty on mount, and token is generated from handlelogin action
  useEffect(() => {
    if (token?.accessToken) {
      localStorage.setItem("token", JSON.stringify(token));
      dispatch(setAccessToken(token?.accessToken));
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleLogin = async ({ username, password }) => {
    try {
      const res = await login({ username, password }).unwrap();
      const { token } = res;
      setToken({ accessToken: token });
    } catch (err) {
      console.log(err?.data?.message || err.error);
    }
  };

  return (
    <Box bg="white" p={6} rounded="md" w={80} alignItems="center">
      <Flex align="center" justify="center" p="10px">
        {isLoading && <Spinner size="xl" color="blue.500" zIndex="9999" />}
        <Text fontSize="24px" fontWeight="500">
          Login
        </Text>
      </Flex>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values) => handleLogin(values)}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Field
                  as={Input}
                  id="username"
                  name="username"
                  type="text"
                  variant="filled"
                />
              </FormControl>
              <FormControl isInvalid={!!errors.password && touched.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                  variant="filled"
                  validate={(value) => {
                    if (value.length < 6) {
                      return "Password should be over 6 characters.";
                    }
                  }}
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="green" w="full">
                Login
              </Button>
              <span>
                New to RobotClub?{" "}
                <a href="/sign-up" style={{ color: "red" }}>
                  Sign Up Now
                </a>
              </span>
            </VStack>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginPage;
