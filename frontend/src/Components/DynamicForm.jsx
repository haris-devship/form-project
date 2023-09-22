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
//   const [forms, setForms] = useState([
//     {
//       name: "",
//       age: "",
//       url: "",
//       file: null,
//       status: "active",
//     },
//   ]);
//   const [loading, setLoading] = useState(false);
//   const toast = useToast();

//   const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[a-zA-Z0-9].[^\s]*$/i;

//   const handleChange = (index, field, value) => {
//     const updatedForms = [...forms];
//     if (field === "url" && !urlPattern.test(value)) {
//       updatedForms[index].url = "";
//       toast({
//         title: "Invalid URL",
//         status: "error",
//         isClosable: true,
//         duration: 3000,
//       });
//     } else {
//       updatedForms[index][field] = value;
//     }
//     setForms(updatedForms);
//   };

//   const handleRemoveForm = (index) => {
//     const updatedForms = forms.filter((_, i) => i !== index);
//     setForms(updatedForms);
//   };

//   const handleAddForm = () => {
//     setForms([
//       ...forms,
//       { name: "", age: "", url: "", file: null, status: "active" },
//     ]);
//   };

//   const handleSubmit = async () => {
//     try {
//       const formDataArray = forms?.map((ele) => ({
//         name: ele.name,
//         age: ele.age,
//         url: ele.url,
//         file: ele.file,
//         status: ele.status,
//       }));

//       await axios
//         .post("http://localhost:8000/form/api/addForm", formDataArray)
//         .then((res) => {
//           console.log(res.response);
//           toast({
//             title: "Form added successfully",
//             status: "success",
//             isClosable: true,
//             duration: 3000,
//           });
//         })
//         .catch((err) => {
//             console.log(err)
//           toast({
//             title: "Invalid URL",
//             status: "error",
//             isClosable: true,
//             duration: 3000,
//           });
//         });
//     } catch (err) {}
//   };

  return (
    <>
     
    </>
  );
};

export default DynamicForm;
