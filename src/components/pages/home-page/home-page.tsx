import React from 'react';
import { NavBar, PageFooter } from "components/controls";

import { Typography } from "@material-tailwind/react";
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-full">
            <NavBar/>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div
                            className="h-96 items-center flex flex-wrap rounded-lg border-4 border-dashed border-gray-200">
                            <div className="container max-w-8xl relative mx-auto">
                                <div className="items-center flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                                        <div className="text-gray-800">
                                            <Typography variant="lead">
                                                CRUD app for “booking hours on project”. Go to the <Link
                                                component="button" onClick={() => navigate("/bookings")}> Bookings
                                                page </Link> to
                                                start adding new bookings or see already saved bookings
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <PageFooter/>
        </div>
    );
}
