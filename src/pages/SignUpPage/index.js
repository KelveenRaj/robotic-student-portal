import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  VStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";

const SignUpPage = () => {
  return (
    <Box bg="white" p={6} rounded="md" w={80}>
      <Flex align="center" justify="center" p="10px">
        <Text fontSize="24px" fontWeight="500">
          Sign Up
        </Text>
      </Flex>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          centre: "",
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  type="name"
                  variant="filled"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
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
              <FormControl>
                <FormLabel htmlFor="centre">Centre</FormLabel>
                <Field
                  as={Select}
                  id="centre"
                  name="centre"
                  placeholder="Select Centre"
                  variant="filled"
                >
                  <option value="Kota Damansara">Kota Damansara</option>
                  <option value="Kulim">Kulim</option>
                  <option value="Johor">Johor</option>
                </Field>
              </FormControl>
              <Button type="submit" colorScheme="green" w="full">
                Register
              </Button>
              <span>
                Already a user?{" "}
                <a href="/login" style={{ color: "red" }}>
                  Log-In Now
                </a>
              </span>
            </VStack>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default SignUpPage;
