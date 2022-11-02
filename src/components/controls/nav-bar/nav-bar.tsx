import { Disclosure } from '@headlessui/react'
import React from "react";
import { NavBarProps } from "./nav-bar-props";
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";

const navigation = [
    {name: 'Dashboard', href: '/', current: true},
    {name: 'Bookings', href: '/list', current: false},
    {name: 'FAQ', href: '/faq', current: false},
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const NavBar = (props: NavBarProps) => {
    const navigate = useNavigate();
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({open}) => (
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {navigation.map((item) => (
                                        <Link
                                            component="button"
                                            key={item.name}
                                            onClick={() => navigate(item.href)}
                                            className={classNames(
                                                item.current
                                                    ? 'bg-gray-900 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'px-3 py-2 rounded-md text-sm font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Disclosure>
    );
}
