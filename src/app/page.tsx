
import "../styles/Home.css";
import ServerServicesPanel from "@/components/panels/ServerServicesPanel";
import NodeServersPanel from "@/components/panels/NodeServersPanel";
import PfSenseServicesPanel from "@/components/panels/PfSenseServicesPanel";
import ServicesDataPanel from "@/components/panels/ServicesDataPanel";
import SocketEventHandler from "@/app/api/SocketEventHandler";

export default async function Home() {
    return (
        <div className="mx-auto">
            <div className="flex flex-row justify-around mt-10 w-full items-start">
                <SocketEventHandler />
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