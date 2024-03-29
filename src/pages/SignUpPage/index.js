import React, { useState } from "react";
import NodeRSA from "node-rsa";
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
import {
  useGetActiveCentresQuery,
  useStudentSignUpMutation,
} from "../../redux/slices/app/api";
import { generatePublicKey } from "../../services/auth";
import { formatDate } from "../../utils/helper";
import { signUpSchema } from "../../utils/validationSchema";

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const { data: activeCentres } = useGetActiveCentresQuery();
  const [studentSignUp, { data: signUpData, error: signUpError }] =
    useStudentSignUpMutation();

  const initialValues = {
    fullName: "",
    dob: "",
    gender: "",
    email: "",
    password: "",
    center: "",
    nric: "",
    contact: "",
    race: "",
    personalEmail: "", //TODO: Remove field completely
    moeEmail: "",
    school: "",
    nationality: "",
    parentName: "",
    relationship: "",
    parentEmail: "",
    parentContact: "",
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const performRSAEncryption = async (publicKey, payload) => {
    try {
      const key = new NodeRSA(publicKey);
      const encryptedPassword = key.encrypt(payload, "base64");
      return encryptedPassword;
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  const handleSignUp = async (values) => {
    try {
      const publicKey = await generatePublicKey();
      const encryptedPassword = await performRSAEncryption(
        publicKey,
        values.password
      );

      const updatedDOB = formatDate(values.dob);
      const updatedValues = {
        ...values,
        password: encryptedPassword,
        dob: updatedDOB,
      };

      await studentSignUp(updatedValues);

      if (signUpError) {
        console.error("Error during sign up:", signUpError);
        return;
      }

      console.log("Sign up response:", signUpData);
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <Box bg="white" p={6} rounded="md" w={80}>
      <Flex align="flex-start" mb={"10px"}>
        <Text fontSize="20px" fontWeight="700">
          STEAMCup+ Membership
        </Text>
      </Flex>

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSignUp(values);
        }}
        validationSchema={signUpSchema}
      >
        {({ handleSubmit, isValid, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <VStack spacing={4} align="flex-start">
                <Text fontSize="16px" fontWeight="700">
                  Parent&apos;s Detail
                  <Text fontSize="14px" fontWeight="500">
                    STEAM Cup+ Membership is designed for students below 18
                    years old, therefore we kindly request the necessary
                    information of the parent or legal guardian. Your
                    cooperation in providing this information is greatly
                    appreciated.
                  </Text>
                </Text>

                <FormControl
                  isInvalid={errors.parentName && touched.parentName}
                  w="100%"
                >
                  <FormLabel htmlFor="parentName">Name</FormLabel>
                  <Field
                    as={Input}
                    id="parentName"
                    name="parentName"
                    type="text"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.parentName}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={errors.relationship && touched.relationship}
                  w="100%"
                >
                  <FormLabel htmlFor="relationship">
                    Relationship to student
                  </FormLabel>
                  <Field
                    as={Select}
                    id="relationship"
                    name="relationship"
                    placeholder="Select relationship"
                    variant="filled"
                  >
                    <option value="father">Father</option>
                    <option value="mother">Mother</option>
                    <option value="others">Legal Guardian</option>
                  </Field>
                  <FormErrorMessage>{errors.relationship}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={errors.parentEmail && touched.parentEmail}
                  w="100%"
                >
                  <FormLabel htmlFor="parentEmail">Email</FormLabel>
                  <Field
                    as={Input}
                    id="parentEmail"
                    name="parentEmail"
                    type="email"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.parentEmail}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={errors.parentContact && touched.parentContact}
                  w="100%"
                >
                  <FormLabel htmlFor="parentContact">Contact Number</FormLabel>
                  <Field
                    as={Input}
                    id="parentContact"
                    name="parentContact"
                    type="text"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.parentContact}</FormErrorMessage>
                </FormControl>
              </VStack>
            )}

            {step === 2 && (
              <VStack spacing={4} align="flex-start">
                <Text fontSize="16px" fontWeight="700">
                  Student Detail&apos;s
                </Text>

                <FormControl
                  isInvalid={errors.fullName && touched.fullName}
                  w="100%"
                >
                  <FormLabel htmlFor="fullName">
                    Full Name as per NRIC
                  </FormLabel>
                  <Field
                    as={Input}
                    id="fullName"
                    name="fullName"
                    type="text"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                </FormControl>

                <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
                  <FormControl
                    isInvalid={errors.gender && touched.gender}
                    w="100%"
                  >
                    <FormLabel htmlFor="gender">Gender</FormLabel>
                    <Field
                      as={Select}
                      id="gender"
                      name="gender"
                      placeholder="Select"
                      variant="filled"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Field>
                    <FormErrorMessage>{errors.gender}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.dob && touched.dob} w="100%">
                    <FormLabel htmlFor="dob">Date of Birth</FormLabel>
                    <Field
                      as={Input}
                      id="dob"
                      name="dob"
                      type="date"
                      variant="filled"
                    />
                    <FormErrorMessage>{errors.dob}</FormErrorMessage>
                  </FormControl>
                </Grid>

                <FormControl isInvalid={errors.nric && touched.nric} w="100%">
                  <FormLabel htmlFor="nric">My Kad / NRIC / Passport</FormLabel>
                  <Field
                    as={Input}
                    id="nric"
                    name="nric"
                    type="text"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.nric}</FormErrorMessage>
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
                    type="text"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.contact}</FormErrorMessage>
                </FormControl>
              </VStack>
            )}

            {step === 3 && (
              <VStack spacing={4} align="flex-start">
                <Text fontSize="16px" fontWeight="700">
                  Student Detail&apos;s
                </Text>

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
                    {activeCentres &&
                      activeCentres.data.map((center) => (
                        <option key={center.id} value={center.id}>
                          {center.name}
                        </option>
                      ))}
                  </Field>
                  <FormErrorMessage>{errors.center}</FormErrorMessage>
                </FormControl>
              </VStack>
            )}

            <Flex justify="space-between" mt={4}>
              {step === 1 && (
                <Button onClick={handleNextStep} colorScheme="blue">
                  Next
                </Button>
              )}
              {step === 2 && (
                <>
                  <Button onClick={handlePrevStep} colorScheme="gray">
                    Previous
                  </Button>
                  <Button onClick={handleNextStep} colorScheme="blue">
                    Next
                  </Button>
                </>
              )}
              {step === 3 && (
                <>
                  <Button onClick={handlePrevStep} colorScheme="gray">
                    Previous
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="green"
                    display={isValid ? "block" : "none"}
                  >
                    Register
                  </Button>
                </>
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
