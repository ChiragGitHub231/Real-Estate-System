import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listing}) {
    const [landlord, setLandLord] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchLandLord = async () => {
            try{
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandLord(data);
            }
            catch(error){
                console.log(error);
            }
        }
        fetchLandLord();
    }, [listing.userRef]);

    const onChange = (e) => {
        setMessage(e.target.value);
    }
    
  return (
    <>
        {landlord && (
            <div className='flex flex-col gap-2 mt-3'>
                <p>
                    Contact <span className='font-semibold'>
                        {landlord.username}
                    </span> for <span className='font-semibold'>
                        {listing.name.toLowerCase()}
                    </span>
                </p>

                <textarea
                    placeholder='Enter Your Message Here...' 
                    name='message' 
                    id='message' 
                    cols="53" 
                    rows="3"
                    className='border rounded-lg p-3'
                    value={message}
                    onChange={onChange}
                    >
                </textarea>

                <Link
                    to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
                    className='bg-slate-700 text-center text-white p-3 uppercase rounded-lg hover:opacity-95'
                >
                    Send Message
                </Link>
            </div>
        )}
    </>
  )
}
