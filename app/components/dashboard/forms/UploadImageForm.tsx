"use client"
import { UploadDropzone } from "@/app/utils/UploadthingComponents";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { SubmitButton } from "../SubmitButtons";
import { toast } from "sonner";
import { UpdateImage } from "@/app/actions";

interface iAppsProps {
    siteId: string,
}

export function UploadImageForm ({siteId}: iAppsProps) {
    const [imageUrl, setImageUrl] = useState<undefined | string>(undefined)
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Image
                </CardTitle>
                <CardDescription>
                    This is the image of your site. You can change it here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {
                    imageUrl ? (
                        <Image
                        src={imageUrl}
                        alt="Uploaded Image"
                        width={200}
                        height={200}
                        className="size-[200px] object-cover rounded-lg"
                        />
                    ): (
                        <UploadDropzone endpoint="imageUploader" className="" 
                        onClientUploadComplete={(res) => {
                            setImageUrl(res[0].url)
                            toast.success("Image uploaded successfully")
                        }}
                        onUploadError={() => {
                            toast.error("Image upload failed")
                        }}
                        />
                    )
                }
            </CardContent>
            <CardFooter>
                <form action={UpdateImage}>
                    <input type="hidden" name="siteId" value={siteId} />
                    <input type="hidden" name="imageUrl" value={imageUrl} />
                <SubmitButton text="Change Image" className=""/>
                </form>
            </CardFooter>
        </Card>
    )
}