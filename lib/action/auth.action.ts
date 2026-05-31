"use server"
import {db,auth} from "@/firebase/admin"
import {cookies} from "next/headers"
const ONE_WEAK=60*60*24*7;

export async function signUp(params:SignUpParams){
    const {uid,name,email}=params;
    try{

        const user=await db.collection("users").doc(uid).get();
        if(user.exists){
            return {success:false,message:"User already exists:"}
        }
        await db.collection('users').doc(uid).set({
            name,email
        })
        return {
            success:true,
            message:"User created successfully"
        }
    }catch(e: any){
        console.error("Error signing up:",e);
        if(e.code==="auth/email-already-exists"){
            return { success: false, message: "Email already exists" };
        }
        return { success: false, message: "An error occurred during sign up" };
    }
    
}

export async function signIn(params:SignInParams){
    const {email,idToken}=params;
    try{
        const userRecord=await auth.getUserByEmail(email);
        if(!userRecord){
            return{success:false,message:"User not found"}
        }
        await setSessionCookie(idToken);

    }catch(e: any){
        console.error("Error signing in:",e);
        return { success: false, message: "An error occurred during sign in" };
    }
    
}

export async function setSessionCookie(idToken:string){
    const cookiStore= await cookies();
    const sessionCookie= await auth.createSessionCookie(idToken, { expiresIn: ONE_WEAK*1000 });
    cookiStore.set("session", sessionCookie, {
         maxAge: ONE_WEAK,
          httpOnly: true, 
          secure:process.env.NODE_ENV==="production",
          path:"/",
          sameSite:"lax" 
        });
}

export async function getCurrentUser():Promise<User | null>{ 
    const cookiStore = await cookies();
    const sessionCookie=cookiStore.get("session")?.value;
    if(!sessionCookie){
        return null;
    }
    try{
        const decodedClaims= await auth.verifySessionCookie(sessionCookie,true);
        const userRecord= await db.collection("users").doc(decodedClaims.uid).get();
        if(!userRecord.exists){
            return null;
        }
        return{
            ...userRecord.data(),
            id:userRecord.id
        } as User;

    }catch(e){
        console.error("Error getting current user:",e);
        return null;
    }
}

export async function isAuthenticated(){
    const user=await getCurrentUser();
    return !!user;
}