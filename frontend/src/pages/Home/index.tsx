import {useState} from 'react';
import { MoreHoriz, Add,SellOutlined, Event, EditOutlined, DeleteOutline,EventNoteOutlined,ContentPaste, ChevronRight } from "@mui/icons-material";
import warning_icon from '../../assets/warning.svg'
import ModalComponent from '../../components/Modal';
import { Formik, Form, FormikHelpers } from "formik";
import { createTaskValidator } from "../../validationSchema/validator";

const HomePage = () => {

    const [openTask, setTaskOpen] = useState(false);

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
      setShowMenu(!showMenu);
    };

    const [activeTab, setActiveTab] = useState("upcoming"); // Default active tab

    const tabs = [
      { id: "upcoming", label: "4 Upcoming" },
      { id: "overdue", label: "2 Overdue" },
      { id: "completed", label: "0 Completed" },
    ];

    interface Values {
        title: string;
        description: string;
        duedate: string;
    }

    const handleSubmit = (values: Values) => {
        // e.preventDefault()
       console.log(values)
       
    };


    return ( 
        <>

        {/* Add Task Modal */}
        <ModalComponent
        isOpen={openTask}
        title="Create tasks"
        onClose={() => {
          setTaskOpen(false);
        }}
        titleBorder
      >
        <div className='py-5'>
        <Formik
                initialValues={{
                    title: "",
                    description: "",
                    duedate: ""
                }}
                validationSchema={createTaskValidator}
                onSubmit={(
                    values: Values,
                    { setSubmitting }: FormikHelpers<Values>
                ) => {
                    handleSubmit(values);
                }}
                >
        {({
            handleChange,
            isSubmitting,
            handleSubmit,
            handleBlur,
            values,
            touched,
            errors,
            isValid,
            dirty,
        }) => (
            <Form className="" onSubmit={handleSubmit}>
            <div className="space-y-4">
                {/* Task Name */}
                <div>
                <label htmlFor="title" className="block text-xs mb-2 font-medium text-gray-700">
                    Task Name
                </label>
                <div className="relative">
                <input
                    type="text"
                    name="title"
                 
                    className={
                        touched.title && errors.title
                        ? "appearance-none w-full placeholder:text-[#949494] placeholder:text-sm  text-[#121212] text-sm focus:border-[#F74445] focus:outline-none rounded-md border border-[#B92043] bg-[#FEECEC] py-3 px-4"
                        : "appearance-none block text-sm w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-purple-600 focus:outline-none"
                    }
                    placeholder="Enter your task title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                        />
                    {touched.title && errors.title ?
                   ( <img src={warning_icon} alt="warning" className='w-[14px] h-[14px] absolute top-1/2 transform text-[#3A3A3A] text-sm font-medium -translate-y-1/2 right-6 cursor-pointer' />): null}
                   </div>
                   {touched.title && errors.title ? (
                    <div className="flex gap-1 mt-1 items-center">
                        <img src={warning_icon} alt="warning" className='w-[14px] h-[14px]' />
                        <small className="text-[#F74445] font-medium text-xs">
                        {touched.title && errors.title}
                        </small>
                    </div>
                    ) : null}
                </div>
                
                {/* Due Date */}
                <div>
                <label htmlFor="duedate" className="block text-xs mb-2 font-medium text-gray-700">
                    Due Date
                </label>
                <div className="relative">
                <input
                    type="date"
                    name="duedate"
                 
                    className={
                        touched.duedate && errors.duedate
                        ? "appearance-none w-full placeholder:text-[#949494] placeholder:text-sm  text-[#121212] text-sm focus:border-[#F74445] focus:outline-none rounded-md border border-[#B92043] bg-[#FEECEC] py-3 px-4"
                        : "appearance-none block text-sm w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-purple-600 focus:outline-none"
                    }
                    placeholder="Enter your task title"
                    value={values.duedate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                        />
         
                   </div>
                   {touched.duedate && errors.duedate ? (
                    <div className="flex gap-1 mt-1 items-center">
                        <img src={warning_icon} alt="warning" className='w-[14px] h-[14px]' />
                        <small className="text-[#F74445] font-medium text-xs">
                        {touched.duedate && errors.duedate}
                        </small>
                    </div>
                    ) : null}
                </div>

                {/* Description */}
                <div>
                <label htmlFor="description" className="block text-xs mb-2 font-medium text-gray-700">
                    Task Description
                </label>
                <div className="relative">
                <textarea
                    name="description"
                    rows={5}
                    className={
                        touched.description && errors.description
                        ? "appearance-none w-full placeholder:text-[#949494] resize-none placeholder:text-sm  text-[#121212] text-sm focus:border-[#F74445] focus:outline-none rounded-md border border-[#B92043] bg-[#FEECEC] py-3 px-4"
                        : "appearance-none block text-sm w-full px-4 py-3 border resize-none border-gray-300 rounded-md shadow-sm focus:border-purple-600 focus:outline-none"
                    }
                    placeholder="Enter your task description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                        />
                  
                   </div>
                   {touched.description && errors.description ? (
                    <div className="flex gap-1 mt-1 items-center">
                        <img src={warning_icon} alt="warning" className='w-[14px] h-[14px]' />
                        <small className="text-[#F74445] font-medium text-xs">
                        {touched.description && errors.description}
                        </small>
                    </div>
                    ) : null}
                </div>

        
            </div>
            
            {/* Login Button */}
            <button
                type="submit"
                disabled={!(isValid && dirty)}
                className="mt-6 w-full disabled:bg-opacity-[0.6] bg-purple-600 text-sm text-white py-4 px-4 rounded-lg hover:bg-opacity-[0.9]"
            >
                Create 
            </button>
          </Form>
            )}
         </Formik>
        </div>
      </ModalComponent>

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
                            className="w-full flex gap-1 items-center disabled:bg-opacity-[0.6] font-medium bg-[#ede8fc] text-sm text-[#6f46eb] py-3 px-3 rounded-lg hover:bg-opacity-[0.9]"
                        >
                            Setup Account 
                            <ChevronRight
                                style={{ color: "#6f46eb", fontSize: "20px", cursor: "pointer" }}
                                />
                        </button>
                    </div>
                </div>

                <div className='mt-5 bg-gray-200 w-full h-[1px]'></div>
                
                <div className='grid grid-cols-4 gap-3 mt-5'>
                    <div className='flex gap-3 items-center'>
                        <div className='rounded-full w-[45px] h-[45px] border border-[#845df0] flex justify-center items-center bg-[#ede8fc]'>
                        <EventNoteOutlined
                                style={{ color: "#845df0", fontSize: "20px", cursor: "pointer" }}
                                />
                        </div>
                        <div>
                            <h5 className='text-sm text-[#6b6d70] '>Total Tasks</h5>
                            <p className='text-lg font-semibold text-[#000000]'>10.2K</p>
                        </div>
                    </div>

                    <div className='flex gap-3 items-center'>
                        <div className='rounded-full w-[45px] h-[45px] border border-[#845df0] flex justify-center items-center bg-[#ede8fc]'>
                        <EventNoteOutlined
                                style={{ color: "#845df0", fontSize: "20px", cursor: "pointer" }}
                                />
                        </div>
                        <div>
                             <h5 className='text-sm text-[#6b6d70] '>Completed Tasks</h5>
                            <p className='text-lg font-semibold text-[#000000]'>3.5K</p>
                        </div>
                    </div>

                    <div className='flex gap-3 items-center'>
                        <div className='rounded-full w-[45px] h-[45px] border border-[#845df0] flex justify-center items-center bg-[#ede8fc]'>
                        <ContentPaste
                                style={{ color: "#845df0", fontSize: "20px", cursor: "pointer" }}
                                />
                        </div>
                        <div>
                            <h5 className='text-sm text-[#6b6d70] '>All Boards</h5>
                            <p className='text-lg font-semibold text-[#000000]'>350</p>
                        </div>
                    </div>

                    <div className='flex gap-3 items-center'>
                        <div className='rounded-full w-[45px] h-[45px] border border-[#845df0] flex justify-center items-center bg-[#ede8fc]'>
                                 <EventNoteOutlined
                                style={{ color: "#845df0", fontSize: "20px", cursor: "pointer" }}
                                />
                        </div>
                        <div>
                            <h5 className='text-sm text-[#6b6d70]'>Pending Tasks</h5>
                            <p className='text-lg font-semibold text-[#000000]'>23</p>
                        </div>
                    </div>

                </div>

            </div>

            {/* Tasks/ Annoucements section */}
            <div className='mt-5 grid grid-cols-2 gap-4'>
                <div className='border border-gray-200 rounded-lg shadow-sm py-5 px-5 h-fit'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h6 className='text-sm font-semibold text-[#000000]'>Tasks Priorities</h6>
                            <p className='text-sm text-[#6b6d70]'>Team tasks sorted by priority</p>
                        </div>
                        <div>
                        <button
                            type="submit"
                            onClick={()=>setTaskOpen(true)}
                            className="w-full flex gap-1 items-center disabled:bg-opacity-[0.6] font-medium bg-[#ede8fc] text-sm text-[#6f46eb] py-3 px-4 rounded-lg hover:bg-opacity-[0.9]"
                        >
                             <Add
                                style={{ color: "#6f46eb", fontSize: "20px", cursor: "pointer" }}
                              />
                             Task 
                        </button>
                        </div>
                    </div>

                    <div className='mt-5 flex gap-2 items-center'>
                          {tabs.map((tab) => (
                            <button
                            key={tab.id}
                            className={`py-3 px-4 text-sm rounded-lg ${
                                activeTab === tab.id
                                ? "bg-[#ededed] text-[#5b5e61]" // Active tab styles
                                : "border border-gray-200 text-[#6b6d70] hover:bg-opacity-[0.9]"
                            }`}
                            onClick={() => setActiveTab(tab.id)} // Change active tab on click
                            >
                            {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tasks section */}
                    <div className='flex justify-between mt-5'>
                        <div className='flex gap-3'>
                            <div>
                            <input id="completed" name="completed" type="checkbox"
                                  className=" text-[#7C44BD] bg-transparent border-[#7C44BD] rounded focus:ring-[#7C44BD] focus:ring-0"
                               />
                            </div>
                            <div>
                            <h6 className='text-sm font-semibold text-[#000000]'>Completed UX for new landing page</h6>
                            <div className='flex gap-4 items-center mt-1'>
                                <div className='flex gap-1 items-center'>
                                <Event
                                        style={{ color: "#5b5e61", fontSize: "16px", cursor: "pointer" }}
                                    />
                                    <p className='text-sm text-[#6b6d70]'>30 Aug 2022 - 11:30AM</p>
                                </div>
                                <div className='flex gap-1 items-center'>
                                     <SellOutlined
                                        style={{ color: "#5b5e61", fontSize: "16px", cursor: "pointer" }}
                                    />
                                    <p className='text-sm text-[#6b6d70]'>UX</p>
                                </div>
                            </div>
                            </div>   
                        </div>
                        <div className='relative'>
                           <MoreHoriz
                                   onClick={toggleMenu}
                                style={{ color: "#5b5e61", fontSize: "20px", cursor: "pointer" }}
                              />
                               {/* Dropdown Menu */}
                                {showMenu && (
                                <div className="absolute right-0 bg-white border border-gray-200 shadow-md rounded-md py-2 w-40 z-10">
                                    <button
                                    className="flex gap-2 items-center px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left"
                                    onClick={() => alert("Edit Task Clicked")}
                                    >
                                          <EditOutlined
                                            style={{ color: "#5b5e61", fontSize: "20px", }}
                                            />
                                    Edit Task
                                    </button>
                                    <button
                                    className="flex gap-2 items-center px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left"
                                    onClick={() => alert("Delete Task Clicked")}
                                    >
                                         <DeleteOutline
                                            style={{ color: "#5b5e61", fontSize: "20px", }}
                                            />
                                    Delete Task
                                    </button>
                                </div>
                                )}
                        </div>
                    </div>

                    <div className='flex justify-between mt-5'>
                        <div className='flex gap-3'>
                            <div>
                            <input id="completed" name="completed" type="checkbox"
                                  className=" text-[#7C44BD] bg-transparent border-[#7C44BD] rounded focus:ring-[#7C44BD] focus:ring-0"
                               />
                            </div>
                            <div>
                            <h6 className='text-sm font-semibold text-[#000000]'>Hire Web3 Developer to finish web3 related function</h6>
                            <div className='flex gap-4 items-center mt-1'>
                                <div className='flex gap-1 items-center'>
                                <Event
                                        style={{ color: "#5b5e61", fontSize: "16px", cursor: "pointer" }}
                                    />
                                    <p className='text-sm text-[#6b6d70]'>30 Aug 2022 - 11:30AM</p>
                                </div>
                                <div className='flex gap-1 items-center'>
                                     <SellOutlined
                                        style={{ color: "#5b5e61", fontSize: "16px", cursor: "pointer" }}
                                    />
                                    <p className='text-sm text-[#6b6d70]'>No Tag</p>
                                </div>
                            </div>
                            </div>   
                        </div>
                        <div className=''>
                           <MoreHoriz
                                style={{ color: "#5b5e61", fontSize: "20px", cursor: "pointer" }}
                              />
                        </div>
                    </div>

                    <div className='flex justify-between mt-5'>
                        <div className='flex gap-3'>
                            <div>
                            <input id="completed" name="completed" type="checkbox"
                                  className=" text-[#7C44BD] bg-transparent border-[#7C44BD] rounded focus:ring-[#7C44BD] focus:ring-0"
                               />
                            </div>
                            <div>
                            <h6 className='text-sm font-semibold text-[#000000]'>Zoom call with developers team, finalize feature fo...</h6>
                            <div className='flex gap-4 items-center mt-1'>
                                <div className='flex gap-1 items-center'>
                                <Event
                                        style={{ color: "#5b5e61", fontSize: "16px", cursor: "pointer" }}
                                    />
                                    <p className='text-sm text-[#6b6d70]'>30 Aug 2022 - 11:30AM</p>
                                </div>
                                <div className='flex gap-1 items-center'>
                                     <SellOutlined
                                        style={{ color: "#5b5e61", fontSize: "16px", cursor: "pointer" }}
                                    />
                                    <p className='text-sm text-[#6b6d70]'>Developers</p>
                                </div>
                            </div>
                            </div>   
                        </div>
                        <div className=''>
                           <MoreHoriz
                                style={{ color: "#5b5e61", fontSize: "20px", cursor: "pointer" }}
                              />
                        </div>
                    </div>

                    <div className='flex justify-between mt-5'>
                        <div className='flex gap-3'>
                            <div>
                            <input id="completed" name="completed" type="checkbox"
                                  className=" text-[#7C44BD] bg-transparent border-[#7C44BD] rounded focus:ring-[#7C44BD] focus:ring-0"
                               />
                            </div>
                            <div>
                            <h6 className='text-sm font-semibold text-[#000000]'>Finalize the mobile app screen with designers</h6>
                            <div className='flex gap-4 items-center mt-1'>
                                <div className='flex gap-1 items-center'>
                                <Event
                                        style={{ color: "#5b5e61", fontSize: "16px", cursor: "pointer" }}
                                    />
                                    <p className='text-sm text-[#6b6d70]'>30 Aug 2022 - 11:30AM</p>
                                </div>
                                <div className='flex gap-1 items-center'>
                                     <SellOutlined
                                        style={{ color: "#5b5e61", fontSize: "16px", cursor: "pointer" }}
                                    />
                                    <p className='text-sm text-[#6b6d70]'>Design Tag</p>
                                </div>
                            </div>
                            </div>   
                        </div>
                        <div className=''>
                           <MoreHoriz
                                style={{ color: "#5b5e61", fontSize: "20px", cursor: "pointer" }}
                              />
                        </div>
                    </div>


                </div>
                <div className='border border-gray-200 rounded-lg shadow-sm py-5 px-5 h-fit'>

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
                            className="w-full flex gap-1 disabled:bg-opacity-[0.6] font-medium bg-[#ede8fc] text-sm text-[#6f46eb] py-3 px-4 rounded-lg hover:bg-opacity-[0.9]"
                        >
                              <Add
                                style={{ color: "#6f46eb", fontSize: "20px", cursor: "pointer" }}
                              />
                             Team 
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