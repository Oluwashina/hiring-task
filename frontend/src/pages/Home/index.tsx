import {useEffect, useState} from 'react';
import { MoreHoriz, Add,SellOutlined, Event, EditOutlined, DeleteOutline,EventNoteOutlined,ContentPaste, ChevronRight } from "@mui/icons-material";
import warning_icon from '../../assets/warning.svg'
import ModalComponent from '../../components/Modal';
import { Formik, Form, FormikHelpers,  } from "formik";
import { createTaskValidator } from "../../validationSchema/validator";
import TextInput from '../../components/TextInput';
import { useTodos } from '../../context/TodoContext';
import moment from "moment";


const HomePage = () => {

    const [openTask, setTaskOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    interface Todo {
        id: string;
        title: string;
        description: string;
        isCompleted: boolean;
        dueDate: string;
      }

    const [showMenuId, setShowMenuId] = useState<string | null>(null); 
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [currentTask, setCurrentTask] = useState<Todo>({
        id: '',
        title: '',
        dueDate: '',
        description: '',
        isCompleted: false,
    });
    const { user,fetchUserTodos, todos, loading, loader, removeTodoItem, addNewTodo, updateTodoItem } = useTodos();


     const toggleMenu = (taskId: string) => {
        if (showMenuId === taskId) {
            setShowMenuId(null); // Close menu if it's already open
        } else {
            setShowMenuId(taskId); // Open the menu for the selected task
        }
    };

     // Calculate the number of completed tasks and pending tasks
   const completedTasksCount = todos.filter((todo) => todo.isCompleted).length;
   const pendingTasksCount = todos.filter((todo) => !todo.isCompleted).length;

    const openTaskModal = (mode: 'add' | 'edit', task: Todo | null = null) => {
        setModalMode(mode);
        setTaskOpen(true);
        setShowMenuId(null); 
        if (mode === "edit" && task) {
            setCurrentTask(task);
        } else {
            setCurrentTask({
                id: '',
                title: '',
                dueDate: '',
                description: '',
                isCompleted: false,
            }); // Clears current task for add mode
        }
    };



    const [activeTab, setActiveTab] = useState("upcoming"); // Default active tab

   
    const tabs = [
        { id: "upcoming", label: `${todos.filter(todo => moment(todo.dueDate).isAfter(moment())).length} Upcoming` },
        { id: "overdue", label: `${todos.filter(todo => moment(todo.dueDate).isBefore(moment())).length} Overdue` },
        { id: "completed", label: `${todos.filter(todo => todo.isCompleted).length} Completed` },
      ]

      const filteredTodos = () => {
        switch (activeTab) {
          case "upcoming":
            return todos.filter((todo) => moment(todo.dueDate).isAfter(moment()));
          case "overdue":
            return todos.filter((todo) => moment(todo.dueDate).isBefore(moment()));
          case "completed":
            return todos.filter((todo) => todo.isCompleted);
          default:
            return todos;
        }
      };

    interface Values {
        title: string;
        description: string;
        duedate: string;
    }

    const handleCheckboxChange = async (id: string, status: boolean, todo: Todo) => {
        // Toggle the completed status of the task with the given id
       console.log(id)
       console.log(status)
       // Update the task in the database with the new completed status
       await updateTodoItem(id, {title: todo.title, description: todo.description, dueDate: todo.dueDate, isCompleted: status})        
    };

    const handleSubmit = async (values: Values) => {
        // check for what modal mode then call the api action for either add todo or update
        if(modalMode === "add") {
           const isAdded = await addNewTodo({title: values.title, description: values.description, dueDate: values.duedate})
           if(isAdded){
             fetchUserTodos();
             setTaskOpen(false);
           }
        }
        else if(modalMode === "edit") {
          const isUpdated = await updateTodoItem(currentTask.id, {title: values.title, description: values.description, dueDate: values.duedate, isCompleted: currentTask.isCompleted})
          if(isUpdated){
            fetchUserTodos();
            setTaskOpen(false);
          }
        }

    };

    const handleDeleteModal = (todo:Todo) =>{
        setDeleteOpen(!deleteOpen)
        setShowMenuId(null); 
        setCurrentTask(todo);
    }

    const handleDeleteTask = async () =>{
        // delete the task from the database with the given id
        console.log(currentTask.id)
       const isDeleted = await removeTodoItem(currentTask.id);
       if(isDeleted){
           fetchUserTodos();
           setDeleteOpen(false);
       }
    }


    useEffect(()=>{
        if(user){
          fetchUserTodos();
        }
     
    },[user, fetchUserTodos])


    return ( 
        <>

        {/* Add/Edit Task Modal */}
        <ModalComponent
        isOpen={openTask}
        title={modalMode === 'add' ? 'Create tasks' : 'Edit Task'}
        onClose={() => {
          setTaskOpen(false);
        }}
        titleBorder
      >
        <div className='py-5'>
        <Formik
                enableReinitialize={true} 
                initialValues={{
                    title: modalMode === 'edit' && currentTask ? currentTask.title : '',
                    description: modalMode === 'edit' && currentTask ? currentTask.description : '',
                    duedate: modalMode === 'edit' && currentTask ? currentTask.dueDate : '',
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
                <TextInput
                    label="Task Name"
                    name="title"
                    placeholder="Enter your task title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.title}
                    warningIcon={warning_icon}
                />
                
                {/* Due Date */}
                <TextInput
                    label=" Due Date"
                    name="duedate"
                    type='date'
                    placeholder=""
                    value={values.duedate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.duedate}
                    warningIcon={warning_icon}
                    min={new Date().toISOString().split('T')[0]}
                />

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
                disabled={!(isValid && dirty) || loader}
                className="mt-6 w-full disabled:bg-opacity-[0.6] bg-purple-600 text-sm text-white py-4 px-4 rounded-lg hover:bg-opacity-[0.9]"
            >
             {modalMode === 'add' ? 'Create' : 'Save Changes'}
            </button>
          </Form>
            )}
         </Formik>
        </div>
      </ModalComponent>

      {/* Delete Confirmation Modal */}
      <ModalComponent
        isOpen={deleteOpen}
        title="Delete Task"
        onClose={() => {
          setDeleteOpen(false);
        }}
        titleBorder
      >
        <div className='py-5'>
            {/* delete confirmation section */}
            <div className=''>
                <p className='text-sm  text-[#000000] font-medium'>Are you sure you want to delete this task?</p>
            </div>

            {/* delete confirmation button */}
            <div className='flex justify-end items-center gap-2 mt-8'>
            <button
                type="button"
                className=" disabled:bg-opacity-[0.6] bg-transparent text-black text-sm  py-3 px-3 "
                onClick={() => {    
                    setDeleteOpen(false);
                
                }}
                >
                    No
                </button>
                <button
                type="button"
                disabled={loader}
                className="disabled:bg-opacity-[0.6] bg-purple-600 text-sm text-white py-3 px-3 rounded-lg hover:bg-opacity-[0.9]"
                onClick={() => handleDeleteTask()}
                >
                    Yes, proceed
             </button>
            </div>
            
                
        </div>
        </ModalComponent>
          

        {/* Overview section i.e verification section/metrics */}
            <div className='border border-gray-200 rounded-lg shadow-sm py-5 px-5 mt-5'>
                <div className='flex justify-between items-center'>
                    <div>
                        <h6 className='text-base text-[#0d0d0d] font-medium'>Hi {user ? user.name : 'Anonymous'}, you are almost done.</h6>
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
                            <p className='text-lg font-semibold text-[#000000]'>{todos.length}</p>
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
                            <p className='text-lg font-semibold text-[#000000]'>{completedTasksCount}</p>
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
                            <p className='text-lg font-semibold text-[#000000]'>50</p>
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
                            <p className='text-lg font-semibold text-[#000000]'>{pendingTasksCount}</p>
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
                            onClick={() => openTaskModal('add')}
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
                    {
                        loading ?
                        (
                        <div className="animate-pulse w-full mt-4  bg-[#FEFEFE]">
                            <div className="h-8 bg-gray-200 rounded-lg  w-full mb-2"></div>
                            <div className="h-8 bg-gray-200 rounded-lg  w-full mb-2"></div>
                            <div className="h-8 bg-gray-200 rounded-lg  w-full mb-2"></div>
                            <div className="h-8 bg-gray-200 rounded-lg  w-full mb-2"></div>
                            <div className="h-8 bg-gray-200 rounded-lg  w-full"></div>
                         </div>
                        )
                        :
                        (
                            <>
                            {
                                filteredTodos().length === 0 ?
                                <div className='flex flex-col justify-center items-center min-h-[400px]'>
                                    <div className='bg-[#F7F7F7] w-[120px] h-[120px] rounded-full'>
        
                                    </div>
                                    <div className='mt-5'>
                                        <h6 className='text-[#000000] text-lg font-medium'>No tasks has founded</h6>
                                    </div>
                                    <div className='mt-1 max-w-[250px] mx-auto'>
                                        <p className='text-sm text-[#3A3A3A] text-center'>Click here to add <span onClick={() => openTaskModal('add')} className='text-[#6f46eb] cursor-pointer'>New task</span></p>
                                    </div>
                               </div>
                                :
                                (
                                 <>
                                 {filteredTodos().map((todo) => (
                                    <div key={todo.id} className='flex justify-between mt-5'>
                                        <div className='flex gap-3'>
                                            <div>
                                            <input 
                                                id={`completed-${todo.id}`} 
                                                name="completed"
                                                type="checkbox"
                                                checked={todo.isCompleted}
                                                onChange={(e) =>
                                                    handleCheckboxChange(todo.id, e.target.checked, todo)
                                                }
                                                className=" text-[#7C44BD] bg-transparent cursor-pointer border-[#7C44BD] rounded focus:ring-[#7C44BD] focus:ring-0"
                                                />
                                            </div>
                                            <div>
                                            <h6 className='text-sm font-semibold text-[#000000]'>{todo.title}</h6>
                                            <div className='flex gap-4 items-center mt-1'>
                                                <div className='flex gap-1 items-center'>
                                                <Event
                                                        style={{ color: "#5b5e61", fontSize: "16px", cursor: "pointer" }}
                                                    />
                                                    <p className='text-sm text-[#6b6d70]'> {moment(todo.dueDate).format("DD MMM, YYYY")} - {moment().format('h:mmA')}</p>
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
                                                     onClick={() => toggleMenu(todo.id)}
                                                    style={{ color: "#5b5e61", fontSize: "20px", cursor: "pointer" }}
                                                    />
                                                    {/* Dropdown Menu */}
                                                    {showMenuId === todo.id && (
                                                    <div className="absolute right-0 bg-white border border-gray-200 shadow-md rounded-md py-2 w-40 z-10">
                                                        <button
                                                        className="flex gap-2 items-center px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left"
                                                        onClick={() => openTaskModal('edit', todo)}
                                                        >
                                                                <EditOutlined
                                                                style={{ color: "#5b5e61", fontSize: "20px", }}
                                                                />
                                                        Edit Task
                                                        </button>
                                                        <button
                                                        className="flex gap-2 items-center px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left"
                                                        onClick={() => handleDeleteModal(todo)}
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
                                    ))}
                                 </>
                                )
                             }
                             </>
                            )
                        }

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