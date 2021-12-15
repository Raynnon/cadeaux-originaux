import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import AddProduct from "./addProduct/addProduct";

const menuItemsComponents = [
  { icon: FormatListBulletedRoundedIcon, compo: <AddProduct /> },
  { icon: AddCircleRoundedIcon, compo: <AddProduct /> }
];

export default menuItemsComponents;
