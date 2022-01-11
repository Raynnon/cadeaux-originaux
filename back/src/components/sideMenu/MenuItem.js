import { useSelector, useDispatch } from "react-redux";
import { changeSelectedMenuItem } from "../../app/state/slices/menuSlice";

import { Link } from "react-router-dom";
import { ListItemButton, ListItemText, ListItemIcon } from "@mui/material/";

const MenuItem = ({ name, Icon, link }) => {
  const selectedMenuItem = useSelector((state) => state.menu.selectedMenuItem);
  const dispatch = useDispatch();
  return (
    <Link to={link}>
      <ListItemButton
        data-testid="menu-item"
        selected={name === selectedMenuItem}
        onClick={() => dispatch(changeSelectedMenuItem(name))}
        sx={{
          borderRadius: 1,
          margin: "10px 0",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)"
          },
          "&.Mui-selected": {
            backgroundColor: "#03a9f4",
            "&:hover": {
              backgroundColor: "#03a9f4"
            }
          }
        }}
      >
        <ListItemIcon>
          <Icon data-testid="menu-item-icon" color="secondary" />
        </ListItemIcon>
        <ListItemText
          className="menu-text"
          sx={{ color: "white", display: { xs: "none", md: "block" } }}
          data-testid="menu-item-text"
        >
          {name}
        </ListItemText>
      </ListItemButton>
    </Link>
  );
};

export default MenuItem;
