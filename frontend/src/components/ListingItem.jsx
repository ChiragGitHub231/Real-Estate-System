import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

export default function ListingItem({ listing }) {
  return (
    <>
        <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[320px]'>
            <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt='https://media.istockphoto.com/id/1409298953/photo/real-estate-agents-shake-hands-after-the-signing-of-the-contract-agreement-is-complete.webp?b=1&s=170667a&w=0&k=20&c=41IYPuvIWQmDRUXdhWELlGb3IeQulHGQwRCJ_5MtgSo='
                    className='h-[320px] sm:h-[220px] w-full object-cover hover:sm:scale-105 transition-scale duration-300'/>
            
                <div className='p-3 flex flex-col gap-2 w-full'>
                    <p className='truncate text-lg font-semibold text-slate-700'>{listing.name}</p>

                    <div className='flex items-center gap-1'>
                        <MdLocationOn className='h-4 w-4 text-green-700' />
                        <p className='text-sm text-gray-600 truncate w-full'>{listing.address}</p>
                    </div>

                    <p className='text-sm text-gray-600 line-clamp-2'>
                        {listing.description}
                    </p>

                    <p className='text-slate-500 mt-1 font-semibold'>
                        ₹{" "}
                        {listing.offer ? listing.discountPrice.toLocaleString("en-IN")
                        : listing.regularPrice.toLocaleString("en-IN")}
                        {listing.type === 'rent' && ' / month'}
                    </p>

                    <div className='text-slate-700 flex gap-4'>
                        <div className='font-semibold text-sm'>
                            {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
                        </div>

                        <div className='font-semibold text-sm'>
                            {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    </>
  )
}
