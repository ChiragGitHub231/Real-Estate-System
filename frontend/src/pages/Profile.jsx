import React from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutStart, signInFailure, signOutFailure, signOutSuccess } from '../redux/user/userSlice.js';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        // console.log('Upload is: ' + progress + ' % done');
        setFilePerc(Math.round(progress));
      },

      (error) => {
        setFileUploadError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    }
    catch(error){
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDeleteUser = async () => {
    try{
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    }
    catch(error){
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOut = async () => {
    try{
      dispatch(signOutStart());

      const res = await fetch('/api/auth/signout');
      const data = res.json();

      if(data.success === false){
        dispatch(signOutFailure(data.message));
        return;
      }

      dispatch(signOutSuccess(data));
    }
    catch(error){
      dispatch(signOutFailure(data.message));
    }
  }

  return (
    <>
      {/* firebase storage rule
      allow read;
      allow write: if
      request.resource.size < 5 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*') */}

      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* For getting the file reference of an image */}
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <img
            src={formData?.avatar || currentUser.avatar}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
            onClick={() => fileRef.current.click()}
          />

          <p className="text-sm self-center">
            {fileUploadError ?
              (<span className="text-red-700">Unable to Upload Image (Image must be less than 5 MB)</span>) :
              filePerc > 0 && filePerc < 100 ? (
                <span className="text-slate-700">
                  {`Uploading ${filePerc}%`}
                </span>
              ) :
              filePerc === 100 ? (
                <span className="text-green-700">
                  Image Successfully Uploaded
                </span>
              ) : (
                ''
              )
            }
          </p>

          <input
            type="text"
            id="username"
            defaultValue={currentUser.username}
            placeholder="Username"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="email"
            id="email"
            placeholder="Email"
            defaultValue={currentUser.email}
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
            Update
          </button>

          <Link
            className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95" 
            to={'/create-listing'}
          >
            Create Listing
          </Link>
        </form>

        <div className="flex justify-between mt-5">
          <span 
            className="text-red-700 cursor-pointer"
            onClick={handleDeleteUser}
          >
              Delete Account
          </span>

          <span 
            className="text-red-700 cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </span>
        </div>

        <p className="text-red-700 mt-5">
          {error ? error : ""}
        </p>
        <p className="text-green-700 mt-5">
          {updateSuccess ? "User Updated Successfully!" : ""}
        </p>
      </div>
    </>
  );
}
