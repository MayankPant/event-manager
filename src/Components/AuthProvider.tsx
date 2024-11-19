import React, { useContext, useEffect } from "react";
import { TokenContext } from "../context/TokenContext";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";

interface PropType {
  children: React.ReactElement;
}

const AuthProvider = (props: PropType) => {
  const [accessToken, setAccessToken] = React.useState("");
  const [refreshToken, setRefreshToken] = React.useState("");
  const [isAuthenticated, setIsAutheticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setAccessToken(token);
      setIsAutheticated(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [accessToken, refreshToken, isAuthenticated, isLoading]);

  const login = async (username: string, password: string) => {
    const loginUrl =
      process.env.REACT_APP_AUTH_BASE_ADDRESS !== undefined
        ? process.env.REACT_APP_AUTH_BASE_ADDRESS.concat("/api/auth/login")
        : "";
    console.log("Login Url: ", loginUrl);
    console.log("Entered username: ", username);
    console.log("Entered password: ", password);
    const payload = {
      username: username,
      password: password,
    };
    try {
      var response = await axios.post(loginUrl, payload);
      console.log("Returned Response from login: ", response);
      if (response.status === 200) {
        // set the loggedIn state and token described in <App />
        console.log("Recieved JWT Access token: ", response.data.accessToken);
        console.log("Recieved JWT refresh token: ", response.data.refreshToken);

        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        setIsAutheticated(true);
        setIsLoading(false);
        return true;
      }
      else{
        setIsAutheticated(false);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      setIsAutheticated(false);
      console.log("Error Occured", error);
      return false;
    }
  }

    const logout =  () => {
      localStorage.setItem('accessToken', '');
      setIsAutheticated(false);
      redirect('/login'); 

    };

    return (
      <TokenContext.Provider
        value={{
          accessToken,
          refreshToken,
          isAuthenticated,
          isLoading,
          login,
          logout,
        }}
      >
        {props.children}
      </TokenContext.Provider>
    );

};

export default AuthProvider;
