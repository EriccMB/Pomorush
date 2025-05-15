import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { NotFound } from "../../pages/NotFound";
import { Home } from "../../pages/Home";
import { useEffect } from "react";
import { History } from "../../pages/History";
import { Config } from "../../pages/Config";

const ScrollToTop = () => {
    const pathName = useLocation();

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [pathName]);
    
    return null;
}

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/history/' element={<History />} /> 
        <Route path='/config/' element={<Config />} /> 
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
};
