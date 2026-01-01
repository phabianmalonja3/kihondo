import * as z from "zod"


export const PackageSchema = z.object({
     image:z.file(),
     name:z.string().min(4),
     location:z.string().min(2),
     price:z.string().min(1),
})