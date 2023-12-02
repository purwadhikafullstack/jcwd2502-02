import React, { useState } from 'react';
import { RiCustomerService2Fill } from 'react-icons/ri';

const WAChat = () => {
    const [isChatVisible, setChatVisible] = useState(false);

    const toggleChatVisibility = () => {
        setChatVisible(!isChatVisible);
    };

    return (
        <div>
            <button
                className={isChatVisible ? "hidden" : " font-bold fixed bottom-6 right-6 bg-green-700 text-white py-2 px-4 rounded-full cursor-pointer z-50 hover:scale-105"}
                onClick={toggleChatVisibility}
            >
                ?
            </button>
            {isChatVisible && (
                <div className="fixed bottom-6 right-6  py-2 px-4 rounded-full cursor-pointer z-50 hover:scale-105">
                    <button
                        className="absolute top-0 right-3 m-1 text-sm text-white bg-red-500  px-2 py-1 rounded-full cursor-pointer"
                        onClick={toggleChatVisibility}
                    >
                        {"X"}
                    </button>
                    <a href="https://wa.me/6282213538399">
                        <div className='flex'>
                            <div className='grid place-content-center'>
                                <div className='btn font-thin'>Need Help?<div className='font-bold'>Chat with us</div></div>
                            </div>
                            <div className="h-[80px] w-[80px] p-2">
                                <img className='rounded-full' src="./WA_Icon.png" alt="" />
                            </div>
                        </div>
                    </a>
                </div>
            )}
        </div>
    );
};

export default WAChat;
