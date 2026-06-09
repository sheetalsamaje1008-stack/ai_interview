import React from 'react'
import dayjs from 'dayjs'
import { getRandomInterviewCover } from '@/lib/utils'
import Link from 'next/link';
import { Button } from './ui/button';
import DisplayTechIcons from './DisplayTechIcons';
import { getFeedbackByInterviewId } from '@/lib/action/general.action';

const InterviewCard = async({id, userId, role, type, techstack,createdAt}:InterviewCardProps) => {
    const  feedback= id && userId? await getFeedbackByInterviewId({interviewId:id,userId}):null
    const normalizedtype=/mix/gi.test(type)?"Mixed":type;

    const formattedDate=dayjs(feedback?.createdAt||createdAt||Date.now()).format("MMM D, YYYY")
  return (
    <div className="card-border  w-[366px] min-h-96">
        <div className="card-interview">
            <div>
                <div className="absolute top-0 right-0 px-4 py-2 rounded-lg bg-light-600">
                    <p className="badge-text">{normalizedtype}</p>
                </div>
                <img src={getRandomInterviewCover()} alt="interview cover" className=" absoluterounded-full top-0" width={90} height={90}/>
                <h3 className="mt-5 capitalize">{role} interview</h3>

                <div className="flex flex-row mt-3 gap-4">
                        <div className="flex flex-row mt-2 gap-3">
                            <img src='/calendar.svg' alt="calendar logo" width={22} height={22}  />
                            <p>{formattedDate}</p>
                        </div>
                        <div className="flex flex-row mt-2 gap-3">
                            <img src='/star.svg' alt="star logo" width={22} height={22} />
                            <p>{feedback?.totalScore || '---'}/100</p>
                        </div>
                </div>
                <p className="line-clamp-2 mt-3">
                    {feedback?.finalAssessment||"you have not given the interview please give the inteview"}
                </p>
            </div>
            <div className="flex flex-row justify-between mt-5">
                    <DisplayTechIcons techStack={techstack} />
                    <Button className="btn-primary capitalize">

                    <Link href={feedback?`/interview/${id}/feedback`:`/interview/${id}`}>
                     {feedback?'check feedback':'view interview'} 
                    </Link>
                    </Button>
            </div>
        </div>
        
    </div>
  )
}

export default InterviewCard