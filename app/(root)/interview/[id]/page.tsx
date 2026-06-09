import React from 'react'
import { getInterviewById } from '@/lib/action/general.action'
import { redirect } from 'next/navigation'
import { getRandomInterviewCover } from '@/lib/utils';
import DisplayTechIcons from '@/components/DisplayTechIcons'
import Agent from '@/components/Agent';
import { getCurrentUser } from '@/lib/action/auth.action';
const page = async({params}:RouteParams) => {
    const {id}=await params;
    const user = await getCurrentUser();
    const interview= await getInterviewById(id);
    if(!interview) redirect("/interview");
  return (
    <>
        <div className="flex flex-row justify-between">
            <div className="flex flex-row items-baseline gap-4"> 
                <div className="flex flex-row gap-4">
                        <img src={getRandomInterviewCover()} alt="interview cover" className="rounded-full size-[40px] object-cover" width={40} height={40}/>
                        <h3>{interview.role}</h3>
                </div>
                <DisplayTechIcons techStack={interview.techstack} />
            </div>
            <p className="bg-dark-200 rounded-lg px-4 py-2 h-fit capitalize">{interview.type}</p>
        </div>
            <Agent
                userName={user?.name || "User"}
                userId={user?.id}
                interviewId={id}
                type="interview"
                questions={interview.questions}
            />
    </>
  )
}

export default page