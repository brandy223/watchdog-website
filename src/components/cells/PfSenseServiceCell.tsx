
"use client"

import {useEffect, useState} from "react";
import {componentsData} from "@/app/api/SocketEventHandler";

type PfSenseServiceCellProps = {
    id: string
    name: string
    pfSenseRequestId: number | null
}

export default function PfSenseServiceCell({id, name, pfSenseRequestId}: PfSenseServiceCellProps) {
    const greenValue: string = "#75EB18"
    const redValue: string = "#EB1818"
    const orangeValue: string = "#EB9E18"
    const [ color, setColor ] = useState<string>(redValue);

    useEffect(() => {
        setInterval(() => {
            switch((componentsData.get(id) ?? ["stopped"])[0]) {
                case "running":
                    setColor(greenValue);
                    break;
                case "stopped":
                    setColor(redValue);
                    break;
                case "PENDING":
                    setColor(orangeValue);
                    break;
                default:
                    break;
            }
        }, 5000);
    }, [id]);

    return (
        <div className="category-main-field-sub-item flex flex-row w-full">
            <div className="title w-full flex flex-row items-center">
                {name}
                {(pfSenseRequestId !== null || undefined) &&
                    <div className="flex flex-end items-center text-white ml-1">
                        / id: {pfSenseRequestId}
                    </div>
                }
            </div>
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