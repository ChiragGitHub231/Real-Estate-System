import React from 'react'

export default function CreateListing() {
  return (
    <>
        <div className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>
                Create Listing
            </h1>

            <form className='flex flex-col sm:flex-row gap-4'>

                <div className='flex flex-col gap-4 flex-1'>

                    <input 
                        type='text' 
                        placeholder='Name'
                        className='border p-3 rounded-lg'
                        id='name'
                        maxLength='60'
                        minLength='5'
                        required
                        onInvalid={(e) =>
                            e.target.setCustomValidity("Name is Required")
                        }
                        onInput={(e) => e.target.setCustomValidity("")}
                    />
                    <textarea 
                        type='text' 
                        placeholder='Description'
                        className='border p-3 rounded-lg'
                        id='description'
                        rows='2'
                        cols='30'
                        required
                        onInvalid={(e) =>
                            e.target.setCustomValidity("Description is Required")
                        }
                        onInput={(e) => e.target.setCustomValidity("")}
                    />
                    <input 
                        type='text' 
                        placeholder='Address'
                        className='border p-3 rounded-lg'
                        id='address'
                        required
                        onInvalid={(e) =>
                            e.target.setCustomValidity("Address is Required")
                        }
                        onInput={(e) => e.target.setCustomValidity("")}
                    />
                    <input 
                        type='tel' 
                        placeholder='Contact No'
                        className='border p-3 rounded-lg'
                        id='contactno'
                        required
                        onInvalid={(e) =>
                            e.target.setCustomValidity("Contact No is Required")
                        }
                        onInput={(e) => e.target.setCustomValidity("")}
                    />

                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='sell' className='w-5'/>
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='rent' className='w-5'/>
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='parking' className='w-5'/>
                            <span>Parking Spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='furnished' className='w-5'/>
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='offer' className='w-5'/>
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex items-center gap-2'>
                            <input 
                                type='number' 
                                id='bedrooms' 
                                min='1'
                                max='10' 
                                required
                                className='p-2 border border-gray-300 rounded-lg'
                            />
                            <p>Bedrooms</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input 
                                type='number' 
                                id='bathrooms' 
                                min='1' 
                                max='10' 
                                required
                                className='p-2 border border-gray-300 rounded-lg'
                            />
                            <p>Bathrooms</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input 
                                type='number' 
                                id='regularPrice' 
                                min='1' 
                                max='10' 
                                required
                                className='p-2 border border-gray-300 rounded-lg'
                            />
                            <div className='flex flex-col items-center'>
                                <p>Regular Price</p>
                                <span className='text-xs'>(₹ / month)</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input 
                                type='number' 
                                id='bedrooms' 
                                min='1' 
                                max='10' 
                                required
                                className='p-2 border border-gray-300 rounded-lg'
                            />
                            <div className='flex flex-col items-center'>
                                <p>Discounted Price</p>
                                <span className='text-xs'>(₹ / month)</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>
                        Images:
                        <span className='font-normal text-gray-600 ml-2'>
                            The first image will be the cover (max 6)
                        </span>
                    </p>

                    <div className='flex gap-4'>
                        <input 
                            type='file' 
                            id='images' 
                            accept='image/*' 
                            multiple
                            className='p-2 border border-gray-300 rounded w-full'
                        />
                        <button 
                            className='p-2 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
                        >
                                Upload
                        </button>
                    </div>

                    <button
                        className='p-3 bg-slate-700 text-white text-center rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                    >
                        Create Listing
                    </button>

                </div>

            </form>

        </div>
    </>
  )
}
