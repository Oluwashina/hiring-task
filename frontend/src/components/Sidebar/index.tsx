import { NavLink, useLocation } from 'react-router-dom';
import notification_icon from '../../assets/notification.svg'
import { Add, Home,InsertChartOutlined, PeopleOutline, ContentPaste, ChatBubbleOutline, EventNoteOutlined, DashboardOutlined } from "@mui/icons-material";
import SearchComponent from '../Search';
import { useCallback, useState } from 'react';

type sidebarType = {
    title: string;
    children: React.ReactNode;
  };

const Sidebar = ({ title,children }: sidebarType) => {

    let location = useLocation();
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchValue(e.target.value);
        },
        []
      );


    return ( 
        <>
      <div className="hidden lg:flex h-full min-h-screen">
            <div className="md:w-64 flex flex-col justify-between min-h-screen border-r border-[#ededed] bg-[#fafafa] py-6 flex-shrink-0">
                <div>
                    {/* <div className='px-5'>
                        <img src={logo} alt="logo" />
                    </div> */}
                      {/* Logo */}
                        <div className="text-purple-600 font-bold px-5 text-lg flex items-center">
                            <span className="text-2xl mr-2">⚡</span> TaskPlanner
                        </div>

                    <div className='mt-8 flex flex-col justify-between'>
                        <section className='px-5 space-y-3'>
                            <NavLink
                                to="/home"
                                className={
                                location.pathname === "/home"
                                    ? "flex gap-3 py-3 px-5 bg-[#ededed] rounded-md items-center"
                                    : "flex gap-3 py-3 px-5 items-center"
                                }
                            >
                                <Home
                                style={{ color: "#000000", fontSize: "18px", cursor: "pointer" }}
                                />
                                <p className={`text-sm ${location.pathname === "/home" ? "text-[#000000]":"text-[#5b5e61]" } font-medium capitalize`}>
                                    Home
                                    </p>
                            </NavLink>

                         
                            <NavLink
                                to="/home"
                                className={
                                location.pathname === "/dashboard"
                                    ? "flex gap-3 py-3 px-5 bg-[#ededed] rounded-md items-center"
                                    : "flex gap-3 py-3 px-5 items-center"
                                }
                            >
                                 <InsertChartOutlined
                                style={{ color: "#000000", fontSize: "18px", cursor: "pointer" }}
                                />
                                <p className={`text-sm ${location.pathname === "/dashboard" ? "text-[#000000]":"text-[#5b5e61]" } font-medium capitalize`}>
                                    Dashboard
                                    </p>
                            </NavLink>

                            <NavLink
                                to="/home"
                                className={
                                location.pathname === "/teams"
                                    ? "flex gap-3 py-3 px-5 bg-[#ededed] rounded-md items-center"
                                    : "flex gap-3 py-3 px-5 items-center"
                                }
                            >
                                   <PeopleOutline
                                style={{ color: "#000000", fontSize: "20px", cursor: "pointer" }}
                                />
                                <p className={`text-sm ${location.pathname === "/teams" ? "text-[#000000]":"text-[#5b5e61]" } font-medium capitalize`}>
                                    Teams
                                    </p>
                            </NavLink>

                            <NavLink
                                to="/home"
                                className={
                                location.pathname === "/boards"
                                    ? "flex gap-3 py-3 px-5 bg-[#ededed] rounded-md items-center"
                                    : "flex gap-3 py-3 px-5 items-center"
                                }
                            >
                                   <ContentPaste
                                style={{ color: "#000000", fontSize: "20px", cursor: "pointer" }}
                                />
                                <p className={`text-sm ${location.pathname === "/boards" ? "text-[#000000]":"text-[#5b5e61]" } font-medium capitalize`}>
                                    Boards
                                    </p>
                            </NavLink>

                            <NavLink
                                to="/home"
                                className={
                                location.pathname === "/inbox"
                                    ? "flex gap-3 py-3 px-5 bg-[#ededed] rounded-md items-center"
                                    : "flex gap-3 py-3 px-5 items-center"
                                }
                            >
                                   <ChatBubbleOutline
                                style={{ color: "#000000", fontSize: "20px", cursor: "pointer" }}
                                />
                                <p className={`text-sm ${location.pathname === "/dashboard" ? "text-[#000000]":"text-[#5b5e61]" } font-medium capitalize`}>
                                    Inbox
                                    </p>
                            </NavLink>

                            <NavLink
                                to="/home"
                                className={
                                location.pathname === "/timeline"
                                    ? "flex gap-3 py-3 px-5 bg-[#ededed] rounded-md items-center"
                                    : "flex gap-3 py-3 px-5 items-center"
                                }
                            >
                                  <EventNoteOutlined
                                style={{ color: "#000000", fontSize: "20px", cursor: "pointer" }}
                                />
                                <p className={`text-sm ${location.pathname === "/timeline" ? "text-[#000000]":"text-[#5b5e61]" } font-medium capitalize`}>
                                    Timeline
                                    </p>
                            </NavLink>

                            <NavLink
                                to="/home"
                                className={
                                location.pathname === "/more"
                                    ? "flex gap-3 py-3 px-5 bg-[#ededed] rounded-md items-center"
                                    : "flex gap-3 py-3 px-5 items-center"
                                }
                            >
                                <DashboardOutlined
                                style={{ color: "#000000", fontSize: "20px", cursor: "pointer" }}
                                />
                                <p className={`text-sm ${location.pathname === "/more" ? "text-[#000000]":"text-[#5b5e61]" } font-medium capitalize`}>
                                    More Options
                                    </p>
                            </NavLink>

                         


                        </section>
                    </div>

                </div>
                      
            </div>

            <div className="flex-grow flex-auto flex-shrink overflow-y-scroll">
                {/* navbar section and pages flow */}
                <div className="flex border-b border-[#ededed] bg-[#FEFEFE] py-4 px-4 md:px-6 justify-between items-center">
                    <div>
                        <p className="text-base font-medium text-[#5d6063]">
                        {title}
                        </p>
                    </div>

                    <div  className='min-w-[350px]'>
                      <SearchComponent
                            placeholder="Search..."
                            handleChange={(e) => handleSearch(e)}
                            searchValue={searchValue}
                        />
                    </div>
                    <div className="flex gap-5 items-center">
                        <div className="cursor-pointer flex justify-center items-center text-2xl bg-[#F5F5F5] w-[40px] h-[40px] rounded-full">
                            <Add
                                style={{ color: "#5b5e61", fontSize: "20px", cursor: "pointer" }}
                                />
                        </div>
                        <div className="cursor-pointer flex justify-center items-center bg-[#F5F5F5] w-[40px] h-[40px] rounded-full">
                            <img src={notification_icon} alt="bell" />
                        </div>
                        <div className="cursor-pointer flex justify-center items-center bg-[#ebddca] w-[40px] h-[40px] rounded-full">
                            <p className='text-base text-[#5b5e61] font-medium'>M</p>
                        </div>
                        
                    </div>
                </div>
                 <div className="mb-8 px-4 md:px-6">{children}</div>
            </div>
        </div>
        </>
     );
}
 
export default Sidebar;