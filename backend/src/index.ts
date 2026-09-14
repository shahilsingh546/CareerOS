import express, {Request, Response} from "express";
import {z} from "zod";
import bcrypt from "bcrypt";
import prisma from "./lib/prisma.js";
const app = express();

const PORT = process.env.PORT || 3000;
const saltRounds = process.env.SALT_ROUND || 10;


app.use(express.json());

const userSignUpSchema = z.object({
    name: z.string().min(3),
    username: z.string().min(5),
    password: z.string().min(8),    
})
const userLogInSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(8)
})
app.get("/health", async(req:Request,res:Response)=>{
    res.json({message: `The server is up and running on port ${PORT}`});
})

app.post("/signup", async(req:Request,res:Response)=>{
    try{
        const result=userSignUpSchema.safeParse(req.body);
        if(!result.success){
            console.log(result);
            console.log("result of safeparsing->", result.success)
            res.status(400).json({
                msg: "Zod validation failed"
            })
        }
        else{
            const {name, username, password, phoneNumber,about} = req.body;
            const bodyResp = req.body;
            console.log(bodyResp);
            const hashedPassword = await bcrypt.hash(password,saltRounds);
            const resp = await prisma.user.create({
            data:{
                name: name,
                username : username,
                password:hashedPassword,
                phoneNumber: phoneNumber,
                about:about
                    }
                })
                console.log(resp)
            }
        }
    catch(e){
        console.log(e);
        return res.status(500).json({msg:"something wrong"})
    }
    res.json({
        msg: "user created successfully"
    })
})

app.post('/login', async(req:Request,res:Response)=>{
    const checkZodValidation = userLogInSchema.safeParse(req.body);
    if(!checkZodValidation.success){
        console.log(checkZodValidation.success)
        console.log(checkZodValidation);
        return res.status(400).json({
            msg: "zod validation failed"
        })
    }
    else{
        try{
            const {username, password} = req.body;
            const resp = await prisma.user.findUnique({
                where: {
                    username: username,
                }
            })
            console.log("resp for login -> ", resp)
        }
        catch(e){
            console.log(e);
            return res.json({
                msg:"something went wrong"
            })
        }
    }
    res.json({msg:"everything is fine"});
})

app.listen(PORT, ()=>{
    console.log(`The app is listening on Port ${PORT}`);
})
