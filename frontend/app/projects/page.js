import React from 'react'
import { Button, Header } from '@/components'

const page = () => {
  return (
    <div className='main flex flex-col py-4 gap-10'>
        <Header />
        <div className='flex flex-col gap-6'>
            <div className='flex justify-between'>
                <h1>Project Name</h1>
                <Button type="edit" label="Edit Project" />
            </div>
            <div className='flex gap-6'>
                <p>
                    Lorem ipsum dolor sit amet consectetur. Tellus a dolor dolor posuere commodo viverra. Quis velit purus nulla ultricies vitae orci. Ornare at orci in venenatis nulla sed faucibus turpis. Rutrum pellentesque dui sem lobortis fringilla cras. Nulla quam et gravida ornare nisi. Consectetur ligula est neque nisi in justo nisi facilisi fusce. Magna cursus aliquet in enim consectetur egestas. Nunc molestie orci orci sed. Consequat pretium bibendum fermentum augue hendrerit lobortis vestibulum odio. Varius sed habitant volutpat vestibulum. Ipsum ut orci nec mauris enim euismod posuere eget. Nunc felis orci vitae tristique arcu consequat odio ipsum. Vestibulum nunc enim pellentesque sed aenean purus in.
                    In mi purus mi lorem gravida quis. Dictum ultrices dignissim massa faucibus purus quis. Purus habitasse ut aliquam nibh velit. Ornare arcu nisl magnis leo sodales sit. Ultrices interdum interdum nisl risus semper at et. Egestas quis nibh lectus viverra cursus bibendum at mi nisl. Tristique sed fermentum ut accumsan cras. Potenti amet sollicitudin morbi vestibulum suspendisse non. Turpis laoreet tempor nisl dictum.
                </p>
                <div>
                    <div className='bg-white50 rounded-sm w-[356px] p-6'>
                        <p>Completed By:</p>
                        <p>Deadline:</p>
                    </div>
                </div>
            </div> 
        </div>
    </div>
  )
}

export default page