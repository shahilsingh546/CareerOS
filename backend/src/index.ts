import express, {Request, Response} from "express";
import {z} from "zod";
import bcrypt from "bcrypt";
import prisma from "./lib/prisma.js";
import jwt from "jsonwebtoken";
const app = express();

const PORT = process.env.PORT || 3000;
const saltRounds = parseInt(process.env.SALT_ROUND||"10") || 10;
const secretKey = process.env.secretKey || "mySuperSecretKey"

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
            if(!resp){
                return res.status(401).json({
                    msg: "Username not found !"
                })
            }
            else{
                const isMatch = await bcrypt.compare(password,resp?.password || "Null")
                console.log("is match -> ", isMatch)
                if(!isMatch){
                    res.status(401).json({
                        msg: "Password is not valid ! please enter a valid password"
                    })
                }
                else{
                    const token = jwt.sign(username,secretKey)

                    res.status(200).json({
                        msg: "user is logged in",
                        token: token
                    })
                }
            }
            console.log("resp for login -> ", resp)
            
        }
        catch(e){
            console.log(e);
            return res.json({
                msg:"something went wrong"
            })
        }
    }

})

app.listen(PORT, ()=>{
    console.log(`The app is listening on Port ${PORT}`);
})
