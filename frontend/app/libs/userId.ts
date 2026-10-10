import {headers} from "next/headers";

export async function getUserId(){
    const headerList = await headers();
    const userId = headerList.get('userId');
    if(!userId){
        return null
    }
    return userId
}