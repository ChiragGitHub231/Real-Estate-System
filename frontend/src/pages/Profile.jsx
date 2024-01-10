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

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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

  return (
    <>
      {/* firebase storage rule
      allow read;
      allow write: if
      request.resource.size < 5 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*') */}

      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

        <form className="flex flex-col gap-4">
          {/* For getting the file reference of an image */}
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <img
            src={formData.avatar || currentUser.avatar}
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
            placeholder="Username"
            className="border p-3 rounded-lg"
          />

          <input
            type="email"
            id="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            id="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
          />

          <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
            Update
          </button>
        </form>

        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer">Delete Account</span>

          <span className="text-red-700 cursor-pointer">Sign Out</span>
        </div>
      </div>
    </>
  );
}
