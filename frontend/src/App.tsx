import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Newsletter from "./components/common/Newsletter";
import ScrollToTop from "./components/common/ScrollToTop";
import Breadcrumb from "./components/common/Breadcrumb";
import { routes } from "./constants/routes";

function App() {
  const location = useLocation();

  return (
    <div className="bg-gray-50">
      <ScrollToTop />
      <Header />
      <Breadcrumb />
      <div style={{ minHeight: "60vh" }}>
        <Routes>
          {routes.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
        </Routes>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
