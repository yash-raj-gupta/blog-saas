import { Button } from "@/components/ui/button";
import { FileIcon, PlusCircle } from "lucide-react";
import Link from "next/link";

interface iAppProps {
    title: string;
    description: string;
    buttonText: string;
    href:string;
}

export function EmptyState({
    title,
    description,
    buttonText,
    href
}: iAppProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
            <FileIcon className="size-10 text-primary"/>
            </div>
            <h2 className="t-6 text-xl font-semibold">{title}</h2>
            <p className="mb-8 mt-2 text-center text-sm leading-tight text-muted-foreground max-w-sm mx-auto">{description}</p>
            <Button asChild>
                <Link href={href}>
                <PlusCircle className="size-4 mr-2"/>
                {buttonText}
                </Link>
            </Button>
        </div>
    )
}