import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    contactno: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 500,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  console.log(formData);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];

      setUploading(true);

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image Upload Failed (5 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea" ||
      e.target.type === "tel"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        return setError("You must upload at least 1 image");
      }

      if (+formData.regularPrice < +formData.discountPrice) {
        return setError("Discount Price must be lower than Regular Price");
      }

      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">
          Create Listing
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg"
              id="name"
              maxLength="60"
              minLength="5"
              required
              onInvalid={(e) => e.target.setCustomValidity("Name is Required")}
              onInput={(e) => e.target.setCustomValidity("")}
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              type="text"
              placeholder="Description"
              className="border p-3 rounded-lg"
              id="description"
              rows="2"
              cols="30"
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("Description is Required")
              }
              onInput={(e) => e.target.setCustomValidity("")}
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg"
              id="address"
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("Address is Required")
              }
              onInput={(e) => e.target.setCustomValidity("")}
              onChange={handleChange}
              value={formData.address}
            />
            <input
              type="tel"
              placeholder="Contact No"
              className="border p-3 rounded-lg"
              id="contactno"
              pattern="[1-9]{1}[0-9]{9}"
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("Please enter 10 digit valid contact number")
              }
              onInput={(e) => e.target.setCustomValidity("")}
              onChange={handleChange}
              value={formData.contactno}
            />

            <div className="flex gap-6 flex-wrap">
              <p>Select Type: </p>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sell"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type === "sell"}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <span>Rent</span>
              </div>
            </div>

            <div className="flex gap-2">
              <p>Does property have any parking spot? </p>
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
            </div>
            <div className="flex gap-2">
              <p>Does property involves furnished? </p>
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
            </div>
            <div className="flex gap-2">
              <p>Do you want to give an offer on property? </p>
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
            </div>

            <div className="flex gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="p-2 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <p>Bedrooms</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="p-2 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <p>Bathrooms</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  min="500"
                  max="10000000000"
                  required
                  className="p-2 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Regular Price</p>
                  {formData && formData.type === "rent" ? (
                    <span className="text-xs">(₹ / month)</span>
                  ) : (
                    <span className="text-xs">(₹ )</span>
                  )}
                </div>
              </div>

              {formData.offer && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="discountPrice"
                    min="0"
                    max="100000"
                    required
                    className="p-2 border border-gray-300 rounded-lg"
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div className="flex flex-col items-center">
                    <p>Discounted Price</p>
                    {formData && formData.type === "rent" ? (
                      <span className="text-xs">(₹ / month)</span>
                    ) : (
                      <span className="text-xs">(₹ )</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray-600 ml-2">
                The first image will be the cover (max 6)
              </span>
            </p>

            <div className="flex gap-4">
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                className="p-2 border border-gray-300 rounded w-full"
                onChange={(e) => setFiles(e.target.files)}
              />
              <button
                type="button"
                className="p-2 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
                onClick={handleImageSubmit}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>

            <p className="text-red-700 text-sm">
              {imageUploadError && imageUploadError}
            </p>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between p-3 border items-center"
                >
                  <img
                    src={url}
                    key={url}
                    alt="listing image"
                    className="w-20 h-20 object-contain rounded-lg"
                  />

                  <button
                    type="button"
                    className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                    onClick={() => handleRemoveImage(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}

            <button className="p-3 bg-slate-700 text-white text-center rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
              Create Listing
            </button>

            {error && (
              <>
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3"
                  role="alert"
                >
                  <strong className="font-bold">Error!</strong>
                  <span className="block sm:inline">
                    {" "}
                    Something went wrong!
                  </span>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
