import { NavLink, Outlet } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
// import { FaListAlt } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { SlQuestion, SlLogout } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { CiViewList } from "react-icons/ci";
import { VscHistory } from "react-icons/vsc";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function SideNav(props) {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const state = useSelector((state) => ({ ...state }));
  var userName = "";
  if (state && state.user) userName = state.user.email;

  useEffect(() => {
    if (state && state.user) {
      if (state.user.role === "student") navigate("/dashboard");
    } else {
      navigate("/login");
    }
  });

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    props.onOpen();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    navigate("/login");
  };

  return (
    <>
      <nav>
        {/* Top Nav for mobile devices */}
        <div className="sm:hidden z-10 flex fixed top-0 bg-gradient-to-b from-green-300 to-emerald-700 w-full h-10">
          <div className="flex h-full w-5/6">
            {/* option 1 */}
            <NavLink to="/admin/questions">
              <div className="flex justify-center items-center h-full w-10">
                <CiViewList className="text-[1.3rem]" />
              </div>
            </NavLink>

            {/* option 2 */}
            <NavLink to="/admin/create_questions">
              <div className="flex justify-center items-center h-full w-10">
                <BsPencil className="text-[1.3rem]" />
              </div>
            </NavLink>

            {/* option 3 */}
            <NavLink to="/admin/create_quiz">
              <div className="flex justify-center items-center h-full w-10">
                <SlQuestion className="text-[1.3rem]" />
              </div>
            </NavLink>

            {/* option 4 */}
            <NavLink to="/admin/history">
              <div className="flex justify-center items-center h-full w-10">
                <VscHistory className="text-[1.3rem]" />
              </div>
            </NavLink>
          </div>

          {/* Hamburger */}
          <div className="flex justify-end items-center h-full w-1/6 mr-2">
            <div>
              <GiHamburgerMenu className="text-[2rem]" onClick={props.onOpen} />
              <div
                className={`flex justify-end ${
                  props.open
                    ? "hidden"
                    : "absolute top-0 left-0 w-screen bg-indigo-950 z-20 text-gray-400"
                }`}
              >
                <GiCancel
                  onClick={props.onOpen}
                  className="text-[2rem] text-red-700 absolute top-0 right-0 mr-2 mt-2"
                />

                <div className="flex flex-col w-full mt-[3rem] m-3 p-1">
                  {/* Username */}
                  <div className="flex items-center justify-end p-2">
                    <BsPersonCircle className="text-[2rem] mr-2" />
                    <span className="break-words"> {userName} </span>
                  </div>

                  {/* Log out */}
                  <div
                    onClick={handleLogOut}
                    className="flex items-center justify-end p-2 border-t border-black"
                  >
                    <SlLogout className="text-[2rem] mr-2" />
                    <span> Log Out</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidenav wrapper */}
        <div className="fixed top-0 left-0">
          {/* Sidenav */}
          <div
            className={`hidden sm:flex  flex-col justify-start relative border-r border-gray-700 bg-gradient-to-r from-teal-400 to-green-200 h-screen ${
              props.open ? "w-72" : "w-16"
            } duration-200`}
          >
            {/* Sidenav top section */}
            <div
              className={`relative w-full ${
                props.open ? "h-32" : "h-12"
              } bg-gradient-to-r from-emerald-800 to-green-600 duration-200 mb-3`}
            >
              <div
                className={`absolute left-3 top-5 ${
                  props.open ? "" : "scale-0"
                } duration-100`}
              >
                <BsPersonCircle className="rounded-full text-6xl"></BsPersonCircle>
                <div>
                  <span className="text-sm text-gray-200 break-words">
                    {userName}
                  </span>
                </div>
              </div>

              {/* SideNav expansion Arrow */}
              <FiChevronLeft
                className={`bg-white border-2 border-blue-400 text-black rounded-full text-3xl absolute right-2 top-2 cursor-pointer ${
                  !props.open && "rotate-180"
                } duration-500`}
                onClick={props.onOpen}
              ></FiChevronLeft>
            </div>

            {/* SideNav Mid Section */}
            <div className="relative flex flex-col justify-center w-full">
              {/* Sidenav option 1 */}
              <NavLink to="/admin/questions">
                <div className="flex justify-start items-center w-full hover:font-bold group p-1">
                  <div className="flex justify-center items-center group-hover:scale-[1.1] w-16 h-full">
                    <CiViewList className="text-[2.7rem] cursor-pointer" />
                  </div>

                  <span
                    className={`duration-100 ${!props.open && "scale-0 w-0"}`}
                  >
                    Questions
                  </span>
                </div>
              </NavLink>

              {/* Sidenav Option 2 */}
              <NavLink to="/admin/create_questions">
                <div className="flex justify-start items-center w-full hover:font-bold group p-1">
                  <div className="flex justify-center items-center group-hover:scale-[1.1] w-16 h-full">
                    <BsPencil className="text-[2.5rem] cursor-pointer" />
                  </div>

                  <span
                    className={`duration-100 ${!props.open && "scale-0 w-0"}`}
                  >
                    Create Questions
                  </span>
                </div>
              </NavLink>

              {/* Sidenav Option 3 */}
              <NavLink to="/admin/create_quiz">
                <div className="flex justify-start items-center w-full hover:font-bold group p-1">
                  <div className="flex justify-center items-center group-hover:scale-[1.1] w-16 h-full">
                    <SlQuestion className="rounded-xl text-[2.8rem] cursor-pointer" />
                  </div>

                  <span
                    className={`duration-100 ${!props.open && "scale-0 w-0"}`}
                  >
                    Create Quiz
                  </span>
                </div>
              </NavLink>

              {/* Sidenav Option 4 */}
              <NavLink to="/admin/history">
                <div className="flex justify-start items-center w-full hover:font-bold group p-1">
                  <div className="flex justify-center items-center group-hover:scale-[1.1] w-16 h-full">
                    <VscHistory className=" text-[2.8rem] cursor-pointer" />
                  </div>

                  <span
                    className={`duration-100 ${!props.open && "scale-0 w-0"}`}
                  >
                    History
                  </span>
                </div>
              </NavLink>
            </div>

            <div className=" w-full h-[60px] absolute bottom-0 duration-300">
              <div className="w-full h-full relative">
                <NavLink to="/login">
                  <div
                    onClick={handleLogOut}
                    className="flex justify-start items-center w-full h-[60px] hover:font-bold group"
                  >
                    <div className="flex justify-center items-center group-hover:scale-[1.1] w-16 h-full">
                      <SlLogout className=" text-[2.3rem] cursor-pointer m-2"></SlLogout>
                    </div>

                    <span
                      className={`duration-100 ${!props.open && "scale-0 w-0"}`}
                    >
                      <button> Log Out</button>
                    </span>
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default SideNav;
