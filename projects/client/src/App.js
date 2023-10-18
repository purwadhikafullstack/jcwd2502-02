//import component/pages
import { Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/user/productList";

function App() {
  return (
    <div data-theme="light">
      <Routes>
        <Route element={<ProductListPage />} path="/" />
      </Routes>
    </div>
  );
}

export default App;