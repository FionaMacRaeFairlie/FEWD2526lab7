import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowData from "./components/ShowData";
import StaffPage from "./components/StaffPage";
import Navigation from "./components/Navigation";
import NoPage from "./components/NoPage";
import StaffPage1 from "./components/temp";


function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route path="orders" element={<ShowData />} />
            <Route path="staff" element={<StaffPage />} />
            <Route path="temp" element={<StaffPage1 />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;



