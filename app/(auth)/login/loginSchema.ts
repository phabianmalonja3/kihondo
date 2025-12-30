import * as z from "zod"
import { object, string } from 'zod';
 
export const signInSchema = z.object({
 email:z.string().email(),
 password:z.string().min(4)
   
})