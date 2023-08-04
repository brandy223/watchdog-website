
type PfSenseServiceCellProps = {
    id: number
    name: string
    pfSenseRequestId: number | null
    parentId: number
}

export default function PfSenseServiceCell({id, name, pfSenseRequestId, parentId}: PfSenseServiceCellProps) {
    return (
        <div className="category-main-field-sub-item flex flex-row w-full" id={`3-true-${id}-${parentId}`}>
            <div className="title w-full flex flex-row items-center">
                {name}
                {pfSenseRequestId !== null &&
                    <div className="flex flex-end items-center text-white ml-1">
                        / id: {pfSenseRequestId}
                    </div>
                }
            </div>
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                <g filter="url(#filter0_f_236_28)">
                    <circle cx="17" cy="17" r="15" fill="#75EB18" fillOpacity="0.76"/>
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