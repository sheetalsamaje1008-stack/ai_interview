"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {toast} from "sonner"
import * as z from "zod";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/FormInput";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signUp,signIn} from "@/lib/action/auth.action";


type FormType = "sign-up" | "sign-in";
const authFormSchema=((type:FormType)=>{
    return z.object({
      name:type==="sign-up"?z.string().min(3):z.string().optional(),
      email:z.string().email(),
      password:z.string().min(3),
    })
})

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema=authFormSchema(type)
  const isSignIn= type==="sign-in"
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password:"",
    },
  });

  async function onSubmit (data: z.infer<typeof formSchema>) {
     try{
        if(!isSignIn){
          const {name,email,password}=data
          const userCredential= await createUserWithEmailAndPassword(auth,email,password)
          const result=await signUp({
            uid:userCredential.user.uid,
            name:name!,
            email,
            password
          })
          if(!result?.success){
            toast.error(result?.message)
          }
          toast.success("Account created successfully!")
          router.push('/sign-in')
        }
        else{
          const {email,password}=data
          const userCredential= await signInWithEmailAndPassword(auth,email,password)
          const idToken=await userCredential.user.getIdToken()
          await signIn({
            email,idToken
          })
          toast.success("Signed in successfully!")
          router.push('/')
        }
     }catch(error){
      toast.error("the error is "+error)
     }
  };

  return (
    <div className="card-border lg:min-w-141 p-6">
      <div className="flex flex-col card px-10 py-14 mb-2">
        <div className="flex flex-row justify-center gap-2">
          <Image
            src="/logo.svg"
            alt="logo"
            width={38}
            height={32}
          />
          <h2 className="text-primary-100">Prepwise</h2>
        </div>
        <h3 className="text-center">Practice job interviews with AI </h3>
        <form 
        onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-6 w-full mt-6">
        
          {!isSignIn &&(<FormInput 
              control={form.control}
              name="name"
              label="Name"
              placeholder="type your name"
            />)}
          <FormInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="type your email"
            type="email"
          />
          <FormInput
            control={form.control}
            name="password"
            label="password"
            placeholder="type your password"
            type="password"
          />
        <Button type="submit" className="w-full bg-primary-100 hover:bg-primary-200">
        {isSignIn ? "Sign In" : "create account"}
        </Button>
        </form>
          <p className="text-center text-primary-100">
            {isSignIn?"No account yet?":"have account already?"}
            <Link href={isSignIn?"/sign-up":"/sign-in"}>
              {!isSignIn?"sign-in":"sigh-up"}
            </Link>
          </p>
        </div>
    </div>
  );
};

export default AuthForm;