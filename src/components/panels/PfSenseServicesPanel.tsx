
import {PfSenseAndServices, PfSenses, PrismaClient} from "@prisma/client";
import PfSenseCategory from "@/components/categories/PfSenseCategory";

const prisma = new PrismaClient();

async function getAssignedPfSenses(): Promise<PfSenses[]> {
    const pfSensesIds: PfSenseAndServices[] = await prisma.pfSenseAndServices.findMany();
    const uniquePfSensesIds: number[] = pfSensesIds.map(pfSense => pfSense.pfSenseId).filter((value, index, self) => self.indexOf(value) === index);
    return prisma.pfSenses.findMany({
        where: {
            id: {in: uniquePfSensesIds}
        }
    });
}

export default async function PfSenseServicesPanel() {
    const pfSenses: PfSenses[] = await getAssignedPfSenses();
    return (
        <div className="category-container flex flex-col justify-center items-center">
            <div className="category-title">Pf Sense</div>
            <div className="category-main-field flex flex-col">
                {pfSenses.map(
                    (pfSense: PfSenses) => <PfSenseCategory key={pfSense.id} id={pfSense.id} ip={pfSense.ip} />
                )}
            </div>
        </div>
    )
}