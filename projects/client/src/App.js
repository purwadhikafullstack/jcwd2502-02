//import component/pages
import { Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/user/profilePage";
import UpdateProfile from "./pages/user/updateProfilePage";

function App() {
  return (
    <div data-theme="light">

      <Routes>
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/updateprofile' element={<UpdateProfile />} />


      </Routes>

    </div>
  );
}

export default App;