import gsap from 'gsap'
import { useEffect,useState } from 'react'
import { FaAngleDown } from "react-icons/fa";

const Home = () => {

  const[select, setSelect] = useState(false);
  const[pickup, setPickup] = useState('');
  const[destination, setDestination] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
  }

  useEffect(() => {

    let y = select?'100%':'30%'

    gsap.to('.top', {
      height: y,
      duration: 0.5,
    })
  }, [select]);

  return (
    <div className='w-full h-screen bg-white relative overflow-hidden'>


      <div className="bg-[url(https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif)] bg-cover h-[70%] w-full absolute top-0 left-0 ">
        <div className="absolute top-[5%] left-[5%] w-[20%] h-10">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" className='w-full' />
        </div>
      </div>



      <div className='top h-[30%] z-[100] w-full bottom-0 absolute bg-red-500 flex items-center flex-col justify-start pt-4'>
        <form onSubmit={()=>{
          submitHandler(e);
        }} className='px-8 w-full'>
          <div className='flex items-center justify-between w-full'>
            <h1 className='font-[650] text-[1.4rem] mb-4'>Find a trip</h1>
            <button style={{display: !select?'none':''}} onClick={(e)=>{
              e.preventDefault();
              setSelect(false);
            }}>
              <FaAngleDown className='text-[1.4rem] text-black' />
            </button>
          </div>
          <input 
            onChange={(e)=>{
              setPickup(e.target.value);
            }}
            onSelect={()=>{
              setSelect(true);
            }} 
            value={pickup}
            type="text" className='w-full h-10 outline-none bg-gray-200 rounded-md mb-2 px-3' placeholder='Enter your pickup location' />
          <input 
            onChange={(e)=>{
              setDestination(e.target.value);
            }}
            onSelect={()=>{
              setSelect(true);
            }}
            value={destination}
          type="text" className='w-full h-10 outline-none bg-gray-200 rounded-md px-3' placeholder='Enter your destination' />
        </form>
      </div>
    </div>
  )
}

export default Home
