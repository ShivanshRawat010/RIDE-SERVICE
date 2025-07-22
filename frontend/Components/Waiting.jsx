import React, { useEffect } from 'react';
import gsap from 'gsap';

const Waiting = ({ waiting }) => {
  useEffect(() => {
    gsap.to('.waiting-panel', {
      top: waiting ? '30%' : '100%',
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [waiting]);

  return (
    <div className='waiting-panel z-[1000] bg-red-500 absolute top-[100%] left-0 w-full h-full flex flex-col rounded-t-lg items-center pt-20' >
      <span className="text-white text-3xl font-bold mb-4">Waiting for a captain...</span>
      <div className="loader border-4 border-white border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
};

export default Waiting;
