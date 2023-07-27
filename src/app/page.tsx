
import Image from 'next/image';
import {PrismaClient, PrismaPromise, Servers} from '@prisma/client';
import Link from "next/link";
const prisma = new PrismaClient();

function getNodeServers(): PrismaPromise<Servers[]> {
    return prisma.servers.findMany({ where: { type: 'Node'}});
}

export default async function Home() {
    const nodeServers: Servers[] = await getNodeServers();

  return (
    <div>
        <h1>Home</h1>
        <h3>Node Servers</h3>
        <ul>
            {nodeServers.map((server: Servers) => {
                return <NodeServer key={server.id} server={server}/>
            })}
        </ul>
    </div>
  )
}

function NodeServer({server}: {server: Servers}) {
    const { id, ipAddr } = server;
    return (
        <Link href={`/nodeserver/${id}`}>
            <div>
                <h1>Node Server</h1>
                <h3>{ipAddr}</h3>
            </div>
        </Link>
    )
}
