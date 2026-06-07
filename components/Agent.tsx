'use client'
import React, { useEffect, useState } from 'react'
import {cn }from '@/lib/utils'
import {vapi} from '@/lib/vapi.sdk'
import { useRouter } from 'next/navigation'
enum CallStatus {
    CONNECTING = "CONNECTING",
    INACTIVE = "INACTIVE",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED"
    
}
interface SavedMessage{
    role:"user"|"assistant"|"system",
    content:string,
}

const Agent = ({ userName,userId,type }: AgentProps) => {
    const router = useRouter();
    const [isSpeaking, setisSpeaking] = useState(false)
    const [callStatus, setcallStauts] = useState<CallStatus>(CallStatus.INACTIVE)
    const [message, setmessage] = useState<SavedMessage[]>([])

    useEffect(() => {
      const onCallStart=()=>setcallStauts(CallStatus.ACTIVE)
        const onCallEnd=()=>setcallStauts(CallStatus.FINISHED)
        const onSpeachStart=()=>setisSpeaking(true)
        const onSpeachEnd=()=>setisSpeaking(false)
        const onMessage=(message:Message)=>{
            if(message.type==="transcript" && message.transcriptType==="final"){
                const newMessage={role:message.role,content:message.transcript}
                setmessage((prev)=>[...prev,newMessage])
            }
        }
        const onError=(e:Error)=>console.log("message:",e)

        vapi.on('call-start',onCallStart)
        vapi.on('call-end',onCallEnd)
        vapi.on("speech-start",onSpeachStart)
        vapi.on('speech-end',onSpeachEnd)
        vapi.on('message',onMessage)
        vapi.on('error',onError)

        return ()=> {
                vapi.off('call-start',onCallStart)
                vapi.off('call-end',onCallEnd)
                vapi.off("speech-start",onSpeachStart)
                vapi.off('speech-end',onSpeachEnd)
                vapi.off('message',onMessage)
                vapi.off('error',onError)
           
        }
    }, [])
    
    useEffect(()=>{
        if(callStatus===CallStatus.FINISHED) router.push('/');
    },[message,callStatus,userId,type])

    const handleCall=async()=>{
        setcallStauts(CallStatus.CONNECTING);
        vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!,{
            variableValues:{
                username:userName,
                userid:userId,
            }
        })
    }

    const handleDisconnect=async()=>{
        setcallStauts(CallStatus.FINISHED);
        vapi.end()
    }

    const latestMessage=message[message.length-1]?.content

    const isCallInactiveOrFinished= callStatus===CallStatus.INACTIVE || callStatus===CallStatus.FINISHED
    
    return (
        <>
            <div className="call-view">
                <div className="card-interviewer">
                    <div className="avatar">
                        <img src='/ai-avatar.png' alt="AI Assistant" width={65} height={54} className={`object-cover `} />
                        {isSpeaking && <span className={`${isSpeaking ? 'animate-speak' : ''}`}></span>}
                    </div>
                    <h3 className="text-primary-100">Ai Interviewer</h3>
                </div>
                <div className="card-border">
                    <div className="card-content">
                        <img src="/user-avatar.png" alt="User" width={540} height={540} className={`object-cover rounded-full size-[120px]`} />
                        <h3 className="text-primary-100">{userName}</h3>
                    </div>

                </div>
            </div>
            {message.length>0 && (
                <div className="transcript-border">
                    <div className="transcript">
                            <p key={latestMessage} className={cn('transition-opacity duration-500 opacity-0','animate-fadeIn opacity-100')}>
                                {latestMessage}
                            </p>
                    </div>
                </div>
            )}
            <div className="w-full flex justify-center mt-2">
                {callStatus !== CallStatus.ACTIVE?(
                    <button className="btn-call relative" onClick={handleCall}>
                            <span  className={cn('animate-ping absolute rounded-full opacity-70',callStatus===CallStatus.CONNECTING&&'hidden')} />
                            <span>{isCallInactiveOrFinished?'CALL':"----"}</span>
                    </button>
                ):(
                    <button className="btn-disconnect" onClick={handleDisconnect}>
                            End
                    </button>
                )}

            </div>
        </>
    )
}

export default Agent
