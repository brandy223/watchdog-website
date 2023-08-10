
"use client"

import {useEffect, useState} from "react";
import {componentsData} from "@/app/api/SocketEventHandler";

type NodeServerCellProps = {
    id: string
    ip: string
}

export default function ServerServiceCell({id, ip}: NodeServerCellProps) {
    const greenValue: string = "#75EB18"
    const redValue: string = "#EB1818"
    const orangeValue: string = "#EB9E18"
    const [ color, setColor ] = useState<string>(redValue);
    const [ hover, setHover ] = useState<boolean>(false);

    useEffect(() => {
        setInterval(() => {
            switch((componentsData.get(id) ?? ["KO"])[0]) {
                case "OK":
                    if ((componentsData.get(id) ?? ["false"])[((componentsData.get(id) ?? ["false"]).length - 1) ?? 0] === "Problem with NodeJS App probably") {
                        // TODO: hover effect
                        // TODO: Detect packets loss
                        setColor(orangeValue);
                        break;
                    }
                    setColor(greenValue);
                    break;
                case "KO":
                    setColor(redValue);
                    break;
                default:
                    break;
            }
        }, 5000);
    }, [id]);

    // const classHover = ""

    return (
        <div className="category-main-field-sub-item flex flex-row w-full">
            <div className="title w-full flex items-center truncate">
                {ip}
            </div>
            {hover && <div>
                // TODO: Add hover effect (packets loss)
            </div>
            }
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                <g filter="url(#filter0_f_236_28)">
                    <circle cx="17" cy="17" r="15" fill={color} fillOpacity="0.76"/>
                </g>
                <defs>
                    <filter id="filter0_f_236_28" x="0" y="0" width="34" height="34" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_236_28"/>
                    </filter>
                </defs>
            </svg>
        </div>
    )
}