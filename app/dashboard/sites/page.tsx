import { Button } from "@/components/ui/button";
import { FileIcon, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function SitesRoute() {
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
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
            <FileIcon className="size-10 text-primary"/>
            </div>
            <h2 className="t-6 text-xl font-semibold">You don&apos;t have any sites created</h2>
            <p className="mb-8 mt-2 text-center text-sm leading-tight text-muted-foreground max-w-sm mx-auto">You currently don&apos;t have any Sites. Please create someo that you can see them right here! </p>
        </div>
        </>
    )
}