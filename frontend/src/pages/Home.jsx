import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle';
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import ListingItem from '../components/ListingItem.jsx'

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [sellListings, setSellListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  console.log(offerListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try{
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      }
      catch(error){
        console.log(error);
      }
    }

    const fetchRentListings = async () => {
      try{
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSellListings();
      }
      catch(error){
        console.log(error);
      }
    }

    const fetchSellListings = async () => {
      try{
        const res = await fetch('/api/listing/get?type=sell&limit=4');
        const data = await res.json();
        setSellListings(data);
      }
      catch(error){
        console.log(error);
      }
    }

    fetchOfferListings();
  }, [])  

  const allListings = [ ...sellListings, ...offerListings, ...rentListings ];

  return (
    <>
      {/* Top Side */}
      <div className='flex flex-col gap-6 py-16 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl'>
          Find your next <span className='text-slate-500'>perfect</span> <br/> place with ease 
        </h1>

        <div className='text-gray-400 '>
            This is the best platform for property seller & buyer.<br />
            This platform provides various features to users.
        </div>

        <Link to={'/search'} className='text-blue-800 font-semibold hover:underline'>
          Let's get started...
        </Link>
      </div>

      {/* Swiper */}
      <Swiper navigation>
        {
          allListings && allListings.length > 0 && allListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div key={listing._id} style={{background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover'}} 
                className='h-[500px]'>

              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>

      {/* Listing Result for Offer, Sell and Rent */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          offerListings && offerListings.length > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-700'>Recent Offers</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                  Show more offers
                </Link>
              </div>

              <div className='flex flex-wrap gap-4'>
              {
                offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))
              }
              </div>
            </div>
          )
        }

        {
          sellListings && sellListings.length > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-700'>Recent place for sell</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sell'}>
                  Show more places
                </Link>
              </div>

              <div className='flex flex-wrap gap-4'>
              {
                sellListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))
              }
              </div>
            </div>
          )
        }

        {
          rentListings && rentListings.length > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-700'>Recent places for rent</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
                  Show more places
                </Link>
              </div>

              <div className='flex flex-wrap gap-4'>
              {
                rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))
              }
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}
