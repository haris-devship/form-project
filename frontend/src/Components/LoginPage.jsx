import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import {
  CloseIcon,
  SmallCloseIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";

const LoginPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast();
  const [data, setData] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "PLease select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "form_Application");
      data.append("cloud_name", "dnwctwnnx");
      fetch("https://api.cloudinary.com/v1_1/dnwctwnnx/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "PLease select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPicLoading(true);
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      toast({
        title: "Password Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    } else {
      setPasswordMatchError(false);
      axios
        .post("http://localhost:8000/user/api/signup", {
          firstName,
          lastName,
          age,
          gender,
          email,
          password,
          image,
        })
        .then((res) => {
          setData(res.data);
          setPicLoading(false);
          setFirstName("");
          setLastName("");
          setAge("");
          setGender("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setShowPassword(false);
          setImage(null);
          toast({
            title: "signUp success",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          
        })
        .catch((err) => {
          // console.log(err.response.data.message);
          toast({
            title: err.response.data.message,
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setPicLoading(false);
        });
    }
  };

  return (
    <>
      {/* <Flex> */}
      <Container centerContent>
        <Box boxShadow={"dark-lg"} p={10} mt={10}>
          <Heading as="h2" size="lg" mb={6}>
            Login
          </Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Flex gap={2}>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="firstName"
                    // value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>

                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    name="lastName"
                    // value={formData.lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </Flex>

              <FormControl id="age" isRequired>
                <FormLabel>Age</FormLabel>
                <Input
                  type="number"
                  name="age"
                  // value={formData.age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </FormControl>

              <FormControl id="gender" isRequired>
                <FormLabel>Gender</FormLabel>
                <RadioGroup name="gender" value={gender} onChange={setGender}>
                  <Stack direction="row">
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                    <Radio value="other">Other</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  // value={formData.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    // value={formData.password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="3rem">
                    <IconButton
                      h="1.5rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      icon={!showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    ></IconButton>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  name="confirmPassword"
                  // value={formData.confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormControl>
              {passwordMatchError && (
                <Alert status="error">
                  <AlertIcon />
                  Passwords do not match.
                </Alert>
              )}

              <FormControl id="image">
                <FormLabel>Image</FormLabel>
                {image ? (
                  <Stack direction="row" alignItems="center">
                    <Image src={image} maxH="100px" maxW="100px" />

                    <IconButton
                      bottom={12}
                      right={5}
                      size="25"
                      rounded="full"
                      colorScheme="red"
                      icon={<SmallCloseIcon />}
                      onClick={handleRemoveImage}
                    />
                  </Stack>
                ) : (
                  <Input
                    type="file"
                    name="image"
                    onChange={(e) => postDetails(e.target.files[0])}
                    accept="image/*"
                  />
                )}
              </FormControl>

              <Button
                loadingText="loading"
                isLoading={picLoading}
                type="submit"
                colorScheme="teal"
                size="lg"
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
      {data && (
        <Container boxShadow={"dark-lg"} p={10} mt={10} centerContent>
          <Box>
            <Heading fontSize={30}>
              Welcome, {data?.firstName} {data?.lastName}
            </Heading>
          </Box>

          <Flex gap={5} mt={10}>
            <Box>
              <Avatar size="xl" src={data?.image} />
            </Box>
            <Box textAlign={"left"}>
              <Text fontSize={20}>Email: {data?.email}</Text>
              <Text fontSize={20}>Age: {data?.age}</Text>
              <Text fontSize={20}>Gender: {data?.gender}</Text>
            </Box>
          </Flex>
        </Container>
      )}

      {/* {data &&
        data.map((ele) => {
          return (
            <Container boxShadow={"dark-lg"} p={10} mt={10} centerContent>
              <Box>
                <Heading fontSize={30}>
                  Welcome, {ele?.firstName} {data?.lastName}
                </Heading>
              </Box>

              <Flex gap={5} mt={10}>
                <Box>
                  <Avatar size="xl" src={data?.image} />
                </Box>
                <Box textAlign={"left"}>
                  <Text fontSize={20}>Email: {data?.email}</Text>
                  <Text fontSize={20}>Age: {data?.age}</Text>
                  <Text fontSize={20}>Gender: {data?.gender}</Text>
                </Box>
              </Flex>
            </Container>
          );
        })} */}
      {/* </Flex> */}
    </>
  );
};

export default LoginPage;


