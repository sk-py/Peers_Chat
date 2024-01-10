import { IconEditCircle, IconX } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import PP from "../assets/Logo.png";
import { toast } from "sonner";
import { IconEdit } from "@tabler/icons-react";
const Profilepage = ({ SetProfileSec }) => {
  const [FileInput, setFileInput] = useState(null);
  const [user, setuser] = useState(
    JSON.parse(localStorage.getItem("user:Info"))
  );
  useEffect(() => {
    const blockDiv = document.getElementById("blockDiv");
    blockDiv.classList.contains("flex") &&
      blockDiv.classList.replace("flex", "hidden");
  }, []);

  const OnFileSelect = async (e) => {
    console.log(e.target.files[0]);
    setFileInput(e.target.files[0]);
  };

  const profileUpload = async (e) => {
    e.preventDefault();
    const userId = await user.id;
    const formData = new FormData();
    formData.append("ImgInput", FileInput);
    console.log("formdata", formData);
    try {
      const res = await fetch(`http://localhost:5000/api/upload/${userId}`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      let userObj = user;
      userObj["profileUrl"] = result;

      localStorage.setItem("user:Info", JSON.stringify(userObj));
      toast.success(
        "Profile updated successfully, if it doesn't get updated on your page try refreshing once"
      );

      SetProfileSec(false);
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };
  console.log("From lcl", localStorage.getItem("user:Info"));
  console.log("UserState", JSON.stringify(user.profileUrl));

  return (
    <div className="w-screen h-screen absolute bg-slate-800 bg-opacity-70 z-50 flex items-center justify-center">
      <div className="flex flex-col dark:bg-slate-900 shadow-xl bg-white p-2 w-[50%] mb-10 -mt-10 rounded-md">
        <span
          onClick={() => {
            SetProfileSec(false);
          }}
          className="z-50 cursor-pointer w-full flex items-center justify-end float-right"
        >
          <p>
            <IconX />
          </p>
        </span>
        <div className="w-full">
          <form className="flex flex-col w-full">
            <span className="w-full flex items-center justify-center">
              <label htmlFor="ImgInput" className="relative">
                <img
                  className="cursor-pointer rounded-xl w-[300px] h-[300px] object-cover"
                  src={`${!user.profileUrl ? PP : user.profileUrl}`}
                  alt="Profile Image"
                />
                <IconEdit className="absolute bg-slate-700 rounded-full text-white p-1 w-[30px] h-[30px] -top-1 -right-2 cursor-pointer" />
              </label>
              <input
                type="file"
                name="ImgInput"
                id="ImgInput"
                className="hidden"
                onChange={OnFileSelect}
              />
            </span>
            <span className=" flex flex-row w-full items-center justify-center gap-8 py-6 mt-4">
              <input
                title="Can't update this yet"
                type="text"
                value={user.name}
                disabled
                className="text-lg text-center bg-slate-200 dark:bg-slate-800 font-roboto p-1 rounded-md"
              />
              <input
                title="Can't update this yet"
                type="text"
                value={user.email}
                disabled
                className="text-lg text-center bg-slate-200 dark:bg-slate-800 font-roboto p-1 rounded-md "
              />
            </span>
            <span className="w-full text-center p-2">
              <button
                onClick={profileUpload}
                className={`bg-indigo-600 w-fit p-1 px-3 rounded-md text-white  ${
                  !FileInput
                    ? "cursor-not-allowed pointer-events-none "
                    : "cursor-pointer"
                }`}
              >
                Save
              </button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
