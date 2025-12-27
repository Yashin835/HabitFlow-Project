import React from 'react'
import { useNavigate } from 'react-router-dom';
import assets, { userDummyData } from '../assets/assets.js'


function LeftSideBar({ selectedUser, setSelectedUser }) {

    const navigate = useNavigate();
    return (
        <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl text-white ${selectedUser ? "max-md:hidden" : ''}`}>
            <div className='pb-5'>
                <div className='flex justify-between items-center'>
                    <img src={assets.logo} className='max-w-40' />
                    <div className='relative py-2 group'>
                        <img src={assets.menu_icon} className='max-h-5 cursor-pointer' />
                        <div className='absolute top-full right-0 z-20 w-32 p-5 group-hover:block hidden border border-gray-600 text-gray-100 rounded-md'>
                            <p className='cursor-pointer text-sm' onClick={() => navigate('/profile')}>Edit Profile</p>
                            <hr className='my-2 border-gray-500' />
                            <p className='cursor-pointer text-sm' onClick={() => navigate('/logout')}>LogOut</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col'>
                {userDummyData.map((user, index) => (
                    <div onClick={() => setSelectedUser(user)} key={index} className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id && "bg-[#282142/50]"}`}>
                        <img src={user?.profilePic || assets.default_profile_pic} className='w-[35px] aspect-ratio[1/1] rounded-full object-cover' />
                        <div className='flex  flex-col leading-5'>
                            <p className='font-semibold'>{user.fullName}</p>
                            {index < 3 ? <span>Online</span> : <span>Offline</span>}
                            <p className='text-sm text-gray-300'>{user.lastMessage}</p>
                        </div>
                        { index < 2 && <p className='absolute right-4 top-4 text-xs w-5 h-5 flex justify-center items-center bg-violet-500/50 rounded-full'>{index}</p>}
                    </div>
                ))}
            </div>
        </div >
    )
}

export default LeftSideBar
