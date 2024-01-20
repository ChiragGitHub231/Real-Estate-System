import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle';

export default function Listing() {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    const [error, setError] = useState(false);
    const params = useParams();

    useEffect(() => {
        const fetchListing = async () => {
            try{
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();

                if(data.success === false){
                    setError(true);
                    return;
                }

                setListing(data);
                setError(false);
            }
            catch(error){
                setError(true);
            }
        }

        fetchListing();
    }, [params.listingId])

  return (
    <>
        <main>
            {error && 
            <>
                <p className='text-center mt-52 text-3xl'>Something Went Wrong...</p>

                <p className='text-center mt-5 '>
                    <a className='cursor-pointer hover:underline text-slate-700' href='/'>Go To Home Page</a>
                </p>
            </>
            }

            {listing && !error && (
                <>
                    <Swiper navigation>
                        {listing.imageUrls.map((url) => (
                            <SwiperSlide key={url}>
                                <div className='h-96' style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover'}}>

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            )}
        </main>
    </>
  )
}
