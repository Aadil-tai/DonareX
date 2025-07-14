import React from 'react';

const Marquee = () => {
    return (
        <div className="w-full flex justify-center mt-4">
            <div className="w-[90%] rounded-full bg-secondary text-white py-2 overflow-hidden whitespace-nowrap">
                <p className="inline-block animate-marquee font-medium text-sm px-4">
                    💡 Project payment is in test mode, so don’t worry while testing!
                </p>
            </div>
        </div>
    );
};

export default Marquee;
