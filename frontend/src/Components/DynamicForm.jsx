import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  IconButton,
  Input,
  Link,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const DynamicForm = () => {
  const [forms, setForms] = useState([
    {
      name: "",
      age: "",
      url: "",
      file: null,
      status: "active",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const toast = useToast();
  const [editingIndex, setEditingIndex] = useState();

  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[a-zA-Z0-9].[^\s]*$/i;

  const handleChange = (index, field, value) => {
    const updatedForms = [...forms];
    if (field === "url" && !urlPattern.test(value)) {
      updatedForms[index].url = "";
      toast({
        title: "Invalid URL",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    } else {
      updatedForms[index][field] = value;
    }
    setForms(updatedForms);
  };

  const handleRemoveForm = (index) => {
    const updatedForms = forms.filter((_, i) => i !== index);
    setForms(updatedForms);
  };

  const handleAddForm = () => {
    setForms([
      ...forms,
      { name: "", age: "", url: "", file: null, status: "active" },
    ]);
  };

  const postDetails = (index, field, value) => {
    setLoading(true);
    if (value === undefined) {
      toast({
        title: "Please select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (value.type === "image/jpeg" || value.type === "image/png") {
      const data = new FormData();
      data.append("file", value);
      data.append("upload_preset", "form_Application");
      data.append("cloud_name", "dnwctwnnx");
      fetch("https://api.cloudinary.com/v1_1/dnwctwnnx/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          const diffData = data.url.toString();
          const updatedForms = [...forms];
          updatedForms[index][field] = diffData;
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "PLease select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const handleSubmit = async () => {
    // console.log(forms);
    console.log("index", data[editingIndex]._id);
    setLoading(true);
    try {
      if (editingIndex != null) {
        // console.log(forms);
        await axios
          .put(
            `http://localhost:8000/form/api/update/${data[editingIndex]._id}`,
            {
              name: forms[0].name,
              age: forms[0].age,
              url: forms[0].url,
              status: forms[0].status,
            }
          )
          .then((res) => {
            console.log(res);
            // console.log(forms[0].name);
            setLoading(false);
            toast({
              title: res.data.message,
              status: "success",
              isClosable: true,
              duration: 3000,
            });
            setEditingIndex(null);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      } else {
        const formDataArray = forms?.map((ele) => ({
          name: ele.name,
          age: ele.age,
          url: ele.url,
          file: ele.file,
          status: ele.status,
        }));
        await axios
          .post("http://localhost:8000/form/api/addForm", formDataArray)
          .then((res) => {
            //   console.log(res.data.message);
            toast({
              title: res.data.message,
              status: "success",
              isClosable: true,
              duration: 3000,
            });
            setLoading(false);
            setForms([
              {
                name: "",
                age: "",
                url: "",
                file: null,
                status: "active",
              },
            ]);
          })
          .catch((err) => {
            setLoading(false);
            //   console.log(err);
            toast({
              title: "Failed to Add, Try again",
              status: "error",
              isClosable: true,
              duration: 3000,
            });
          });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: err.response.data.message,
        status: "error",
        isClosable: true,
        duration: 3000,
      });
      setLoading(false);
    }
  };

  const handleEditForm = (index) => {
    setEditingIndex(index);
    const updatedForms = forms;
    // console.log(updatedForms);
    updatedForms[0].name = data[index].name;
    updatedForms[0].age = data[index].age;
    updatedForms[0].url = data[index].url;
    updatedForms[0].file = data[index].file;
    updatedForms[0].status = data[index].status;

    setForms(updatedForms);
  };

  //   console.log()

  const getFormsData = () => {
    axios
      .get("http://localhost:8000/form/api/getForm")
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFormsData();
  }, [getFormsData]);

  return (
    <>
      <Stack gap={2} w={"100%"}>
        {forms?.map((form, index) => {
          return (
            <Box
              m={"auto"}
              key={index}
              display={"flex"}
              gap={3}
              p={4}
              border={"1px solid #ccc"}
              w={"100%"}
              borderRadius={"md"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
            >
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={form.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Age</FormLabel>
                <Input
                  type="number"
                  value={form.age}
                  onChange={(e) => handleChange(index, "age", e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Enter URL</FormLabel>
                <Input
                  type="url"
                  value={form.url}
                  onChange={(e) => handleChange(index, "url", e.target.value)}
                />
                {/* {!urlPattern.test(form.url) && (
                  <FormHelperText color="red">Invalid URL</FormHelperText>
                )} */}
              </FormControl>

              <FormControl>
                <FormLabel>File Upload</FormLabel>
                <input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    postDetails(index, "file", e.target.files[0])
                  }
                  accept="image/*"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  value={form.status}
                  onChange={(e) =>
                    handleChange(index, "status", e.target.value)
                  }
                >
                  <option value="active">Active</option>
                  <option value="not active">Not Active</option>
                </Select>
              </FormControl>

              <IconButton
                isDisabled={forms.length == 1}
                top={3}
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => handleRemoveForm(index)}
              />
            </Box>
          );
        })}

        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"left"}
          mt={2}
          gap={2}
        >
          <Button
            alignSelf={"left"}
            leftIcon={<AddIcon />}
            onClick={handleAddForm}
          >
            Add Form
          </Button>
          <Button
            loadingText="loading"
            isLoading={loading}
            onClick={handleSubmit}
            colorScheme="blue"
          >
            SUBMIT
          </Button>
        </Box>
      </Stack>

      {data === null ? (
        <Text>No Data</Text>
      ) : (
        <Grid mt={10} templateColumns="repeat(3, 1fr)" gap={6}>
          {data?.map((ele, index) => {
            return (
              <Box key={ele._id} boxShadow={"base"} p={5} rounded={"md"}>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Heading fontSize={20}>{ele.name}</Heading>
                  <IconButton
                    onClick={() => handleEditForm(index)}
                    colorScheme="red"
                    variant={"solid"}
                    size={"sm"}
                    icon={<EditIcon />}
                  />
                  {/* {editingIndex === index ? (
                  <Button
                    onClick={() => handleSaveEditedForm(index)}
                    colorScheme="blue"
                    size="sm"
                  >
                    Save
                  </Button>
                ) : (
                  <IconButton
                    onClick={() => handleEditForm(index)}
                    colorScheme="red"
                    variant={"solid"}
                    size={"sm"}
                    icon={<EditIcon />}
                  />
                )} */}
                </Flex>
                <Flex
                  gap={5}
                  alignItems={"center"}
                  justifyContent={"space-evenly "}
                >
                  <Avatar size={"lg"} src={ele.file} />
                  <Box textAlign={"left"}>
                    <Box display={"flex"} flexDir={"row"}>
                      <Text fontWeight={"bold"}>AGE</Text> : {ele.age}
                    </Box>
                    <Box
                      justifyContent={"space-around"}
                      display={"flex"}
                      flexDir={"row"}
                    >
                      <Text fontWeight={"bold"}>URL</Text> :
                      <Link fontWeight={"normal"} href={ele.url} isExternal>
                        {ele.url}
                      </Link>
                    </Box>
                    <Box textAlign={"left"}>
                      <Text>
                        {ele.status === "active" ? (
                          <Badge
                            fontSize={12}
                            borderRadius={2}
                            p={1}
                            fontWeight={"bold"}
                            colorScheme="green"
                          >
                            Active
                          </Badge>
                        ) : (
                          <Badge
                            fontSize={12}
                            borderRadius={2}
                            p={1}
                            fontWeight={"bold"}
                            colorScheme="red"
                          >
                            Not Active
                          </Badge>
                        )}
                      </Text>
                    </Box>
                  </Box>
                </Flex>
              </Box>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default DynamicForm;
