import React, {  useState, useContext } from "react";
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
import { Navigate, useNavigate} from "react-router-dom";


const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginButtonLoader, setLoginButtonLoader] = useState<boolean>(false);
  const [signupButtonLoader, setSignupButtonLoader] = useState<boolean>(false);
  const {login, isAuthenticated, isAdmin} = React.useContext(TokenContext);
  const navigate = useNavigate()


    const[username, setUsername] = useState<string>('');
    const[password, setPassword] = useState<string>('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.currentTarget.value);
  }
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.currentTarget.value);
  }

  const loginUser =async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    setLoginButtonLoader(true);   
    var loginInSuccessful: boolean = await login(username, password);
        if(loginInSuccessful){
            setLoginButtonLoader(false);
            return;
        }
        alert("Login Failed");
        setLoginButtonLoader(false);
  }

  const routeSignUp = () => {
    setSignupButtonLoader(true);
    navigate('/signup');
    setSignupButtonLoader(false);
  }

  const theme = useTheme();
  const styles = {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  };

    if(isAuthenticated)
        return isAdmin ?  <Navigate to={'/manager'} /> : <Navigate to={'/employee'} />

  return (
    <div style={styles} className="login-wrapper">
      <div className="login-title">Log into Event Manager</div>
      <div className="login-form">
        <TextField
          required
          id="email-address"
          label="Email Address"
          variant="outlined"
          sx={{ width: "55ch" }}
          value={username}
          onChange={handleUserChange}
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
        <Link color={styles.color} href="#">
          Forgot your password?
        </Link>

        <LoadingButton
          loading={loginButtonLoader}
          loadingPosition="center"
          children={"Login"}
          variant="contained"
          sx={{ width: "100%" }}
          onClick={loginUser}
        />

        <Link color={styles.color} href="#">
          Don't have an account?
        </Link>

        <LoadingButton
          loading={signupButtonLoader}
          loadingPosition="center"
          children={"SIGN UP"}
          variant="contained"
          onClick={routeSignUp}
          sx={{ width: "100%", backgroundColor: theme.palette.secondary.main }}
        />
        <span style={{color: theme.palette.text.primary}}>By signing in, you agree to our Terms and Conditions and Privacy Policy</span>
      </div>
    </div>
  );
};

export default Login;
