import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BookingsPage, FaqPage, HomePage } from "components/pages";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/faq' key='route-faq' element={<FaqPage/>}/>
                <Route path='/list' key='route-list' element={<BookingsPage/>}/>
                <Route path='/' key='route-default' element={<HomePage/>}/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </BrowserRouter>
    );
}
