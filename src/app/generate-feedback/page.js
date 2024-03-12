import React from 'react'
import Left from '../../../components/Left'
import GenerateFeedback from '../../../components/GenerateFeedback'

function page() {
    return (
        <div className='flex bg-gray-100'>
            <Left className='flex-none' />
            <div className='ml-10 w-[1px] h-screen bg-gray-200 drop-shadow-sm' />
            <GenerateFeedback className="flex-auto" />
        </div>
    )
}

export default page