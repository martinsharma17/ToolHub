
import { useUser, useClerk, Protect } from '@clerk/clerk-react';
import {
    House, SquarePen, Hash, Eraser, Scissors,
    FileText, Users, Image as ImageIcon,
    LogOut
} from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const navitems = [
    { to: '/ai', label: 'Dashboard', Icon: House },
    { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
    { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
    { to: '/ai/generate-image', label: 'Generate Image', Icon: ImageIcon },
    { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
    { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
    { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
    { to: '/ai/community', label: 'Community', Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
    const { user } = useUser();
    const { signOut, openUserProfile } = useClerk();

    return (
        <aside
            className={`w-60 bg-white border-r border-gray-200 flex flex-col
      justify-between items-center max-sm:absolute top-14 bottom-0 
      ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} 
      transition-all duration-300 ease-in-out`}
        >
            <div className='my-7 w-full'>
                <img
                    src={user.imageUrl}
                    alt="User avatar"
                    className='w-13 rounded-full mx-auto'
                />
                <h1 className='mt-1 text-center'>{user.fullName}</h1>

                <div className='mt-6 px-4 flex flex-col gap-2'>
                    {navitems.map(({ to, label, Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={() => setSidebar(false)}
                            className={({ isActive }) =>
                                `px-3.5 py-2.5 flex items-center gap-3 rounded transition-all ${isActive
                                    ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`
                            }
                        >
                            <Icon className='w-4 h-4' />
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className='w-full border-gray-200 p-4 pc-7 flex items-center justify-between'>
                <div onClick={openUserProfile} className=' flex gap-2 items-center cursor-pointer'>
<img src={user.imageUrl} className='w-4.5 rounded-full'/>
<div>
    <h1 className='text-sm font-medium'>{user.fullName}</h1>
    <p className='text-xs text-gray-500'>
        <Protect plan='premium' fallback="free">Premium</Protect> paln
    </p>
</div>
                </div>
                <LogOut onClick={signOut} className='w-4.5 text-grey-400 hover:text-gray-700 transition cursor-pointer' />

            </div>

        </aside>
    );
};

export default Sidebar;
