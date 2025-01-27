import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Atom } from "lucide-react";
import Link from "next/link";

export default function ArticleCreationRoute({params}: {params: {siteId: string}}) {
        return  (
            <>
            <div className="flex items-center">
                <Button size="icon" variant='outline' className="mr-3 " asChild>
                <Link href={`/dashboard/sites/${params.siteId}`}>
                <ArrowLeft className="size-4"/>
                 </Link>
                </Button>
                <h1 className="font-semibold text-2xl">Create Article</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Article Details</CardTitle>
                    <CardDescription>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui ac nisi
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label>Title</Label>
                            <Input placeholder="Nextjs blogging application "/>
                        </div>
                        <div className="grid gap-2">
                            <Label>Slug</Label>
                            <Input placeholder="Article Slug "/>
                            <Button className="w-fit" variant="secondary" type="button">
                                <Atom className="size-4 mr-2"/> Generate Slug
                            </Button>
                        </div>
                        <div className="grid gap-2">
                            <Label>Small Description</Label>
                            <Textarea placeholder="Small Description for your blog article..." className="h-32"/>
                        </div>
                    </form>
                </CardContent>
            </Card>
            </>
        )
  };