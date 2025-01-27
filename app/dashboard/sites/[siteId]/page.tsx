import { prisma } from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Book, FileIcon, PlusCircle, Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getData(userId: string, siteId: string) {

    const data = await prisma.post.findMany({
        where: {
            userId,
            siteId,
        },
        select: {
            image: true,
            title: true,
            createdAt: true,
            id: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return data;
}
export default async function SiteIdRoute({params}: {params: {siteId: string}}) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user){
        return redirect('/api/auth/login');
    }

    const data = await getData(user.id, params.siteId);



    return (
        <>
        <div className="flex w-full justify-end gap-x-4">
            <Button asChild variant="secondary">
                <Link href={'/'}   >
                <Book className="size-4 mr-2"/>
                View Blog
                </Link>
            </Button>
            <Button asChild variant="secondary">
                <Link href={'/'}  >
                <Settings className="size-4 mr-2"/>
                Settings
                </Link>
            </Button>
            <Button asChild>
                <Link href={`/dashboard/sites/${params.siteId}/create`} >
                <PlusCircle className="size-4 mr-2"/>
                Create Article
                </Link>
            </Button>
        </div>

        {data === undefined || data.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
            <FileIcon className="size-10 text-primary"/>
            </div>
            <h2 className="t-6 text-xl font-semibold">You don&apos;t have any sites created</h2>
            <p className="mb-8 mt-2 text-center text-sm leading-tight text-muted-foreground max-w-sm mx-auto">You currently don&apos;t have any Sites. Please create someo that you can see them right here! </p>
            <Button asChild>
                <Link href={"/dashboard/sites/new"}>
                <PlusCircle/>
                Create site
                </Link>
            </Button>
        </div>
        ): (
            <div className="">
                data
            </div>
        )}
        </>
    )
}