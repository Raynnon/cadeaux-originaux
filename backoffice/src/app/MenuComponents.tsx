import { SvgIcon } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import AddProduct from "../component/addProduct/AddProduct";

interface MenuItemsComponents {
  icon: typeof SvgIcon;
  compo: JSX.Element;
}

const menuItemsComponents: MenuItemsComponents[] = [
  { icon: FormatListBulletedRoundedIcon, compo: <AddProduct /> },
  { icon: AddCircleRoundedIcon, compo: <AddProduct /> }
];

export default menuItemsComponents;
