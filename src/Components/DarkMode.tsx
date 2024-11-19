import "../styles/DarkMode.css";
import { ChangeEventHandler } from "react";
import { useTheme } from "@mui/material";

interface ChildComponentProps {
  themeToggle: ChangeEventHandler;
}

const DarkMode = (props: ChildComponentProps) => {
  const theme = useTheme();
  const styles = {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  };
  return (
    <div style={styles} className="darkmode-switch">
      <label style={styles} className="ui-switch">
        <input onChange={props.themeToggle} type="checkbox" />
        <div className="slider">
          <div className="circle"></div>
        </div>
      </label>
    </div>
  );
};

export default DarkMode;
