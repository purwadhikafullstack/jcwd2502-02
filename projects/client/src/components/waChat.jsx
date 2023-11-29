import React, { useState } from 'react';
import { RiCustomerService2Fill } from 'react-icons/ri';

const WAChat = () => {
    const [isChatVisible, setChatVisible] = useState(false);

    const toggleChatVisibility = () => {
        setChatVisible(!isChatVisible);
    };

    return (
        <div>
            {/* Navbar button to toggle chat visibility */}
            <button
                className={isChatVisible ? "hidden" : " font-bold fixed bottom-6 right-6 bg-green-700 text-white py-2 px-4 rounded-full cursor-pointer z-50 hover:scale-105"}
                onClick={toggleChatVisibility}
            >
                ?
            </button>

            {/* Chat div */}
            {isChatVisible && (
                <div className="fixed bottom-6 right-6  py-2 px-4 rounded-full cursor-pointer z-50 hover:scale-105">
                    {/* Pocket button to toggle chat visibility */}
                    <button
                        className="absolute top-0 right-0 m-1 text-sm text-white bg-green-700  px-2 py-1 rounded-full cursor-pointer"
                        onClick={toggleChatVisibility}
                    >
                        {">"}
                    </button>

                    <a href="https://wa.me/6282213538399">
                        <div className="h-[80px] w-[80px]">
                            {/* <RiCustomerService2Fill /> */}
                            <img src="./WA_Icon.png" alt="" />
                        </div>
                    </a>
                </div>
            )}
        </div>
    );
};

export default WAChat;
