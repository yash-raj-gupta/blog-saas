import { prisma } from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import DefaultImage from '@/public/default.png'
import { EmptyState } from "@/app/components/dashboard/EmptyState";

async function getData(userId: string) {
    const data = await prisma.site.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        }
    });

    return data;
}
export default async function SitesRoute() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user){
        return redirect('/api/auth/login');
    }

    const data = await getData(user.id)
    return (
        <>
        <div className="flex w-full justify-end">
            <Button asChild>
                <Link href={"/dashboard/sites/new"}>
                <PlusCircle/>
                Create site
                </Link>
            </Button>
        </div>
        {data === undefined || data.length === 0 ? (
            <EmptyState title="You don&apos;t have any sites created" description="You currently don&apos;t have any Sites. Please create someo that you can see them right here!"
            href="/dashboard/sites/new" buttonText="Create site"
            />
        ): (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                {data.map((item) => (
                    <Card key={item.id}>
                        <Image
                        src={item.imageUrl ?? DefaultImage}
                        alt={item.name}
                        className="rounded-t-lg object-cover w-full h-[200px]"
                        width={400}
                        height={200}
                        />
                    <CardHeader>
                        <CardTitle className="truncate">
                            {item.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                            {item.description}
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link href={`/dashboard/sites/${item.id}`}>
                            View Articles
                            </Link>
                        </Button>
                    </CardFooter>
                    </Card>
                ))}
            </div>
        )}
        </>
    )
}