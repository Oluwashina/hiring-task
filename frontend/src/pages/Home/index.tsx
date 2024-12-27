import * as React from 'react';


const HomePage = () => {
    return ( 
        <>
        {/* Overview section i.e verification section/metrics */}
            <div className='border border-gray-200 rounded-lg shadow-sm py-5 px-5 mt-5'>
                <div className='flex justify-between items-center'>
                    <div>
                        <h6 className='text-base text-[#0d0d0d] font-medium'>Hi Johnson, you are almost done.</h6>
                        <p className='text-sm text-[#5b5e61] font-medium'>Please complete few steps to setup your account completely.</p>
                    </div>
                    <div>
                    <button
                            type="submit"
                            className="w-full disabled:bg-opacity-[0.6] font-medium bg-[#ede8fc] text-sm text-[#6f46eb] py-3 px-5 rounded-lg hover:bg-opacity-[0.9]"
                        >
                            Setup Account 
                        </button>
                    </div>
                </div>

                <div className='mt-5 bg-gray-200 w-full h-[1px]'></div>
                
                <div className='grid grid-cols-4 gap-3 mt-5'>
                    <div className='flex gap-3 items-center'>
                        <div className='rounded-full w-[45px] h-[45px] border border-[#845df0] flex justify-center items-center bg-[#ede8fc]'>

                        </div>
                        <div>
                            <h5 className='text-sm text-[#6b6d70] '>Completed Tasks</h5>
                            <p className='text-lg font-semibold text-[#000000]'>10.2K</p>
                        </div>
                    </div>

                    <div className='flex gap-3 items-center'>
                        <div className='rounded-full w-[45px] h-[45px] border border-[#845df0] flex justify-center items-center bg-[#ede8fc]'>

                        </div>
                        <div>
                             <h5 className='text-sm text-[#6b6d70] '>Assigned Tasks</h5>
                            <p className='text-lg font-semibold text-[#000000]'>3.5K</p>
                        </div>
                    </div>

                    <div className='flex gap-3 items-center'>
                        <div className='rounded-full w-[45px] h-[45px] border border-[#845df0] flex justify-center items-center bg-[#ede8fc]'>

                        </div>
                        <div>
                            <h5 className='text-sm text-[#6b6d70] '>All Boards</h5>
                            <p className='text-lg font-semibold text-[#000000]'>350</p>
                        </div>
                    </div>

                    <div className='flex gap-3 items-center'>
                        <div className='rounded-full w-[45px] h-[45px] border border-[#845df0] flex justify-center items-center bg-[#ede8fc]'>

                        </div>
                        <div>
                            <h5 className='text-sm text-[#6b6d70]'>Scheduled Tasks</h5>
                            <p className='text-lg font-semibold text-[#000000]'>23</p>
                        </div>
                    </div>

                </div>

            </div>

            {/* Tasks/ Annoucements section */}
            <div className='mt-5 grid grid-cols-2 gap-4'>
                <div className='border border-gray-200 rounded-lg shadow-sm py-5 px-5'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h6 className='text-sm font-semibold text-[#000000]'>Tasks Priorities</h6>
                            <p className='text-sm text-[#6b6d70]'>Team tasks sorted by priority</p>
                        </div>
                        <div>
                        <button
                            type="submit"
                            className="w-full disabled:bg-opacity-[0.6] font-medium bg-[#ede8fc] text-sm text-[#6f46eb] py-3 px-4 rounded-lg hover:bg-opacity-[0.9]"
                        >
                            Add Task 
                        </button>
                        </div>
                    </div>
                </div>
                <div className='border border-gray-200 rounded-lg shadow-sm py-5 px-5'>

                    <div className='flex justify-between items-center'>
                        <div>
                            <h6 className='text-sm font-semibold text-[#000000]'>Announcements</h6>
                            <p className='text-sm text-[#6b6d70]'>From personal and team project</p>
                        </div>
                        <div>
                      
                        </div>
                    </div>

                    {/* empty state layout */}
                    <div className='flex flex-col justify-center items-center min-h-[400px]'>
                            <div className='bg-[#F7F7F7] w-[120px] h-[120px] rounded-full'>

                            </div>
                            <div className='mt-5'>
                                <h6 className='text-[#000000] text-lg font-medium'>No tasks has founded</h6>
                            </div>
                            <div className='mt-1 max-w-[250px] mx-auto'>
                                <p className='text-sm text-[#3A3A3A] text-center'>Click here to add <span className='text-[#6f46eb] cursor-pointer'>New task</span></p>
                            </div>
                     </div>

                </div>

            </div>

            {/* Teams section */}
            <div className='border border-gray-200 rounded-lg shadow-sm py-5 px-5 mt-5'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h6 className='text-sm font-semibold text-[#000000]'>My Teams</h6>
                            <p className='text-sm text-[#6b6d70]'>Teams with assigned tasks</p>
                        </div>
                        <div>
                        <button
                            type="submit"
                            className="w-full disabled:bg-opacity-[0.6] font-medium bg-[#ede8fc] text-sm text-[#6f46eb] py-3 px-4 rounded-lg hover:bg-opacity-[0.9]"
                        >
                            Add Team 
                        </button>
                        </div>
                    </div>

                     {/* empty state layout */}
                     <div className='flex flex-col justify-center items-center min-h-[400px]'>
                            <div className='bg-[#F7F7F7] w-[120px] h-[120px] rounded-full'>

                            </div>
                            <div className='mt-5'>
                                <h6 className='text-[#000000] text-lg font-medium'>No teams has created</h6>
                            </div>
                            <div className='mt-1 max-w-[250px] mx-auto'>
                                <p className='text-sm text-[#3A3A3A] text-center'>Click here to add <span className='text-[#6f46eb] cursor-pointer'>New team</span></p>
                            </div>
                     </div>
            </div>


        </>
     );
}
 
export default HomePage;