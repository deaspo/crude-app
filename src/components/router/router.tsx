import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BookingsPage, FaqPage, HomePage, LocationsPage, LocationPage } from "components/pages";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage/>}/>
                <Route path='faq' key='route-faq' element={<FaqPage/>}/>
                <Route path='list' key='route-list'>
                    <Route index element={<BookingsPage/>}/>
                    <Route path=":bookingId" element={<BookingsPage />} />
                </Route>
                <Route path='locations'>
                    <Route index element={<LocationsPage/>}/>
                    <Route path=":locationId" element={<LocationPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </BrowserRouter>
    );
}
