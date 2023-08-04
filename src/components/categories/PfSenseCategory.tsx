
import {PfSenseAndServices, PfSenses, PfSenseServices} from "@prisma/client";
import PfSenseServiceCell from "@/components/cells/PfSenseServiceCell";
import {prisma} from "@/app/api/db";

async function getPfSenseServicesByPfSenseId(id: number): Promise<PfSenseServices[]> {
    "use server"
    const pfSenseServicesIds: PfSenseAndServices[] = await prisma.pfSenseAndServices.findMany({
        where: {
            pfSenseId: id
        }
    });
    return prisma.pfSenseServices.findMany({
        where: {
            id: {in: pfSenseServicesIds.map(pfSenseService => pfSenseService.pfSenseServiceId)}
        }
    });
}

type PfSenseCategoryProps = {
    id: number
    ip: string
}

export default async function PfSenseCategory({id, ip}: PfSenseCategoryProps) {
    const pfSenseServices: PfSenseServices[] = await getPfSenseServicesByPfSenseId(id);
    return (
        <div className="category-main-field-item w-full flex flex-col justify-center items-center" id={`1-false-${id}-1`}>
            <div className="category-main-field-item-title">{ip}</div>
            <div className="category-main-field flex flex-col">
                {pfSenseServices.map(
                    (pfSenseService: PfSenseServices) =>
                        <PfSenseServiceCell
                            key={pfSenseService.id} id={pfSenseService.id} name={pfSenseService.name} pfSenseRequestId={pfSenseService.pfSenseRequestId} parentId={id}
                        />
                )}
            </div>
        </div>
    )
}