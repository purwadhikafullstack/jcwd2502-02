import { Routes } from "react-router-dom";
import { onCheckIsLogin } from "./redux/Features/users";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onGetBranchAsync } from "./redux/Features/branch";
import { nearestBranch } from "./redux/Features/branch";
import routes from "./routes/Routes";

function App() {
  const user = useSelector((state) => state.users)
  const mainAddress = useSelector((state) => state.branch.mainAddress)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onCheckIsLogin());
    dispatch(onGetBranchAsync())
    dispatch(nearestBranch())
  }, [user.id, mainAddress])

  return (
    <div data-theme="light">
      <Routes>
        {routes.map((value) => value)}
      </Routes>
    </div>
  );
}

export default App;