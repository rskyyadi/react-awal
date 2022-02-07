import React from'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';


export const sidebarData = [
    {
        title:'Dashboard',
        path:'/',
        icon:<AiIcons.AiFillHome />,
        cName:'sidebar-data'
    },
    {
        title:'List Mahasiswa',
        path:'/reports',
        icon:<IoIcons.IoIosPaper />,
        cName:'sidebar-data'
    },
    {
        title:'Product',
        path:'/product',
        icon:<FaIcons.FaCartPlus />,
        cName:'sidebar-data'
    },
    {
        title:'Team',
        path:'/team',
        icon:<IoIcons.IoMdPeople />,
        cName:'sidebar-data'
    },
    {
        title:'Messages',
        path:'/messages',
        icon:<FaIcons.FaEnvelopeOpenText />,
        cName:'sidebar-data'
    },
    {
        title:'Support',
        path:'/support',
        icon:<IoIcons.IoMdHelpCircle />,
        cName:'sidebar-data'
    }
]