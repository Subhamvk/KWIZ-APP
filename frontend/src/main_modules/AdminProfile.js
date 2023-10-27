import profile_pic from "../images/profile_pic.jpg";
function AdminProfile() {
  return (
    <>
      <div className="flex justify-center w-screen h-screen bg-green-200 p-3">
        <div className="border-2 border-gray-600 h-fit rounded-xl p-2">
          {/* Photo Div */}
          <div className="flex justify-center items-center">
            {/* Photo Area */}
            <div className="w-36 h-36">
              <img src={profile_pic} className="object-cover"></img>
            </div>
          </div>

          {/* Details div */}
          <div className="flex justify-center">
            <table className="table-fixed">
              <tr>
                <td className="text-right p-2">Name:</td>
                <td className="text-left p-2">Dummy Name</td>
              </tr>

              <tr>
                <td className="text-right p-2">e-mail:</td>
                <td className="text-left p-2">dummyemail.mnnit.ac.in</td>
              </tr>

              <tr>
                <td className="text-right p-2">Quizzes Taken:</td>
                <td className="text-left p-2">10</td>
              </tr>

              <tr>
                <td className="text-right p-2">Quizzes Upcomming:</td>
                <td className="text-left p-2">2</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminProfile;
