import React, { useState, useContext } from "react";
import { FormControl, TextField } from "@mui/material";
import "../styles/Login.css";
import { InputLabel, OutlinedInput } from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@mui/material";
import { Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { TokenContext } from "../context/TokenContext";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { Switch } from "@mui/material";

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordReType, setShowPasswordReType] = React.useState(false);

  const [loginButtonLoader, setLoginButtonLoader] = useState<boolean>(false);
  const [signupButtonLoader, setSignupButtonLoader] = useState<boolean>(false);
  const { login, isAuthenticated, isAdmin, signup } =
    React.useContext(TokenContext);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [passwordRetype, setReTypePassword] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordReType = () => setShowPasswordReType((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleUserChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUsername(event.currentTarget.value);
  };
  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(event.currentTarget.value);
  };
  const handleReTypePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setReTypePassword(event.currentTarget.value);
  };
  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmail(event.currentTarget.value);
  };

  const signupUser = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    setLoginButtonLoader(true);
    var signUpSuccessful: boolean = await signup(
      username,
      email,
      password,
      checked
    );
    if (signUpSuccessful) {
      setSignupButtonLoader(false);
      return;
    }
    alert("Login Failed");
    setLoginButtonLoader(false);
  };

  const theme = useTheme();
  const styles = {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  };


  return (
    <div style={styles} className="login-wrapper">
      <div className="login-title">SignUp to Event Manager</div>
      <div className="login-form">
        <TextField
          required
          id="username"
          label="Username"
          variant="outlined"
          sx={{ width: "55ch" }}
          value={username}
          onChange={handleUserChange}
        />
        <TextField
          required
          id="email-address"
          label="Email Address"
          variant="outlined"
          sx={{ width: "55ch" }}
          value={email}
          onChange={handleEmailChange}
          type="email"
        />
        <FormControl sx={{ width: "55ch" }} required variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <FormControl sx={{ width: "55ch" }} required variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password ReEnter
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPasswordReType ? "text" : "password"}
            value={passwordRetype}
            onChange={handleReTypePasswordChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordReType}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPasswordReType ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <div className="is-admin-toggle" style={{display: 'flex', flexDirection: 'column'}}>
        <InputLabel >
            Enable Mangerical Permissions
          </InputLabel>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            color='primary'
          />
        </div>

        <LoadingButton
          loading={signupButtonLoader}
          loadingPosition="center"
          children={"SIGN UP"}
          variant="contained"
          onClick={signupUser}
          sx={{ width: "100%", backgroundColor: theme.palette.secondary.main }}
        />
        <span style={{ color: theme.palette.text.primary }}>
          By signing in, you agree to our Terms and Conditions and Privacy
          Policy
        </span>
      </div>
    </div>
  );
};

export default SignUp;
