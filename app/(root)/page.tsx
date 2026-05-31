import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'

const page = () => {
  return (
    <>
    <section className="card-cta">
          <div className="flex flex-col gap-4 max-w-lg">
              <h2 className="text-primary-100">Get Interview Ready AI Powered Practice</h2>
              <p className="text-lg"> Practice on th real interview question & get ready for job</p>
              <Button asChild className="border-t-primary max-sm:w-full">
                <Link href="/interview">Start an Interview</Link>
              </Button>
          </div>
          <img src="/robot.png" alt="cool robo" width={400} height={400} className="max-sm:hidden"/>
    </section>
    <section className="flex flex-col mt-8 gap-6">
      <h2> Your Interviews </h2>
          <div className="interviews-section">
            {dummyInterviews.map((interview)=>(
              <InterviewCard {...interview} key={interview.id}/>
            ))}
            {/* <p >you have not taken any interview yet?</p> */}
          </div>
    </section>

    <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {dummyInterviews.map((interview)=>(
              <InterviewCard {...interview} key={interview.id}/>
            ))}
          {/* <p>There are no interview avalible</p> */}
        </div>
    </section>
    </>
  )
}

export default page
