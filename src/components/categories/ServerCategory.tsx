import ServerServiceCell from "@/components/cells/ServerServiceCell";
import {Services, ServicesOfServers} from "@prisma/client";
import {prisma} from "@/app/api/db";

async function getServicesOfServerById(id: number): Promise<Services[]> {
    "use server"
    const services: ServicesOfServers[] = await prisma.servicesOfServers.findMany({
        where: {
            serverId: id
        }
    });
    return prisma.services.findMany({
        where: {
            id: {in: services.map(service => service.serviceId)}
        }
    })
}

type ServerCategoryProps = {
    id: number
    ip: string
}

export default async function ServerCategory({id, ip}: ServerCategoryProps) {
    const services: Services[] = await getServicesOfServerById(id);
    return (
        <div className="category-main-field-item w-full flex flex-col justify-center items-center">
            <div className="category-main-field-item-title">{ip}</div>
            <div className="category-main-field flex flex-col">
                {services.map(
                    (service: Services) => <ServerServiceCell key={service.id} id={service.id} name={service.name} />
                )}
            </div>
        </div>
    )
}