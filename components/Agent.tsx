import React from 'react'
import {cn }from '@/lib/utils'
enum CallStatus {
    CONNECTING = "CONNECTING",
    INACTIVE = "INACTIVE",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED"
    
}

const Agent = ({ userName }: AgentProps) => {
    const message=[
        "what is your name?",
        "my name is srs nice to meet you!"
    ]
    const lastmessage=message[message.length-1]

    const callStatus = CallStatus.ACTIVE;
    const isSpeaking = true;
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
                            <p key={lastmessage} className={cn('transition-opacity duration-500 opacity-0','animate-fadeIn opacity-100')}>
                                {lastmessage}
                            </p>
                    </div>
                </div>
            )}
            <div className="w-full flex justify-center mt-2">
                {callStatus !== 'ACTIVE'?(
                    <button className="btn-call relative">
                            <span  className={cn('animate-ping absolute rounded-full opacity-70',callStatus==='CONNECTING'&&'hidden')} />
                            <span>{callStatus==="INACTIVE"||callStatus==='FINISHED'?'CALL':"----"}</span>
                    </button>
                ):(
                    <button className="btn-disconnect">
                            End
                    </button>
                )}

            </div>
        </>
    )
}

export default Agent
