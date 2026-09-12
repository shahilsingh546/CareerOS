import express, {Request, Response} from "express";
import {z} from "zod";
import prisma from "./lib/prisma.js";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const userSchema = z.object({
    name: z.string().min(3),
    username: z.string().min(3),
    password: z.string().min(8),    
})

app.get("/health", async(req:Request,res:Response)=>{
    res.json({message: `The server is up and running on port ${PORT}`});
})

app.post("/signup", async(req:Request,res:Response)=>{
    try{
        const result=userSchema.safeParse(req.body);
        console.log(result);
        const {name, username, password, phoneNumber,about} = req.body;
        const bodyResp = req.body;
        console.log(bodyResp);
        
        const resp = await prisma.user.create({
        data:{
            name: name,
            username : username,
            password:password,
            phoneNumber: phoneNumber,
            about:about
                }
            })
            console.log(resp)
        }
    catch(e){
        console.log(e);
        return res.status(500).json({msg:"something wrong"})
    }
    res.json({
        msg: "user created successfully"
    })
})

app.listen(PORT, ()=>{
    console.log(`The app is listening on Port ${PORT}`);
})
