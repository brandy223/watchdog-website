
import Image from 'next/image';
import {PrismaClient, PrismaPromise, Servers} from '@prisma/client';
import "../styles/Home.css";
import Link from "next/link";
import {NavBar} from "@/components/Navbar";
import ServerServicesPanel from "@/components/panels/ServerServicesPanel";
import NodeServersPanel from "@/components/panels/NodeServersPanel";
import PfSenseServicesPanel from "@/components/panels/PfSenseServicesPanel";
import ServicesDataPanel from "@/components/panels/ServicesDataPanel";
const prisma = new PrismaClient();

// function getNodeServers(): PrismaPromise<Servers[]> {
//     return prisma.servers.findMany({ where: { type: 'Node'}});
// }

export default async function Home() {
    // const nodeServers: Servers[] = await getNodeServers();

  return (
    <div className="xl:mx-40 lg:mx-20 md:mx-0 mx-auto">
        <div className="flex flex-row justify-center justify-around mt-20 w-full items-start">
            <div className="flex flex-col">
                <ServerServicesPanel />
                <NodeServersPanel />
            </div>
            <PfSenseServicesPanel />
            <ServicesDataPanel />
        </div>
    </div>
  )
}

// function NodeServer({server}: {server: Servers}) {
//     const { id, ipAddr } = server;
//     return (
//         <Link href={`/nodeserver/${id}`}>
//             <div>
//                 <h1>Node Server</h1>
//                 <h3>{ipAddr}</h3>
//             </div>
//         </Link>
//     )
// }
