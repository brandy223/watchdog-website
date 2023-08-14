
import {PfSenseAndServices, PfSenses, PfSenseServices} from "@prisma/client";
import PfSenseCategory from "@/components/categories/PfSenseCategory";
import {prisma} from "@/app/api/db";

async function getAssignedPfSenses(): Promise<PfSenses[]> {
    "use server"
    const pfSensesIds: PfSenseAndServices[] = await prisma.pfSenseAndServices.findMany();
    const uniquePfSensesIds: number[] = pfSensesIds.map(pfSense => pfSense.pfSenseId).filter((value, index, self) => self.indexOf(value) === index);
    return prisma.pfSenses.findMany({
        where: {
            id: {in: uniquePfSensesIds}
        }
    });
}

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

export default async function PfSenseServicesPanel() {
    const pfSenses: PfSenses[] = await getAssignedPfSenses();
    return (
        <div className="category-container flex flex-col justify-center items-center">
            <div className="category-title">Pf Sense</div>
            <div className="category-main-field flex flex-wrap">
                {pfSenses.map(
                    async (pfSense: PfSenses) => <PfSenseCategory key={pfSense.id} id={`1-false-${pfSense.id}-1`} ip={pfSense.ip} pfSenseServices={await getPfSenseServicesByPfSenseId(pfSense.id)} />
                )}
            </div>
        </div>
    )
}