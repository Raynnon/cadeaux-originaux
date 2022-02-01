import "./App.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../app/state/slices/categoriesSlice";
import { changeToken } from "../app/state/slices/loginSlice";

import cookieManager from "../routes/cookieManager";
import Admin from "../components/Admin";
import Login from "../components/login/Login";

function App() {
  const token = useSelector((state) => state.login.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());

    const cookie = cookieManager();
    dispatch(changeToken(cookie));
  }, [dispatch]);

  return <>{!token ? <Login /> : <Admin />}</>;
}

export default App;
