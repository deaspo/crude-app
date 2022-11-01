import React from "react";

import { Typography } from "@material-tailwind/react";
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

export const PageFooter = () => {
    return (
        <footer className="fixed bg-gray-100 pt-8 pb-6 bottom-0 right-0 left-0">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap text-center lg:text-left pt-6">
                    <div className="w-full lg:w-6/12 px-4">
                        <h5 color="gray">Crude App</h5>
                        <div className="mt-4">
                            <Typography variant="lead" sx={{color: "blueGray"}}>
                                Easy to use app for booking hours on a project.
                            </Typography>
                        </div>
                        <div className="flex gap-2 mt-6 md:justify-start md:mb-0 mb-8 justify-center">
                            <a
                                href="https://twitter.com/kidiwalogha"
                                className="grid place-items-center bg-white text-blue-400 shadow-md font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <TwitterIcon/>
                            </a>
                            <a
                                href="https://github.com/deaspo"
                                className="grid place-items-center bg-white text-gray-900 shadow-md font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <GitHubIcon/>
                            </a>
                            <a
                                href="https://www.facebook.com/okock"
                                className="grid place-items-center bg-white text-gray-900 shadow-md font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FacebookIcon/>
                            </a>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="flex flex-wrap items-top">
                            <div className="w-full lg:w-4/12 px-4 ml-auto md:mb-0 mb-8">
                                    <span className="block uppercase text-gray-900 text-sm font-serif font-medium mb-2">
                                        Useful Links
                                    </span>
                                <ul className="list-unstyled">
                                    <li>
                                        <a
                                            href="https://www.linkedin.com/in/okockpolycarp/"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-gray-700 hover:text-gray-900 block pb-2 text-sm"
                                        >
                                            About developer
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://github.com/deaspo"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-gray-700 hover:text-gray-900 block pb-2 text-sm"
                                        >
                                            Github
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                    <span className="block uppercase text-gray-900 text-sm font-serif font-medium mb-2">
                                        Other Resources
                                    </span>
                                <ul className="list-unstyled">
                                    <li>
                                        <a target="_blank"
                                           rel="noreferrer"
                                           className="text-gray-700 hover:text-gray-900 block pb-2 text-sm"
                                           href="mailto:polycarpokock@live.com">
                                            Contact Developer
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-300"/>
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                        <div className="text-sm text-gray-700 font-medium py-1">
                            Copyright © {new Date().getFullYear()} Crude App by{' '}
                            <a target="_blank"
                               rel="noreferrer"
                               className="text-gray-700 hover:text-gray-900 block pb-2 text-sm"
                               href="mailto:polycarpokock@live.com">
                                Polycarp Okock
                            </a>
                            .
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
