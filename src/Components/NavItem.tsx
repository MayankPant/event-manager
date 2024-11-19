import { useState } from "react";
import { NavLink } from "react-router-dom";

import { MouseEventHandler } from "react";
type PropType = {
    styles: object,
    routeTo: string,
    navItemName?: string,
    icon?: any
}
const NavItem = (props: PropType) => {
  const [hovered, isHovered] = useState<boolean>(false);

  const onmouseenter: MouseEventHandler = () => {
    isHovered(true);
  };

  const onmouseleave: MouseEventHandler = () => {
    isHovered(false);
  };

  const defaultStyling: object = {
    padding: "8px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "0.7em",
    transition: "box-shadow 0.3s",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    fontVariantCaps: "all-petite-caps",
  };

  const passedStyling: object = props.styles ? props.styles : {};
    // Styles for hover effect
    const hoverStyles = {
      boxShadow: hovered ? "0px 0px 5px #000000" : "",
    };

    const combinedStyles = {
      ...passedStyling,
      ...hoverStyles,
      ...defaultStyling,
    };

    return (
        <div
          onMouseEnter={onmouseenter}
          onMouseLeave={onmouseleave}
        >
          <NavLink to={props.routeTo} style={combinedStyles}>
            {props.navItemName !== "" || undefined ? props.navItemName : props.icon}
          </NavLink>
        </div>
      );
};
export default NavItem;