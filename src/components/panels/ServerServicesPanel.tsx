
import {Servers, Services, ServicesOfServers} from "@prisma/client";
import ServerCategory from "@/components/categories/ServerCategory";
import {prisma} from "@/app/api/db";

async function getAllServersPointedByJobs(): Promise<Servers[]> {
    "use server"
    const serversIds: ServicesOfServers[] = await prisma.servicesOfServers.findMany({
        where: {
            jobId: {not: null}
        }
    });
    const uniqueServersIds: number[] = serversIds.map(server => server.serverId).filter((value, index, self) => self.indexOf(value) === index);
    return prisma.servers.findMany({
        where: {
            id: {in: uniqueServersIds}
        }
    });
}

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

export default async function ServerServicesPanel() {
    const servers: Servers[] = await getAllServersPointedByJobs();
    return (
        <div className="category-container flex flex-col justify-center items-center">
            <div className="category-title">Servers and Services</div>
            <div className="category-main-field flex flex-col">
                {servers.map(
                    async (server: Servers) => <ServerCategory key={server.id} id={`1-false-${server.id}-0`} ip={server.ipAddr} services={await getServicesOfServerById(server.id)}/>
                )}
            </div>
        </div>
    )
}