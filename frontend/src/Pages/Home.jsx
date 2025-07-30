import gsap from 'gsap'
import { useEffect,useState,useContext } from 'react'
import { FaAngleDown,FaAngleLeft,FaLocationDot } from "react-icons/fa6";
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';
import {UserDataContext} from '../context/UserContext';
import AcceptRide from '../../Components/AcceptRide';
import Waiting from '../../Components/Waiting';
import MakePayment from '../../Components/MakePayment';
import LiveTracking from '../../Components/LiveTracking';
import Logo from '../../Components/Logo';

const Home = () => {

  const[select, setSelect] = useState(false);
  const[pickup, setPickup] = useState('');
  const[destination, setDestination] = useState('');
  const[pS, setPS] = useState();
  const[dS, setDS] = useState();
  const [pSelected, setPSelected] = useState(false);
  const [dSelected, setDSelected] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [vehicle, setVehicle] = useState();
  const [fare, setFare] = useState(null);
  const [ride,setRide] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [finish, setFinish] = useState(false);

  const {user} = useContext(UserDataContext);
  const {socket} = useContext(SocketContext);

  const submitHandler = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    // console.log('User data:', user);
    socket.emit('join', {userId: user._id, userType: 'user'});
  })

  useEffect(() => {
    socket.on('message', (message) => {
      console.log('Ride message received:', message);
      setRide(message);
      setConfirm(true);
      setWaiting(false);
    })

    socket.on('ride-started', (message) => {
      setConfirm(false);
      setFinish(true);
    })

    socket.on('ride-finished', (message) => {
      setFinish(false);
      setWaiting(false);
      setRide(null);
      setVehiclePanel(false);
      setConfirm(false);
      setSelect(false);
      setPickup('');
      setDestination('');
    })
  })

  useEffect(() => {

    if(vehiclePanel){
      gsap.to('.top', {
        height: 0,
        duration: 0,
        opacity: 0,
      })
      gsap.to('.vehicle', {
        top: '30%',
      })
    }

    let y = select?'100%':'30%'

    gsap.to('.top', {
      height: y,
      duration: 0.5,
    })

    async function fetchData() {
      
      try {
        if(pickup.length >= 3){
          const pickUpRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggested-places`, {
            params: {
              address: pickup
            },
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          setPS(pickUpRes.data);
        }

        if(destination.length >= 3){
          const destinationRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggested-places`, {
            params: {
              address: destination
            },
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });  
          
          setDS(destinationRes.data);
        }
      } catch (err) {
        console.error('Error fetching suggestions:', err);
      }
    }

    fetchData();

  }, [select, pickup, destination, vehiclePanel]);

  useEffect(() => {
    
    async function fetchFare() {
      if(vehiclePanel && pickup && destination){
        const fareRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
          params: {
            pickup: pickup,
            destination: destination
          },
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setFare(fareRes.data);
      }
    }
    
    fetchFare();
  }, [vehiclePanel]);

  useEffect(() => {
    if (vehicle) {
      console.log(fare[vehicle]);
    }
  }, [vehicle]);
  

  async function bookRide() {
    if(!pickup || !destination || !vehicle) {
      alert('Please select pickup, destination and vehicle');
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup: pickup,
        destination: destination,
        vehicleType: vehicle,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if(res.status === 201) {
        console.log('Ride created successfully:', res.data);
        setWaiting(true);
      }
    } catch (error) {
      console.error('Error booking ride:', error);
    }
  }

  return (
    <div className='w-full h-screen bg-white relative overflow-hidden'>

      <div
        className={`bg-cover w-full absolute top-0 left-0 ${!vehiclePanel && !waiting && !confirm && !finish ? 'h-[70%]' : 'h-[90%]'
          }`}
      >
        <div className='w-full h-full'>
          <LiveTracking />
        </div>
      </div>


      {!vehiclePanel && !waiting && !confirm && !finish && (
        <div className='top h-[30%] z-[20] w-full bottom-0 absolute bg-white flex items-center flex-col justify-start pt-4 '>
          <form onSubmit={(e)=>{
            submitHandler(e);
          }} className='px-8 w-full space-y-4'>
            <div className='flex items-center justify-between w-full'>
              <h1 className='font-[650] text-[1.4rem] '>Find a trip</h1>
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
                setDSelected(false);
                setPSelected(true);
              }} 
              value={pickup}
              type="text" className='w-full h-10 outline-none bg-gray-200 rounded-md mb-2 px-3' placeholder='Enter your pickup location' />
            <input 
              onChange={(e)=>{
                setDestination(e.target.value);
              }}
              onSelect={()=>{
                setSelect(true);
                setPSelected(false);
                setDSelected(true);
              }}
              value={destination}
            type="text" className='w-full h-10 outline-none bg-gray-200 rounded-md px-3' placeholder='Enter your destination' />

            {select && (
              <button className='w-full h-10 rounded-md bg-emerald-500 text-white text-[1rem]' onClick={(e)=>{
                e.preventDefault();
                setVehiclePanel(true);
              }}>
                Choose Vehicle
              </button>
            )}
              
          </form>
          
          {select && pSelected && (
            <div className='w-full flex h-full mt-4 flex-col gap-4'>
              {
                Array.isArray(pS) && pS.map((item, index) => (
                  <div className='flex items-center justify-between bg-gray-100 p-2 ' key={index}>
                    <div className='rounded-full w-[10vw] h-[10vw] bg-gray-300 flex items-center justify-center'>
                      <FaLocationDot />
                    </div>
                    <button className='block text-[1rem] h-10 font-[500] text-gray-700 w-[85%] whitespace-nowrap overflow-x-hidden text-left' onClick={(e)=>{
                      e.preventDefault();
                      setPickup(item.description);            
                    }}>
                      {item.description}
                    </button>
                  </div>
                ))
              }
            </div>
          )}
          { select && dSelected && (
            <div className='w-full flex h-full mt-4 flex-col gap-4'>
              {
                Array.isArray(dS) && dS.map((item, index) => (
                  <div className='flex items-center justify-between bg-gray-100 p-2 ' key={index}>
                    <div className='rounded-full w-[10vw] h-[10vw] bg-gray-300 flex items-center justify-center'>
                      <FaLocationDot />
                    </div>
                    <button className='block text-[1rem] h-10 font-[500] text-gray-700 w-[85%] whitespace-nowrap overflow-x-hidden text-left' onClick={(e)=>{
                      e.preventDefault();
                      setDestination(item.description);            
                    }}>
                      {item.description}
                    </button>
                  </div>
                ))
              }
            </div>
          )}
        </div>
      )}

      {vehiclePanel && !waiting && !confirm && !finish &&(
        <div className='vehicle h-[70%] top-[100%] z-[100] w-full bottom-0 absolute bg-red-500 flex items-center flex-col justify-start pt-2 px-8'>
          <div className='w-full flex items-center justify-center'>
            <button onClick={(e)=>{
              e.preventDefault();
              setVehiclePanel(false);
            }} className='text-white text-[1.4rem]'>
              <FaAngleDown />
            </button>
          </div>
          <div className='w-full flex items-center justify-start mt-5'>
            <h1 className='text-white text-[1.4rem] font-[600] mb-4'>
              Choose a vehicle
            </h1>
          </div>

          <button onClick={(e)=>{
            e.preventDefault();
            setVehicle('car');
          }} className='w-full flex items-center justify-between rounded-md bg-white p-4 mb-4 cursor-pointer hover:shadow-lg transition-all duration-300 h-20 font-bold'>
            <h3>
              Car
            </h3>
            <h3>
              {fare && fare["car"]}
            </h3>
          </button>
          <button onClick={(e)=>{
            e.preventDefault();
            setVehicle('motorcycle');
          }} className='w-full flex items-center justify-between rounded-md bg-white p-4 mb-4 cursor-pointer hover:shadow-lg transition-all duration-300 h-20 font-bold'>
            <h3>
              Moto
            </h3>
            <h3>
              {fare && fare["motorcycle"]}
            </h3>
          </button>
          <button onClick={(e)=>{
            e.preventDefault();
            setVehicle('auto');
          }} className='w-full flex items-center justify-between rounded-md bg-white p-4 mb-4 cursor-pointer hover:shadow-lg transition-all duration-300 h-20 font-bold'>
            <h3>
              Auto
            </h3>
            <h3>
              {fare && fare["auto"]}
            </h3> 
          </button>

          <button className='w-[40%] bg-emerald-500 h-10 rounded-md text-white' onClick={()=>{
            bookRide();
          }}>
            Book Ride
          </button>
        </div>
      )}

      {
        waiting && <Waiting waiting={waiting} />
      }

      {
        ride && <AcceptRide ride={ride} confirm={confirm} setConfirm={setConfirm} setRide={setRide}/>
      }

      {
        finish && <MakePayment finish={finish} ride={ride} setFinish={setFinish} setRide={setRide}/>
      }

    </div>
  )
}

export default Home
