import { Disclosure } from '@headlessui/react'
import React, { useState } from "react";
import { NavItem } from "./nav-bar-props";
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const navigation: NavItem[] = [
    {name: 'Dashboard', href: '/', current: true},
    {name: 'Bookings', href: '/list', current: false},
    {name: 'Locations', href: '/locations', current: false},
    {name: 'FAQ', href: '/faq', current: false},
]

export const NavBar = () => {
    const navigate = useNavigate();
    const [navItems, setNavItems] = useState<NavItem[]>(navigation)
    
    const itemClick = (navItem: NavItem) => {
      const items = navItems.filter(item => item.name !== navItem.name).map((item) => {
          item.current = false;
          return item;
      });
      navItem.current = true;
      const newItems = [...items, navItem];
      setNavItems(newItems);
      navigate(navItem.href);
    }
    
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
                                            onClick={() => itemClick(item)}
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
