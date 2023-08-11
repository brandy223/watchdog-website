
import {PrismaClient, Servers} from '@prisma/client'
import {ping, testConnectionToSocket} from "@/app/api/utils";

const globalForPrisma = global as unknown as {
    prisma?: PrismaClient
}

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

/**
 * Returns an array containing centralServers and their info (IP Address, ping info)
 * @returns {Promise<[string[]]>} The array containing centralServers and their info
 */
export async function getCentralServersAndInfo(): Promise<Map<string[], [string[], boolean]>> {
    const centralServersInfo = new Map<string[], [string[], boolean]>();
    const centralServers: Servers[] = await prisma.servers.findMany({ where: { type: "Central" }});
    for (const server of centralServers) {
        const info: string[] = await ping(server.ipAddr);
        info.unshift(Boolean(info[1]) ? "OK" : "KO");
        if (server.port !== null) centralServersInfo.set(
            [server.ipAddr, server.port.toString(), server.priority ? server.priority.toString() : "1", server.id.toString()],
            [info, await testConnectionToSocket(server.ipAddr, server.port)]
        );
    }
    return centralServersInfo;
}