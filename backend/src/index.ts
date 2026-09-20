import express, {NextFunction, Request, Response} from "express";
import {z} from "zod";
import bcrypt from "bcrypt";
import prisma from "./lib/prisma.js";
import jwt, {JwtPayload} from "jsonwebtoken";
import cookieParser from "cookie-parser";
const app = express();

const PORT = process.env.PORT || 3000;
const saltRounds = parseInt(process.env.SALT_ROUND||"10") || 10;
const secretKey = process.env.secretKey;

app.use(express.json());
app.use(cookieParser());

const userSignUpSchema = z.object({
    name: z.string().min(3),
    username: z.string().min(5),
    password: z.string().min(8),   
    phoneNumber: z.int().optional(),
    about: z.string().optional()
})
const userLogInSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(8)
})

const applicationSchema = z.object({
    companyName:z.string().min(2),
    jobPost:z.string(),
    yoe: z.int().optional(),
    skills: z.string().optional(),
    packageOffer: z.string().optional(),
    notes: z.string().optional()
})

const currentStatusSchema = z.enum(["OA", "APPLIED", "INTERVIEW", "HR", "OFFER", "REJECTED", "WITHDRAWN"])

interface AuthPayload extends JwtPayload {
    userId:number
}

app.get("/health", async(req:Request,res:Response)=>{
    res.json({message: `The server is up and running on port ${PORT}`});
})

function userMiddleware(req:Request,res:Response,next:NextFunction){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({msg:"User not authenticated"})
    }
    if(!secretKey){
        return res.status(401).json({msg: "unauthorised request"})
    }
    try{
        const decoded = jwt.verify(token,secretKey) as AuthPayload
        req.userId = decoded.userId;
        next();
    }
    catch{
        return res.status(401).json({msg:"Invalid or expired token"})
    }
}

app.post("/signup", async(req:Request,res:Response)=>{
    try{
        const result=userSignUpSchema.safeParse(req.body);
        if(!result.success){
            console.log(result);
            console.log("result of safeparsing->", result.success)
            return res.status(400).json({
                msg: "Zod validation failed"
            })
        }
        else{
            const {name, username, password, phoneNumber,about} = result.data;
            const bodyResp = req.body;
            console.log(bodyResp);
            const hashedPassword = await bcrypt.hash(password,saltRounds);
            const resp = await prisma.user.create({
            data:{
                name: name,
                username : username,
                password:hashedPassword,
                phoneNumber: phoneNumber ?? null,
                about:about ?? null
                    }
                })
                console.log(resp)
            }
            return res.json({
                msg: "user created successfully"
    })
        }
    catch(e){
        console.log(e);
        return res.status(500).json({msg:"something wrong"})
    }
    
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
            const {username, password} = checkZodValidation.data;
            const resp = await prisma.user.findUnique({
                where: {
                    username: username,
                }
            })
            console.log("resp-> ",resp)
            if(!resp){
                return res.status(401).json({
                    msg: "Username not found !"
                })
            }
            if(!secretKey){
                return res.status(401).json({msg: "unauthorized request"})
            }
            else{
                const isMatch = await bcrypt.compare(password,resp?.password || "Null")
                console.log("is match -> ", isMatch)
                if(!isMatch){
                    return res.status(401).json({
                        msg: "Password is not valid ! please enter a valid password"
                    })
                }
                else{
                    console.log("before jwt sign")
                    const token = await jwt.sign({userId:resp.id},secretKey, {expiresIn:"7d"})
                    console.log("after jwt sign")
                    res.cookie("token", token, {
                        httpOnly:true,
                        secure: false,
                        sameSite: "lax",
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    })
                    return res.status(200).json({
                        msg: "user is logged in",

                    })
                }
            }
        }
        catch(e){
            console.log(e);
            return res.status(500).json({
                msg:"something went wrong"
            })
        }
    }

})

app.post('/logout', async(req:Request,res:Response)=>{
    res.clearCookie("token",{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    });

    return res.status(200).json({
        msg: "logout successfull"
    });
});

