import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NodeRSA from "node-rsa";
import { useFormik } from "formik";
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
  UnorderedList,
  ListItem,
  Checkbox,
  Stack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  generatePublicKey,
  signUp,
  verifyOtp,
  getCenter,
} from "../../services/auth";
import { formatDate } from "../../utils/helper";
import { signUpSchema, verifySchema } from "../../utils/validationSchema";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [isVerify, setIsVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeCentres, setActiveCentres] = useState(null);
  const fetchCenterOnMount = useRef(false);

  useEffect(() => {
    const fetchCenter = async () => {
      try {
        const centerData = await getCenter();
        setActiveCentres(centerData);
      } catch (error) {
        setError(error.message);
      }
    };

    if (!fetchCenterOnMount.current) {
      fetchCenter();
      fetchCenterOnMount.current = true;
    }
  }, []);

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

  const handleSignUp = async (values, actions) => {
    setError(null);
    setLoading(true);
    try {
      const encryptedPassword = await performRSAEncryption(values.password);
      const updatedDOB = formatDate(values.dob);
      const updatedNationality =
        values.othersNationality !== ""
          ? values.othersNationality
          : values.nationality;
      if (encryptedPassword) {
        const updatedValues = {
          ...values,
          password: encryptedPassword,
          dob: updatedDOB,
          nationality: updatedNationality,
        };
        const response = await signUp(updatedValues);
        if (response?.success) {
          setStudentId(response?.data?.id);
          setLoading(false);
          setIsVerify(true);
          actions.resetForm();
        }
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const handleVerify = async (values, actions) => {
    setError(null);
    setLoading(true);
    try {
      const payload = {
        id: studentId,
        code: values.code,
      };

      const response = await verifyOtp(payload);
      if (response?.success) {
        setLoading(false);
        actions.resetForm();
        navigate("/login");
        toast.success("Sign-Up Successful");
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const signUpFormik = useFormik({
    initialValues: {
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
      size: "",
      parentConsent: false,
    },
    validationSchema: signUpSchema,
    onSubmit: (values, actions) => {
      handleSignUp(values, actions);
    },
  });

  const verifyOTPFormik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: verifySchema,
    onSubmit: (values, actions) => {
      handleVerify(values, actions);
    },
  });

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
        <VStack
          as="form"
          mx="auto"
          w="100%"
          spacing={4}
          justifyContent="center"
          onSubmit={verifyOTPFormik.handleSubmit}
        >
          <Text fontSize="14px" fontWeight="500">
            Enter the verification otp sent to your email.
          </Text>
          <FormControl
            isInvalid={
              verifyOTPFormik.errors.code && verifyOTPFormik.touched.code
            }
          >
            <FormLabel>Verification OTP</FormLabel>
            <Input
              name="code"
              placeholder="6 digit OTP code"
              {...verifyOTPFormik.getFieldProps("code")}
            ></Input>
            <FormErrorMessage>{verifyOTPFormik.errors.code}</FormErrorMessage>
          </FormControl>

          <Flex>
            <Button type="submit" colorScheme="blue" w="full">
              {loading ? <Spinner size="sm" color="white" /> : "Submit"}
            </Button>
          </Flex>
        </VStack>
      ) : (
        <VStack
          as="form"
          mx="auto"
          w="100%"
          spacing={2}
          justifyContent="center"
          onSubmit={signUpFormik.handleSubmit}
          align="flex-start"
        >
          {step === 1 && ( //Parent Info
            <VStack spacing={4} align="flex-start" w="100%">
              <Text
                padding="10px"
                fontSize="16px"
                fontWeight="700"
                backgroundColor="lightblue"
                borderRadius="5px"
              >
                Parent&apos;s Detail
                <Text fontSize="14px" fontWeight="500">
                  STEAM Cup+ Membership is designed for students below 18 years
                  old, therefore we kindly request the necessary information of
                  the parent or legal guardian. Your cooperation in providing
                  this information is greatly appreciated.
                </Text>
              </Text>

              <FormControl
                isInvalid={
                  signUpFormik.errors.parentName &&
                  signUpFormik.touched.parentName
                }
                w="100%"
              >
                <FormLabel>
                  Name{" "}
                  <Text as="span" color="red">
                    *
                  </Text>
                </FormLabel>
                <Input
                  name="parentName"
                  placeholder="Parent Name"
                  {...signUpFormik.getFieldProps("parentName")}
                ></Input>
                <FormErrorMessage>
                  {signUpFormik.errors.parentName}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={
                  signUpFormik.errors.relationship &&
                  signUpFormik.touched.relationship
                }
                w="100%"
              >
                <FormLabel>
                  Relationship to student{" "}
                  <Text as="span" color="red">
                    *
                  </Text>
                </FormLabel>
                <Select
                  name="relationship"
                  placeholder="Select relationship"
                  {...signUpFormik.getFieldProps("relationship")}
                >
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="others">Legal Guardian</option>
                </Select>
                <FormErrorMessage>
                  {signUpFormik.errors.relationship}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={
                  signUpFormik.errors.parentEmail &&
                  signUpFormik.touched.parentEmail
                }
                w="100%"
              >
                <FormLabel>
                  Email{" "}
                  <Text as="span" color="red">
                    *
                  </Text>
                </FormLabel>
                <Input
                  name="parentEmail"
                  placeholder="Parent Email"
                  {...signUpFormik.getFieldProps("parentEmail")}
                ></Input>
                <FormErrorMessage>
                  {signUpFormik.errors.parentEmail}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={
                  signUpFormik.errors.parentContact &&
                  signUpFormik.touched.parentContact
                }
                w="100%"
              >
                <FormLabel>
                  Contact Number{" "}
                  <Text as="span" color="red">
                    *
                  </Text>
                </FormLabel>
                <Input
                  name="parentContact"
                  placeholder="Parent Contact"
                  {...signUpFormik.getFieldProps("parentContact")}
                ></Input>
                <FormErrorMessage>
                  {signUpFormik.errors.parentContact}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={
                  signUpFormik.errors.parentConsent &&
                  signUpFormik.touched.parentConsent
                }
                w="100%"
              >
                <FormLabel>
                  Parent Consent{" "}
                  <Text as="span" color="red">
                    *
                  </Text>
                  <Stack spacing={4}>
                    <Text fontSize="14px" fontWeight="500">
                      I hereby consent to my child participating in the STEAM
                      Cup + Membership in line with the STEAM Cup Malaysia
                      program. I confirm that all details are correct and I am
                      able to give parental consent for my child to participate
                      in all events carried out by STEAM Cup Malaysia, organized
                      by HongQin Sdn. Bhd.
                    </Text>
                    <Text fontSize="14px" fontWeight="500">
                      I acknowledge that STEAM Cup Malaysia is not responsible
                      for providing adult supervision for my child in all
                      events.
                    </Text>
                  </Stack>
                </FormLabel>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    name="parentConsent"
                    isChecked={signUpFormik.values.parentConsent}
                    onChange={signUpFormik.handleChange}
                  />
                  <Text marginLeft={4}>Yes</Text>
                </Box>
                <FormErrorMessage>
                  {signUpFormik.errors.parentConsent}
                </FormErrorMessage>
              </FormControl>
            </VStack>
          )}
          {step === 2 && (
            <VStack spacing={4} align="flex-start" w="100%">
              <Text
                padding="10px"
                fontSize="16px"
                fontWeight="700"
                backgroundColor="#F4BB44"
                borderRadius="5px"
                w={"100%"}
              >
                Student Detail&apos;s
                <Text fontSize="14px" fontWeight="500">
                  Please fill in all required fields below.
                </Text>
              </Text>

              <FormControl
                isInvalid={
                  signUpFormik.errors.fullName && signUpFormik.touched.fullName
                }
                w="100%"
              >
                <FormLabel>
                  Full Name as per NRIC{" "}
                  <Text as="span" color="red">
                    *
                  </Text>
                  <UnorderedList>
                    <ListItem fontSize="sm" color={"red"}>
                      This will be used in your certificates
                    </ListItem>
                  </UnorderedList>
                </FormLabel>
                <Input
                  name="fullName"
                  placeholder="Full Name as per NRIC"
                  {...signUpFormik.getFieldProps("fullName")}
                ></Input>
                <FormErrorMessage>
                  {signUpFormik.errors.fullName}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={
                  signUpFormik.errors.nationality &&
                  signUpFormik.touched.nationality
                }
                w="100%"
              >
                <FormLabel>
                  Nationality{" "}
                  <Text as="span" color="red">
                    *
                  </Text>
                </FormLabel>
                <Select
                  name="nationality"
                  placeholder="Select Nationality"
                  {...signUpFormik.getFieldProps("nationality")}
                >
                  <option value="malaysia">Malaysian</option>
                  <option value="others">Others</option>
                </Select>
                <FormErrorMessage>
                  {signUpFormik.errors.nationality}
                </FormErrorMessage>
              </FormControl>

              {signUpFormik.values.nationality === "others" && (
                <FormControl
                  isInvalid={
                    signUpFormik.errors.othersNationality &&
                    signUpFormik.touched.othersNationality
                  }
                  w="100%"
                >
                  <Input
                    name="othersNationality"
                    placeholder="Please input your nationality"
                    {...signUpFormik.getFieldProps("othersNationality")}
                  ></Input>
                  <FormErrorMessage>
                    {signUpFormik.errors.othersNationality}
                  </FormErrorMessage>
                </FormControl>
              )}

              {signUpFormik.values.nationality &&
                (signUpFormik.values.nationality === "malaysia" ? (
                  <FormControl
                    isInvalid={
                      signUpFormik.errors.nric && signUpFormik.touched.nric
                    }
                    w="100%"
                  >
                    <FormLabel>
                      My Kad / NRIC{" "}
                      <Text as="span" color="red">
                        *
                      </Text>
                    </FormLabel>
                    <Input
                      name="nric"
                      placeholder="My Kad / NRIC"
                      {...signUpFormik.getFieldProps("nric")}
                    ></Input>

                    <FormErrorMessage>
                      {signUpFormik.errors.nric}
                    </FormErrorMessage>
                  </FormControl>
                ) : (
                  <FormControl
                    isInvalid={
                      signUpFormik.errors.passport &&
                      signUpFormik.touched.passport
                    }
                    w="100%"
                  >
                    <FormLabel>
                      Passport{" "}
                      <Text as="span" color="red">
                        *
                      </Text>
                    </FormLabel>
                    <Input
                      name="passport"
                      placeholder="Passport"
                      {...signUpFormik.getFieldProps("passport")}
                    ></Input>
                    <FormErrorMessage>
                      {signUpFormik.errors.passport}
                    </FormErrorMessage>
                  </FormControl>
                ))}

              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
                <FormControl
                  isInvalid={
                    signUpFormik.errors.race && signUpFormik.touched.race
                  }
                  w="100%"
                >
                  <FormLabel>
                    Race{" "}
                    <Text as="span" color="red">
                      *
                    </Text>
                  </FormLabel>

                  <Select
                    name="race"
                    placeholder="Select"
                    {...signUpFormik.getFieldProps("race")}
                  >
                    <option value="Malay">Malay</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Indian">Indian</option>
                    <option value="Others">Others</option>
                  </Select>

                  <FormErrorMessage>
                    {signUpFormik.errors.race}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    signUpFormik.errors.gender && signUpFormik.touched.gender
                  }
                  w="100%"
                >
                  <FormLabel>
                    Gender{" "}
                    <Text as="span" color="red">
                      *
                    </Text>
                  </FormLabel>
                  <Select
                    name="gender"
                    placeholder="Select"
                    {...signUpFormik.getFieldProps("gender")}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Select>

                  <FormErrorMessage>
                    {signUpFormik.errors.gender}
                  </FormErrorMessage>
                </FormControl>
              </Grid>

              <FormControl
                isInvalid={signUpFormik.errors.dob && signUpFormik.touched.dob}
                w="100%"
              >
                <FormLabel>
                  Date of Birth{" "}
                  <Text as="span" color="red">
                    *
                  </Text>
                </FormLabel>
                <Input
                  type="date"
                  name="dob"
                  {...signUpFormik.getFieldProps("dob")}
                ></Input>

                <FormErrorMessage>{signUpFormik.errors.dob}</FormErrorMessage>
              </FormControl>
            </VStack>
          )}
          {step === 3 && (
            <VStack spacing={4} align="flex-start" w="100%">
              <Text
                padding="10px"
                fontSize="16px"
                fontWeight="700"
                backgroundColor="#F4BB44"
                borderRadius="5px"
                w={"100%"}
              >
                Student Detail&apos;s
                <Text fontSize="14px" fontWeight="500">
                  Please fill in all required fields below.
                </Text>
              </Text>

              <FormControl
                isInvalid={
                  signUpFormik.errors.school && signUpFormik.touched.school
                }
                w="100%"
              >
                <FormLabel>
                  School{" "}
                  <Text as="span" color="red">
                    *
                  </Text>
                </FormLabel>
                <Input
                  name="school"
                  placeholder="School Name"
                  {...signUpFormik.getFieldProps("school")}
                ></Input>

                <FormErrorMessage>
                  {signUpFormik.errors.school}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={
                  signUpFormik.errors.moeEmail && signUpFormik.touched.moeEmail
                }
                w="100%"
              >
                <FormLabel>Moe Email</FormLabel>
                <Input
                  name="moeEmail"
                  placeholder="MOE Email"
                  {...signUpFormik.getFieldProps("moeEmail")}
                ></Input>

                <FormErrorMessage>
                  {signUpFormik.errors.moeEmail}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={
                  signUpFormik.errors.contact && signUpFormik.touched.contact
                }
                w="100%"
              >
                <FormLabel>Personal Contact Number</FormLabel>
                <Input
                  name="contact"
                  placeholder="Student Contact"
                  {...signUpFormik.getFieldProps("contact")}
                ></Input>

                <FormErrorMessage>
                  {signUpFormik.errors.contact}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={
                  signUpFormik.errors.center && signUpFormik.touched.center
                }
                w="100%"
              >
                <FormLabel>
                  Centre{" "}
                  <Text as="span" color="red">
                    *
                  </Text>
                </FormLabel>
                <Select
                  name="center"
                  placeholder="Select Centre"
                  {...signUpFormik.getFieldProps("center")}
                >
                  {activeCentres &&
                    activeCentres?.data?.map((center) => (
                      <option key={center.id} value={center.id}>
                        {center.name}
                      </option>
                    ))}
                </Select>

                <FormErrorMessage>
                  {signUpFormik.errors.center}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={
                  signUpFormik.errors.size && signUpFormik.touched.size
                }
                w="100%"
              >
                <FormLabel>
                  T-Shirt Size{" "}
                  <Text as="span" color="red">
                    *
                  </Text>
                </FormLabel>
                <Select
                  name="size"
                  placeholder="Select Size"
                  {...signUpFormik.getFieldProps("size")}
                >
                  <option value="4XS">4XS</option>
                  <option value="3XS">3XS</option>
                  <option value="2XS">2XS</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </Select>

                <FormErrorMessage>{signUpFormik.errors.size}</FormErrorMessage>
              </FormControl>
            </VStack>
          )}
          {step === 4 && (
            <VStack spacing={4} align="flex-start" w="100%">
              <Text
                padding="10px "
                fontSize="16px"
                fontWeight="700"
                backgroundColor="#D6BCFA"
                borderRadius="5px"
              >
                Login Detail&apos;s
                <Text fontSize="14px" fontWeight="500">
                  To finish setting up your account, please enter a valid email
                  address and password to be used as your login credentials.
                </Text>
              </Text>

              <FormControl
                isInvalid={
                  signUpFormik.errors.email && signUpFormik.touched.email
                }
                w="100%"
              >
                <FormLabel display="flex" alignItems="center">
                  Email{" "}
                  <Text as="span" color="red" ml="1">
                    *
                  </Text>
                </FormLabel>
                <Input
                  name="email"
                  placeholder="Login Email"
                  {...signUpFormik.getFieldProps("email")}
                ></Input>

                <FormErrorMessage>{signUpFormik.errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={
                  signUpFormik.errors.password && signUpFormik.touched.password
                }
              >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    placeholder="Login Password"
                    {...signUpFormik.getFieldProps("password")}
                    style={{
                      WebkitTextSecurity: showPassword ? "none" : "disc", // Conditionally mask the text
                    }}
                  />
                  <InputRightElement>
                    <Button
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {signUpFormik.errors.password}
                </FormErrorMessage>
              </FormControl>
            </VStack>
          )}
          <Flex justify="space-between" mt={4} w="100%">
            {step === 1 && (
              <Button onClick={handleNextStep} colorScheme="blue">
                Next
              </Button>
            )}
            {step === 2 && (
              <Flex w="100%" justify="space-between">
                <Button onClick={handlePrevStep} colorScheme="gray">
                  Previous
                </Button>
                <Button onClick={handleNextStep} colorScheme="blue">
                  Next
                </Button>
              </Flex>
            )}
            {step === 3 && (
              <Flex w="100%" justify="space-between">
                <Button onClick={handlePrevStep} colorScheme="gray">
                  Previous
                </Button>
                <Button onClick={handleNextStep} colorScheme="blue">
                  Next
                </Button>
              </Flex>
            )}
            {step === 4 && (
              <Flex w="100%" justify="space-between">
                <Button onClick={handlePrevStep} colorScheme="gray">
                  Previous
                </Button>
                <Button
                  type="submit"
                  colorScheme="green"
                  isDisabled={
                    !signUpFormik.isValid
                    // || signUpFormik.isSubmitting
                  }
                >
                  {loading ? <Spinner size="sm" color="white" /> : "Register"}
                </Button>
              </Flex>
            )}
          </Flex>
        </VStack>
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
