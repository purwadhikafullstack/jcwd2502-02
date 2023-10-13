// import axios from "axios";
// import logo from "./logo.svg";
// import "./App.css";
// import { useEffect, useState } from "react";

// function App() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     (async () => {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API_BASE_URL}/greetings`
//       );
//       setMessage(data?.message || "");
//     })();
//   }, []);
//   return (
//     <div data-theme='light' className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         {message}
//       </header>
//     </div>
//   );
// }

// export default App;

//import component/pages
import Navbar from "./components/navbarUser";
import NavbarAdmin from "./components/navbarAdmin";
import Footer from "./components/footer";
import Button from "./components/button";
import ProductCard from "./components/productCard";

function App() {
  return (
    <div data-theme="light">

      <Navbar />
      {/* <NavbarAdmin /> */}
      <div className="mt-[70px] flex flex-col justify-evenly p-5 lg:px-32 border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-10 place-items-center">
          <ProductCard name={"Buah Alpukat adasdadasd"} />
          <ProductCard name={"Kiwi Hijau"} />
          <ProductCard name={"Apel Fuji Premium"} />
          <ProductCard name={"Blueberry Impor"} />
          <ProductCard name={"Jeruk Mandarin Murcott"} />
          <ProductCard name={"Kiwi Hijau"} />
          <ProductCard name={"Kiwi Hijau"} />
          <ProductCard name={"Kiwi Hijau"} />
        </div>

        <div className="mt-10"><Button text={"Confirm"} style={"w-[200px]"} /></div>


      </div>
      <Footer />

    </div>
  );
}

export default App;