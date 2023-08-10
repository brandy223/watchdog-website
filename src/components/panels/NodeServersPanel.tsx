
import { Servers, ServersOfJobs } from "@prisma/client";
import NodeServerCell from "@/components/cells/NodeServerCell";
import {prisma} from "@/app/api/db";

async function getAllNodeServersAssignedToJobs(): Promise<Servers[]> {
    "use server"
    const serversIds: ServersOfJobs[] = await prisma.serversOfJobs.findMany();
    const uniqueServersIds: number[] = serversIds.map(server => server.serverId).filter((value, index, self) => self.indexOf(value) === index);
    return prisma.servers.findMany({
       where: { id: {in: uniqueServersIds} }
    });
}

export default async function NodeServersPanel() {
    const nodeServers: Servers[] = await getAllNodeServersAssignedToJobs();
    return (
        <div className="category-container flex flex-col justify-center items-center mt-4">
            <div className="category-title">Node Servers</div>
            <div className="category-main-field flex flex-col">
                {nodeServers.map(
                    (server: Servers) => <NodeServerCell key={server.id} id={`1-false-${server.id}-0`} ip={server.ipAddr} />
                )}
            </div>
        </div>
    )
}