
type ServerServiceCellProps = {
    id: number
    name: string
    value: number | string | null
}

export default function ServiceDataCell({id, name, value}: ServerServiceCellProps) {
    return (
        <div className="category-main-field-sub-item flex flex-row w-full">
            <div className="title w-full flex items-center">
                {name}
            </div>
            {value !== null &&
                <div className="w-10 text-white mr-2">
                    {value}
                </div>
            }
        </div>
    )
}