
import { PrismaClient, Servers, ServersOfJobs } from "@prisma/client";
import NodeServerCell from "@/components/cells/NodeServerCell";

const prisma = new PrismaClient();

async function getAllNodeServersAssignedToJobs(): Promise<Servers[]> {
    const serversIds: ServersOfJobs[] = await prisma.serversOfJobs.findMany();
    const uniqueServersIds: number[] = serversIds.map(server => server.serverId).filter((value, index, self) => self.indexOf(value) === index);
    return prisma.servers.findMany({
       where: { id: {in: uniqueServersIds} }
    });
}

export default async function NodeServersPanel() {
    const nodeServers: Servers[] = await getAllNodeServersAssignedToJobs();
    return (
        <div className="category-container flex flex-col justify-center items-center mt-10">
            <div className="category-title">Node Servers</div>
            <div className="category-main-field flex flex-col">
                {nodeServers.map(
                    (server: Servers) => <NodeServerCell key={server.id} id={server.id} ip={server.ipAddr} />
                )}
            </div>
        </div>
    )
}