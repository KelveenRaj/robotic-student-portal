import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Alert,
  AlertIcon,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useGetActiveCentresQuery } from "../../redux/slices/app/api";
import { generatePublicKey, signUp, verifyOtp } from "../../services/auth";
import { formatDate } from "../../utils/helper";
import { signUpSchema, verifySchema } from "../../utils/validationSchema";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [isVerify, setIsVerify] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: activeCentres } = useGetActiveCentresQuery();

  const initialValues = {
    fullName: "",
    dob: "",
    gender: "",
    email: "",
    password: "",
    center: "",
    nric: "",
    passport: "",
    contact: "",
    race: "",
    moeEmail: "",
    school: "",
    nationality: "",
    othersNationality: "",
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

  const performRSAEncryption = async (payload) => {
    try {
      const publicKey = await generatePublicKey();
      if (publicKey) {
        const key = new NodeRSA(publicKey);
        const encryptedPassword = key.encrypt(payload, "base64");
        return encryptedPassword;
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const handleSignUp = async (values) => {
    setError(null);
    setLoading(true);
    setSignUpEmail(values.email);
    try {
      const encryptedPassword = await performRSAEncryption(values.password);
      const updatedDOB = formatDate(values.dob);
      const updatedNationality =
        values.nationality === "malaysia"
          ? values.nationality
          : values.othersNationality;
      if (encryptedPassword) {
        const updatedValues = {
          ...values,
          password: encryptedPassword,
          dob: updatedDOB,
          nationality: updatedNationality,
        };
        const response = await signUp(updatedValues);
        console.log(response);
        if (response?.success) {
          setLoading(false);
          setIsVerify(true);
        }
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const handleVerify = async (values) => {
    setError(null);
    setLoading(true);
    try {
      const payload = {
        email: signUpEmail,
        code: values.code,
      };

      const response = await verifyOtp(payload);
      console.log(response);
      if (response?.success) {
        setLoading(false);
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return (
    <Box bg="white" p={6} rounded="md" w={80}>
      <Flex align="flex-start" mb={"10px"}>
        <Text fontSize="20px" fontWeight="700">
          STEAMCup+ Membership
        </Text>
      </Flex>

      {error && (
        <Alert marginBottom={5} status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      )}

      {isVerify ? (
        <Formik
          initialValues={{
            code: "",
          }}
          onSubmit={(values) => {
            handleVerify(values);
          }}
          validationSchema={verifySchema}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <Text fontSize="14px" fontWeight="500">
                  Enter the verification otp sent to your email.
                </Text>

                <FormControl isInvalid={errors.code && touched.code} w="100%">
                  <FormLabel htmlFor="code">Verification OTP</FormLabel>
                  <Field
                    as={Input}
                    id="code"
                    name="code"
                    type="text"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.code}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="blue" w="full">
                  {loading ? <Spinner size="sm" color="white" /> : "Submit"}
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            handleSignUp(values);
          }}
          validationSchema={signUpSchema}
        >
          {({ handleSubmit, isValid, errors, touched, values }) => (
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
                    <FormLabel htmlFor="parentName">
                      Name{" "}
                      <Text as="span" color="red">
                        *
                      </Text>
                    </FormLabel>
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
                      Relationship to student{" "}
                      <Text as="span" color="red">
                        *
                      </Text>
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
                    <FormLabel htmlFor="parentEmail">
                      Email{" "}
                      <Text as="span" color="red">
                        *
                      </Text>
                    </FormLabel>
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
                    <FormLabel htmlFor="parentContact">
                      Contact Number{" "}
                      <Text as="span" color="red">
                        *
                      </Text>
                    </FormLabel>
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
                      Full Name as per NRIC{" "}
                      <Text as="span" color="red">
                        *
                      </Text>
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

                  <FormControl
                    isInvalid={errors.nationality && touched.nationality}
                    w="100%"
                  >
                    <FormLabel htmlFor="nationality">
                      Nationality{" "}
                      <Text as="span" color="red">
                        *
                      </Text>
                    </FormLabel>
                    <Field
                      as={Select}
                      id="nationality"
                      name="nationality"
                      type="text"
                      variant="filled"
                      placeholder="Select nationality"
                    >
                      <option value="malaysia">Malaysian</option>
                      <option value="others">Others</option>
                    </Field>
                    <FormErrorMessage>{errors.nationality}</FormErrorMessage>
                  </FormControl>

                  {values.nationality === "others" && (
                    <FormControl
                      isInvalid={
                        errors.othersNationality && touched.othersNationality
                      }
                      w="100%"
                    >
                      <Field
                        as={Input}
                        id="othersNationality"
                        name="othersNationality"
                        type="text"
                        variant="filled"
                        placeholder="Please input your nationality"
                      />
                      <FormErrorMessage>
                        {errors.othersNationality}
                      </FormErrorMessage>
                    </FormControl>
                  )}

                  {values.nationality &&
                    (values.nationality === "malaysia" ? (
                      <FormControl
                        isInvalid={errors.nric && touched.nric}
                        w="100%"
                      >
                        <FormLabel htmlFor="nric">
                          My Kad / NRIC{" "}
                          <Text as="span" color="red">
                            *
                          </Text>
                        </FormLabel>
                        <Field
                          as={Input}
                          id="nric"
                          name="nric"
                          type="text"
                          variant="filled"
                        />
                        <FormErrorMessage>{errors.nric}</FormErrorMessage>
                      </FormControl>
                    ) : (
                      <FormControl
                        isInvalid={errors.passport && touched.passport}
                        w="100%"
                      >
                        <FormLabel htmlFor="passport">
                          Passport{" "}
                          <Text as="span" color="red">
                            *
                          </Text>
                        </FormLabel>
                        <Field
                          as={Input}
                          id="passport"
                          name="passport"
                          type="text"
                          variant="filled"
                        />
                        <FormErrorMessage>{errors.passport}</FormErrorMessage>
                      </FormControl>
                    ))}

                  <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
                    <FormControl
                      isInvalid={errors.race && touched.race}
                      w="100%"
                    >
                      <FormLabel htmlFor="race">
                        Race{" "}
                        <Text as="span" color="red">
                          *
                        </Text>
                      </FormLabel>
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
                      isInvalid={errors.gender && touched.gender}
                      w="100%"
                    >
                      <FormLabel htmlFor="gender">
                        Gender{" "}
                        <Text as="span" color="red">
                          *
                        </Text>
                      </FormLabel>
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
                  </Grid>

                  <FormControl isInvalid={errors.dob && touched.dob} w="100%">
                    <FormLabel htmlFor="dob">
                      Date of Birth{" "}
                      <Text as="span" color="red">
                        *
                      </Text>
                    </FormLabel>
                    <Field
                      as={Input}
                      id="dob"
                      name="dob"
                      type="date"
                      variant="filled"
                    />
                    <FormErrorMessage>{errors.dob}</FormErrorMessage>
                  </FormControl>
                </VStack>
              )}

              {step === 3 && (
                <VStack spacing={4} align="flex-start">
                  <Text fontSize="16px" fontWeight="700">
                    Student Detail&apos;s
                  </Text>

                  <FormControl
                    isInvalid={errors.school && touched.school}
                    w="100%"
                  >
                    <FormLabel htmlFor="school">
                      School{" "}
                      <Text as="span" color="red">
                        *
                      </Text>
                    </FormLabel>
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

                  <FormControl
                    isInvalid={errors.center && touched.center}
                    w="100%"
                  >
                    <FormLabel htmlFor="center">
                      Centre{" "}
                      <Text as="span" color="red">
                        *
                      </Text>
                    </FormLabel>
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

              {step === 4 && (
                <VStack spacing={4} align="flex-start">
                  <Text fontSize="16px" fontWeight="700">
                    Student Detail&apos;s
                    <Text fontSize="14px" fontWeight="500">
                      To finish setting up your account, please enter a valid
                      email address and password.
                    </Text>
                  </Text>

                  <FormControl
                    isInvalid={errors.email && touched.email}
                    w="100%"
                  >
                    <FormLabel
                      htmlFor="email"
                      display="flex"
                      alignItems="center"
                    >
                      Email{" "}
                      <Text as="span" color="red" ml="1">
                        *
                      </Text>
                    </FormLabel>
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
                    <FormLabel htmlFor="password">
                      Password{" "}
                      <Text as="span" color="red" ml="1">
                        *
                      </Text>
                    </FormLabel>
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
                    <Button onClick={handleNextStep} colorScheme="blue">
                      Next
                    </Button>
                  </>
                )}
                {step === 4 && (
                  <>
                    <Button onClick={handlePrevStep} colorScheme="gray">
                      Previous
                    </Button>
                    <Button
                      type="submit"
                      colorScheme="green"
                      display={isValid ? "block" : "none"}
                    >
                      {loading ? (
                        <Spinner size="sm" color="white" />
                      ) : (
                        "Register"
                      )}
                    </Button>
                  </>
                )}
              </Flex>
            </form>
          )}
        </Formik>
      )}
      <Flex justifyContent="center" w="100%" mt={"20px"}>
        <Text>
          Already a user?{" "}
          <Link href="/login" color={"red"}>
            Log-In Now
          </Link>
        </Text>
      </Flex>
    </Box>
  );
};

export default SignUpPage;
