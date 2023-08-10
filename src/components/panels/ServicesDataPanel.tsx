
import {Services, ServicesAndData} from "@prisma/client";
import ServiceDataCategory from "@/components/categories/ServiceDataCategory";
import {prisma} from "@/app/api/db";

async function getAllAssignedServices(): Promise<Services[]> {
    "use server"
    const servicesIds: ServicesAndData[] = await prisma.servicesAndData.findMany();
    const uniqueServicesIds: number[] = [...new Set(servicesIds.map((service: ServicesAndData) => service.serviceId))];
    return prisma.services.findMany({
        where: {
            id: {
                in: uniqueServicesIds
            }
        }
    });
}

export default async function ServicesDataPanel() {
    const services: Services[] = await getAllAssignedServices();
    return (
        <div className="category-container flex flex-col justify-center items-center">
            <div className="category-title">Services</div>
            <div className="category-main-field flex flex-wrap">
                {services.map((service: Services) =>
                    <ServiceDataCategory key={service.id} id={service.id} name={service.name} />
                )}
            </div>
        </div>
    )
}