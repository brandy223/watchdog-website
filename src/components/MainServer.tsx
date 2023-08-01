import React from "react";

// TODO: Replace by values in DB

export const MainServer = ({ className }) => {
    return (
        <div>
            <a className="text-mainWhite font-medium rounded-full border-2 border-validGreen text-sm px-4 py-2 text-center mr-3 md:mr-0">
                192.168.10.58
            </a>
            <a className="text-mainWhite ml-4 font-medium rounded-full border-2 border-mainRed text-sm px-4 py-2 text-center mr-3 md:mr-0">
                192.168.10.44
            </a>
        </div>
    )
}