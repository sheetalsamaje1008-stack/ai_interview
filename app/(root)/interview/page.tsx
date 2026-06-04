import React from 'react'
import Agent from '@/components/Agent'
const page = () => {
  return (
    <div>
        <h2>Interview Generation</h2>
        <Agent userName="yours" userId="123" type="generate"/>
    </div>
  )
}

export default page