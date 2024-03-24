import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SteamCupLogo from "../../assets/images/STEAM Cup+.png";
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
  Alert,
  AlertIcon,
  Image,
  Spinner,
  InputGroup,
  InputRightElement,
  Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik, Field } from "formik";
import { setAccessToken } from "../../redux/slices/app";
import { authenticate } from "../../services/awsAuth";
import userpool from "../../utils/userpool";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // If got active user, navigate to dashboard
  useEffect(() => {
    const user = userpool.getCurrentUser();
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = ({ email, password }) => {
    setError(null);
    setLoading(true);
    authenticate(email, password)
      .then((data) => {
        dispatch(setAccessToken(data));
        navigate("/dashboard");
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box bg="white" p={6} rounded="md" w={80} alignItems="center">
      <Flex align="center" justify="center" p="10px">
        <Image src={SteamCupLogo} alt="SteamCup Logo" width={36} />
      </Flex>
      <Flex align="center" justify="center" p="10px">
        <Text fontSize="24px" fontWeight="500">
          Login
        </Text>
      </Flex>
      {error && (
        <Alert marginBottom={5} status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => handleLogin(values)}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl isInvalid={!!errors.email && touched.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  variant="filled"
                  validate={(value) => {
                    if (!value) {
                      return "Email is required";
                    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                      return "Invalid email address";
                    }
                  }}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password && touched.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    variant="filled"
                    validate={(value) => {
                      if (value.length < 6) {
                        return "Password should be over 6 characters.";
                      }
                    }}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="blue" w="full">
                {loading ? <Spinner size="sm" color="white" /> : "Login"}
              </Button>
              <Flex justifyContent="center" w="100%" mt={"5px"}>
                <Link href="/forgot-password" color={"blue.500"}>
                  Forget Password?
                </Link>
              </Flex>
              <Flex justifyContent="center" w="100%" mt={"5px"}>
                <Text>
                  New user?{" "}
                  <Link href="/sign-up" color={"red"}>
                    Sign Up Now
                  </Link>
                </Text>
              </Flex>
            </VStack>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginPage;
