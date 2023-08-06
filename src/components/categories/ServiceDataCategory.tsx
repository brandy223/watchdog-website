
import {ServicesAndData, ServicesData} from "@prisma/client";
import ServiceDataCell from "@/components/cells/ServiceDataCell";
import {prisma} from "@/app/api/db";

async function getAllServicesDataOfServiceById(id: number): Promise<ServicesData[]> {
    "use server"
    const servicesData: ServicesAndData[] = await prisma.servicesAndData.findMany({where: {serviceId: id}});
    return prisma.servicesData.findMany({
       where: {id: {in: servicesData.map((serviceData: ServicesAndData) => serviceData.dataId)}}
    });
}

type ServiceDataCategoryProps = {
    id: number
    name: string
}

export default async function ServiceDataCategory({id, name}: ServiceDataCategoryProps) {
    const servicesData: ServicesData[] = await getAllServicesDataOfServiceById(id);

    return (
        <div className="category-main-field-item w-full flex flex-col justify-center items-center" style={{border: 0}}>
            <div className="category-main-field-item-title">{name}</div>
            <div className="category-main-field flex flex-col">
                {servicesData.map((serviceData: ServicesData) =>
                    <ServiceDataCell key={serviceData.id} id={`4-true-${serviceData.id}-${id}`} name={serviceData.name} />
                )}
            </div>
        </div>
    )
}