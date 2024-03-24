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
  Grid,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";

const SignUpPage = () => {
  return (
    <Box bg="white" p={6} rounded="md">
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
              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
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
              </Grid>

              <FormControl
                isInvalid={!!errors.password && touched.password}
                w="100%"
              >
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
              <FormControl w="100%">
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
            </VStack>
            <Button type="submit" colorScheme="green" w="full">
              Register
            </Button>
            <Text mt={2}>
              Already a user?{" "}
              <a href="/login" style={{ color: "red" }}>
                Log-In Now
              </a>
            </Text>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default SignUpPage;
