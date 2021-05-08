import axios from "axios";
import jwt from "jwt-decode";
import { toast } from "react-toastify";

const baseUrl = "http://localhost:5000/";
const decode = (token) => {
  return jwt(token);
};
export const signin = async (payload) => {
  try {
    const response = await axios.post(`${baseUrl}api/sign-in`, payload);
    let DecodeData;
    if (response.status === 200) {
      toast.success("Login sucessfully...");
      DecodeData = decode(response.data.token);
      if (!localStorage.getItem("id"))
        localStorage.setItem("id", DecodeData.id);
    }

    return response.status;
  } catch (error) {
    if (error.message === "Request failed with status code 401") {
      toast.error("Email address or password is incorrect");
      console.log("Error while signin", error);
    }
  }
};

export const signup = async (payload) => {
  try {
    const response = await axios.post(`${baseUrl}api/sign-up`, payload);
    if (response.status === 201) {
      toast.success("Signup sucessfully...");
      let DecodeData = decode(response.data.token);
      if (!localStorage.getItem("id"))
        localStorage.setItem("id", DecodeData.id);
    }
    return response.status;
  } catch (error) {
    console.log("Error while signup", error);
  }
};

export const getUsers = async (id) => {
  try {
    const data = await axios.get(`${baseUrl}api/user/${id}`);
    return data.data;
  } catch (error) {
    console.log("Error while fetching users", error);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}api/user/delete/${id}`);
    if (response.data?.length > 0) {
      toast.success("User deleted successfully.");
    } else {
      toast.warning("Data not found.");
    }
    return response.data;
  } catch (error) {
    console.log("Error while deleting user", error);
  }
};

export const addUser = async (payload) => {
  const UserId = localStorage.getItem("id");
  try {
    const response = await axios.post(`${baseUrl}api/user/add`, {
      ...payload,
      adminUserId: UserId,
    });
    if (response.data?.length > 0) {
      toast.success("User Added successfully");
    } else {
      toast.warning("Error while Adding user.");
    }
    return response.status;
  } catch (error) {
    console.log("Error while signin", error);
  }
};

export const getSpecificUser = async (id) => {
  try {
    const data = await axios.get(`${baseUrl}api/user/get/${id}`);
    return data.data;
  } catch (error) {
    console.log("Error while fetching users", error);
  }
};

export const updateUser = async (id, payload) => {
  try {
    const response = await axios.put(`${baseUrl}api/user/edit/${id}`, payload);
    if (response.data?.length > 0) {
      toast.success("User updated successfully.");
    } else {
      toast.warning("Error while updated user.");
    }
    return response.status;
  } catch (error) {
    console.log("Error while fetching users", error);
  }
};
