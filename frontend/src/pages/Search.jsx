import React from 'react'

export default function Search() {
  return (
    <>
        <div className='flex flex-col md:flex-row md:min-h-screen'>

            {/* Left Side of Page */}
            <div className='p-7 border-b-2 md:border-r-2'>
                <form className='flex flex-col gap-6'>

                    <div className='flex items-center gap-3'>
                        <label className='whitespace-nowrap font-semibold'>Search: </label>
                        <input type='text' id='searchTerm' placeholder='Search Here...' 
                            className='border rounded-lg p-2 w-full' />
                    </div>

                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Type: </label>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='all' 
                                className='w-5' />
                            <span>Rent & Sell</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox' id='rent' 
                                className='w-5' />
                            <span>Rent</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox' id='sell' 
                                className='w-5' />
                            <span>Sell</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox' id='offer' 
                                className='w-5' />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Amenities: </label>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='parking' 
                                className='w-5' />
                            <span>Parking</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox' id='furnished' 
                                className='w-5' />
                            <span>Furnished</span>
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort: </label>
                        <select id='sort_order' className='border rounded-lg p-2'>
                            <option>Price High to Low</option>
                            <option>Price Low to High</option>
                            <option>Latest</option>
                            <option>Oldest</option>
                        </select>
                    </div>

                    <button className='bg-slate-700 text-white rounded-lg p-2 hover:opacity-95'>
                        Search
                    </button>

                </form>
            </div>

            {/* Right Side of Page */}
            <div className=''>
                <h1 className='text-2xl font-semibold border-b p-3 text-slate-700 mt-1'>Listing Results: </h1>
            </div>

        </div>
    </>
  )
}
