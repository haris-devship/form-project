import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

const DynamicForm = () => {
  //   const [name, setName] = useState("");
  //   const [age, setAge] = useState("");
  //   const [url, setUrl] = useState("");
  //   const [file, setFile] = useState(null);
  //   const [status, setStatus] = useState("");
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
  const toast = useToast();

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
    console.log(forms);
    setLoading(true);
    try {
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
    </>
  );
};

export default DynamicForm;
