import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeSelectUserData } from "../../redux/slices/app/selector";
import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Grid,
} from "@chakra-ui/react";
import Layout from "../../components/Layout/MainLayout";

const Profile = () => {
  const userData = useSelector(makeSelectUserData());
  const [profileData, setProfileData] = useState({});
  const [editable] = useState(false);

  useEffect(() => {
    if (userData) {
      setProfileData(userData);
    }
  }, [userData]);

  return (
    <Layout>
      <Flex
        minH={"100vh"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
        borderRadius={"xl"}
      >
        <Stack spacing={4} w={"100%"} p={6}>
          <Heading lineHeight={1.1} fontSize={{ base: "xl", sm: "2xl" }}>
            Student Info
          </Heading>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input
              placeholder="fullName"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={profileData?.fullName?.toUpperCase()}
              isReadOnly={!editable}
            />
          </FormControl>

          <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
            <FormControl>
              <FormLabel>Race</FormLabel>
              <Input
                placeholder="race"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={profileData?.race?.toUpperCase()}
                isReadOnly={!editable}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Nationality</FormLabel>
              <Input
                placeholder="nationality"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={profileData?.nationality?.toUpperCase()}
                isReadOnly={!editable}
              />
            </FormControl>
          </Grid>
          {profileData?.nationality === "malaysia" ? (
            <FormControl>
              <FormLabel>My Kad / NRIC</FormLabel>
              <Input
                placeholder="nric"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={profileData?.nric?.toUpperCase()}
                isReadOnly={!editable}
              />
            </FormControl>
          ) : (
            <FormControl>
              <FormLabel>Passport</FormLabel>
              <Input
                placeholder="passport"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={profileData?.passport?.toUpperCase()}
                isReadOnly={!editable}
              />
            </FormControl>
          )}
          <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Input
                placeholder="gender"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={profileData?.gender?.toUpperCase()}
                isReadOnly={!editable}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                placeholder="dob"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={profileData?.dob?.toUpperCase()}
                isReadOnly={!editable}
              />
            </FormControl>
          </Grid>

          <FormControl>
            <FormLabel>School</FormLabel>
            <Input
              placeholder="school"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={profileData?.school?.toUpperCase()}
              isReadOnly={!editable}
            />
          </FormControl>

          <FormControl>
            <FormLabel>MOE Email</FormLabel>
            <Input
              placeholder="moe email"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={profileData?.moeEmail || "-"}
              isReadOnly={!editable}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Contact Number</FormLabel>
            <Input
              placeholder="contact number"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={profileData?.contact?.toUpperCase() || "-"}
              isReadOnly={!editable}
            />
          </FormControl>

          <Grid
            templateColumns="calc(65% - 8px) calc(35% - 8px)"
            gap={4}
            w="100%"
          >
            <FormControl>
              <FormLabel>Centre</FormLabel>
              <Input
                placeholder="centre"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={profileData?.centerName?.toUpperCase() || "-"}
                isReadOnly={!editable}
              />
            </FormControl>

            <FormControl>
              <FormLabel>T-Shirt Size</FormLabel>
              <Input
                placeholder="size"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={profileData?.size?.toUpperCase()}
                isReadOnly={!editable}
              />
            </FormControl>
          </Grid>

          <Heading
            lineHeight={1.1}
            fontSize={{ base: "xl", sm: "2xl" }}
            marginTop={"10px"}
          >
            Parent Info
          </Heading>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="parentName"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={profileData?.parentName?.toUpperCase() || "-"}
              isReadOnly={!editable}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Relationship to student</FormLabel>
            <Input
              placeholder="relationship"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={profileData?.relationship?.toUpperCase() || "-"}
              isReadOnly={!editable}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="parentEmail"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={profileData?.parentEmail || "-"}
              isReadOnly={!editable}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Contact Number</FormLabel>
            <Input
              placeholder="parentContact"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={profileData?.parentContact?.toUpperCase() || "-"}
              isReadOnly={!editable}
            />
          </FormControl>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default Profile;
