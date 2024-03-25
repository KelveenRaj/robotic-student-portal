import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Field } from "formik";
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
  Link,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    center: "",
    nric: "",
    contact: "",
    race: "",
    personalEmail: "",
    moeEmail: "",
    school: "",
    nationality: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be at least 6 characters")
      .required("Password is required"),
    center: Yup.string().required("Center is required"),
    nric: Yup.string().required("My Kad / NRIC is required"),
    contact: Yup.string().required("Personal contact number is required"),
    race: Yup.string().required("Race is required"),
    personalEmail: Yup.string()
      .email("Invalid email address")
      .required("Personal Email is required"),
    moeEmail: Yup.string()
      .email("Invalid email address")
      .required("Moe Email is required"),
    school: Yup.string().required("School is required"),
    nationality: Yup.string().required("Nationality is required"),
  });

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <Box bg="white" p={6} rounded="md" w={80}>
      <Flex align="center" justify="center" p="10px">
        <Text fontSize="24px" fontWeight="500">
          Sign Up
        </Text>
      </Flex>

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isValid, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <VStack spacing={4} align="flex-start">
                <FormControl isInvalid={errors.email && touched.email} w="100%">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={errors.password && touched.password}
                  w="100%"
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      variant="filled"
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

                <FormControl isInvalid={errors.nric && touched.nric} w="100%">
                  <FormLabel htmlFor="nric">My Kad / NRIC</FormLabel>
                  <Field
                    as={Input}
                    id="nric"
                    name="nric"
                    type="number"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.nric}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={errors.contact && touched.contact}
                  w="100%"
                >
                  <FormLabel htmlFor="contact">
                    Personal Contact Number
                  </FormLabel>
                  <Field
                    as={Input}
                    id="contact"
                    name="contact"
                    type="number"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.contact}</FormErrorMessage>
                </FormControl>

                <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
                  <FormControl isInvalid={errors.race && touched.race} w="100%">
                    <FormLabel htmlFor="race">Race</FormLabel>
                    <Field
                      as={Select}
                      id="race"
                      name="race"
                      placeholder="Select"
                      variant="filled"
                    >
                      <option value="Malay">Malay</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Indian">Indian</option>
                      <option value="Others">Others</option>
                    </Field>
                    <FormErrorMessage>{errors.race}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={errors.nationality && touched.nationality}
                    w="100%"
                  >
                    <FormLabel htmlFor="nationality">Nationality</FormLabel>
                    <Field
                      as={Input}
                      id="nationality"
                      name="nationality"
                      type="text"
                      variant="filled"
                    />
                    <FormErrorMessage>{errors.nationality}</FormErrorMessage>
                  </FormControl>
                </Grid>
              </VStack>
            )}

            {step === 2 && (
              <VStack spacing={4} align="flex-start">
                <FormControl
                  isInvalid={errors.personalEmail && touched.personalEmail}
                  w="100%"
                >
                  <FormLabel htmlFor="personalEmail">Personal Email</FormLabel>
                  <Field
                    as={Input}
                    id="personalEmail"
                    name="personalEmail"
                    type="email"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.personalEmail}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={errors.moeEmail && touched.moeEmail}
                  w="100%"
                >
                  <FormLabel htmlFor="moeEmail">Moe Email</FormLabel>
                  <Field
                    as={Input}
                    id="moeEmail"
                    name="moeEmail"
                    type="email"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.moeEmail}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={errors.school && touched.school}
                  w="100%"
                >
                  <FormLabel htmlFor="school">School</FormLabel>
                  <Field
                    as={Input}
                    id="school"
                    name="school"
                    type="text"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.school}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={errors.center && touched.center}
                  w="100%"
                >
                  <FormLabel htmlFor="center">Centre</FormLabel>
                  <Field
                    as={Select}
                    id="center"
                    name="center"
                    placeholder="Select Centre"
                    variant="filled"
                  >
                    <option value="Kota Damansara">Kota Damansara</option>
                    <option value="Kulim">Kulim</option>
                    <option value="Johor">Johor</option>
                    <option value="test">test</option>
                  </Field>
                  <FormErrorMessage>{errors.center}</FormErrorMessage>
                </FormControl>
              </VStack>
            )}

            <Flex justify="space-between" mt={4}>
              {step !== 1 && (
                <Button
                  onClick={handlePrevStep}
                  colorScheme="gray"
                  variant="outline"
                >
                  Previous
                </Button>
              )}
              {step === 1 && (
                <Button onClick={handleNextStep} colorScheme="blue">
                  Next
                </Button>
              )}
              {step !== 1 && (
                <Button
                  type="submit"
                  colorScheme="green"
                  display={isValid ? "block" : "none"}
                >
                  Register
                </Button>
              )}
            </Flex>

            <Flex justifyContent="center" w="100%" mt={"20px"}>
              <Text>
                Already a user?{" "}
                <Link href="/login" color={"red"}>
                  Log-In Now
                </Link>
              </Text>
            </Flex>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default SignUpPage;