app.post('/application',userMiddleware, async(req:Request,res:Response)=>{
    const checkZodValidationOfApplication = applicationSchema.safeParse(req.body);
    if(!checkZodValidationOfApplication.success){
        return res.status(400).json({msg:"Invalid schema"})
    }
    const {companyName,jobPost,yoe,skills,packageOffer,notes} = checkZodValidationOfApplication.data;
    try{
        const userId = req.userId;

        if(!userId){
            return res.status(401).json({msg:"unauthorized request"})
        }
        const respApplication = await prisma.application.create({
            data: {
                userId: userId,
                companyName: companyName,
                jobPost: jobPost,
                yoe:yoe ?? null,
                skills: skills ?? null,
                packageOffer: packageOffer ?? null,
                notes:notes ?? null
            }
        })
        console.log(respApplication);
        return res.json({
            msg:"application created successfully"
        })

    }
    catch{
        res.status(500).json({msg: "something went wrong"})
    }
})

app.get('/application', userMiddleware, async(req:Request,res:Response)=>{
    const userId = req.userId
    if(!userId){
        return res.status(401).json({msg:"unauthorized user"})
    }
    try{
        const resp = await prisma.application.findMany({
            where: {
                userId: userId
            }
        })
        console.log(resp)
        return res.json({
            response: resp
        })
    }
    catch{
        return res.status(500).json({msg: "Something went wrong"})
    }
})

app.get("/application/:id", userMiddleware,async(req:Request,res:Response)=>{
    const userId = req.userId
    if(!userId){
        return res.status(401).json({msg:"user not authorized"})
    }
    const id = parseInt(req.params.id as string);
    if(Number.isNaN(id)){
        return res.status(400).json({msg: "please enter correct id"})
    }
    console.log("id -> ", id)
    try{
        console.log("in")
        const application = await prisma.application.findFirst({
        where: {
            id: id,
            userId: userId
        }
    })
    console.log(application)
    if(!application){
        return res.status(404).json({msg: "application not found"})
    }
    return res.json({application})
    }
    
    catch(e){
        console.log(e);
        return res.status(500).json({error:e,msg:"something went wrong"})
    }
})

app.patch("/application/:id", userMiddleware, async(req:Request,res:Response)=>{
    const userId = req.userId;
    if(!userId){
        return res.status(401).json({msg:"user not authorized"})
    }
    const applicationId = parseInt(req.params.id as string)

    if(Number.isNaN(applicationId)){
        return res.status(400).json({msg:"please enter a valid id"})
    }
    const status = currentStatusSchema.safeParse(req.body.currentStatus)
    console.log("status schema -> ", status)
    if(!status.success){
        return res.status(400).json({msg:"please give correct value of currentStatus"})
    }
    console.log(status.data)
    const currentStatus = status.data;
    try{

        const application = await prisma.application.findFirst({
            where:{
                id: applicationId,
                userId: userId
            }
        })
        if(!application){
            return res.status(404).json({
                msg: "application not found"
            })
        }
        const applicationUpdate = await prisma.application.update({
            where: {
                id:application.id,
            },
            data: {
                currentStatus: currentStatus
            }
        });
        if(!applicationUpdate){
            return res.status(400).json({msg: "invalid request"})
        }
        return res.json({msg: "successfully updated the application"})
    }
    catch(e){
        console.log("error in updating data -> ", e);
        return res.status(500).json({msg:"error in updating data"})
    }
})

app.delete("/application/:id",userMiddleware, async(req:Request, res: Response)=>{
    const userId = req.userId;
    if(!userId){
        return res.status(401).json({
            msg: "user not authorized"
        })
    }
    const applicationId = parseInt(req.params.id as string)

    if(Number.isNaN(applicationId)){
        return res.status(400).json({msg:"please enter a valid id"})
    }
    try{
        console.log("userId ", userId)
        console.log()
        const application = await prisma.application.findFirst({
        where: {
            id: applicationId,
            userId: userId
        }
    })
    console.log(application)
    if(!application){
        return res.status(404).json({msg: "application not found"})
    }
    const resp = await prisma.application.delete({
        where:{
            id: application.id
        }
    })
    if(!resp){
        return res.status(500).json({msg: "prisma error"})
    }
    return res.json({msg: "successfully deleted the application"})
    }
    catch(e){
        console.log(e);
        return res.status(500).json({msg: "something went wrong"})
    }
})

app.listen(PORT, ()=>{
    console.log(`The app is listening on Port ${PORT}`);
})
