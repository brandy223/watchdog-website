
import "../styles/Home.css";
import ServerServicesPanel from "@/components/panels/ServerServicesPanel";
import NodeServersPanel from "@/components/panels/NodeServersPanel";
import PfSenseServicesPanel from "@/components/panels/PfSenseServicesPanel";
import ServicesDataPanel from "@/components/panels/ServicesDataPanel";
import SocketEventHandler from "@/app/api/SocketEventHandler";
import {getCentralServersAndInfo} from "@/app/api/db";



export default async function Home() {
    const centralServers: Map<string[], [string[], boolean]> = await getCentralServersAndInfo();

    let minPriority = Number.MAX_SAFE_INTEGER;
    let minKey: string[] | undefined;

    for (const [key] of centralServers.entries()) {
        const priority = parseInt(key[2]);
        if (priority < minPriority) {
            minPriority = priority;
            minKey = key;
        }
    }

    return (
        <div className="mx-auto">
            <div className="flex flex-row justify-around mt-10 w-full items-start">
                <SocketEventHandler serverIp={minKey ? minKey[0] : centralServers.entries().next().value[0][0]} serverPort={minKey ? minKey[1] : centralServers.entries().next().value[0][1]} />
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