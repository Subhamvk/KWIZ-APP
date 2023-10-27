import { NavLink, Outlet } from "react-router-dom";
import { FiChevronLeft, FiEdit2 } from "react-icons/fi";
import { GiRank3, GiCancel, GiHamburgerMenu } from "react-icons/gi";
import { SlLogout } from "react-icons/sl";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function StudentSideNav(props) {
  let navigate = useNavigate();

  let dispatch = useDispatch();

  const state = useSelector((state) => ({ ...state }));
  console.log(state);
  var email = "";
  if (state && state.user) email = state.user.email;

  useEffect(() => {
    if (state && state.user) {
      if (state.user.role == "teacher") navigate("/admin");
    } else {
      navigate("/login");
    }
  }, []);

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

  const regNo = email.substring(email.indexOf(".") + 1, email.lastIndexOf("@"));
  

  return (
    <>
      <nav>
        {/* Top Nav for mobile devices */}
        <div className="sm:hidden z-10 flex fixed top-0 bg-gradient-to-b from-green-300 to-emerald-700 w-full h-10">
          <div className="h-full w-1/6"></div>
          <div className="flex justify-center h-full w-4/6">
            <NavLink to="/dashboard/attempt_quiz">
              <div className="flex justify-center items-center h-full w-10">
                <FiEdit2 className="text-[1.3rem]" />
              </div>
            </NavLink>

            <NavLink to="/dashboard/quiz-history">
              <div className="flex justify-center items-center h-full w-10">
                <GiRank3 className="text-[1.3rem]" />
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
                    : "absolute top-0 left-0 w-screen bg-blue-950 z-20 text-gray-400"
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
                    <span className="break-words"> {email} </span>
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

        {/* Student Reg no */}
        <div className="sm:hidden z-10 flex justify-center items-center fixed top-0 h-10 text-gray-800 p-1">
          {regNo}
        </div>

        {/* StudentSideNav wrapper */}
        <div className="fixed top-0 left-0 h-screen">
          {/* StudentSideNav */}
          <div
            className={`hidden sm:flex  flex-col justify-start relative border-r border-gray-700 bg-gradient-to-r from-teal-400 to-green-200 h-screen ${
              props.open ? "w-72" : "w-16"
            } duration-200`}
          >
            {/* Sidenav top section */}
            <div
              className={`relative w-full p-2 ${
                props.open ? "h-32" : "h-12"
              } bg-gradient-to-r from-emerald-800 to-green-600 duration-200 mb-3`}
            >
              <div
                className={`absolute left-3 top-5 w-[90%] ${
                  props.open ? "" : "scale-0"
                } duration-100`}
              >
                <BsPersonCircle className="rounded-full text-6xl" />
                <div className="w-full">
                  <p className="text-sm text-gray-200 break-words">{email}</p>
                </div>
              </div>
              {/* StudentSideNav expansion Arrow */}
              <FiChevronLeft
                className={`bg-white border-2 border-blue-400 text-black rounded-full text-3xl absolute right-2 top-2 cursor-pointer ${
                  !props.open && "rotate-180"
                } duration-500`}
                onClick={props.onOpen}
              />
            </div>
            {/* StudentSideNav Mid Section */}
            <div className="relative flex flex-col justify-center w-full">
              {/* StudentSideNav option 1 */}
              <NavLink to="/dashboard/attempt_quiz">
                <div className="flex justify-start items-center w-full hover:font-bold group">
                  <div className="flex justify-center items-center group-hover:scale-[1.1] duration-200 w-16">
                    <FiEdit2 className="text-[2.5rem] cursor-pointer" />
                  </div>

                  <span
                    className={`duration-100 ${!props.open && "scale-0 w-0"}`}
                  >
                    Attempt Quiz
                  </span>
                </div>
              </NavLink>

              {/* StudentSideNav option 2 */}
              <NavLink to="/dashboard/quiz-history">
                <div className="flex justify-start items-center w-full hover:font-bold group">
                  <div className="flex justify-center items-center group-hover:scale-[1.1] duration-200 w-16">
                    <GiRank3 className="text-[3rem]  cursor-pointer" />
                  </div>

                  <span
                    className={`duration-100 ${!props.open && "scale-0 w-0"}`}
                  >
                    LeaderBoard
                  </span>
                </div>
              </NavLink>
            </div>
            <div className=" w-full h-[60px] absolute bottom-0 duration-300">
              <div className="w-full h-full relative">
                <NavLink to="/login">
                  <div
                    onClick={handleLogOut}
                    className="flex justify-start items-center w-full h-[60px]  hover:font-bold group"
                  >
                    <div className="flex justify-center items-center group-hover:scale-[1.1] duration-200 w-16 h-full">
                      <SlLogout className=" text-[2rem] cursor-pointer m-2" />
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

export default StudentSideNav;
