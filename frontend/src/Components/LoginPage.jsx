import React, { useState } from "react";
import {
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
} from "@chakra-ui/react";
import { CloseIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "male",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    }  else  {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    // console.log(name, value, type, files);
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Container  centerContent>
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
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="lastName" isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </FormControl>
              </Flex>
             

              <FormControl id="age" isRequired>
                <FormLabel>Age</FormLabel>
                <Input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="gender" isRequired>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
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
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <InputRightElement width="3rem">
                    <IconButton
                      h="1.5rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      icon={!showPassword ? <ViewIcon/>: <ViewOffIcon/>}
                    >
                    </IconButton>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </FormControl>

              
              <FormControl id="image">
                <FormLabel>Image</FormLabel>
                {formData.image ? (
                  <Stack direction="row" alignItems="center">
                    <Image
                      src={URL.createObjectURL(formData.image)}
                      maxH="100px"
                      maxW="100px"
                    />
                    <IconButton
                     size="sm"
                     rounded="full"
                     colorScheme="red"
                      icon={<CloseIcon />}
                      onClick={handleRemoveImage}
                    />
                  </Stack>
                ) : (
                  <Input
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                  />
                )}
              </FormControl>

              <Button type="submit" colorScheme="teal" size="lg">
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
