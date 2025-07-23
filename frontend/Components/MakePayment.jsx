import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

const MakePayment = (props) => {
  const [ride, setRide] = useState(props.ride);
  const [visible, setVisible] = useState(props.finish);
  const [shrunk, setShrunk] = useState(false);
  const panelRef = useRef();

  props.setRide(null);

  // Show/hide panel with bottom anchored
  useEffect(() => {
    gsap.to(panelRef.current, {
      height: visible ? (shrunk ? '4rem' : '70%') : '0%',
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        if (!visible) {
          props.setFinish(false);
        }
      }
    });
  }, [visible]);

  // Handle shrink/expand toggle
  useEffect(() => {
    if (visible) {
      gsap.to(panelRef.current, {
        height: shrunk ? '4rem' : '70%',
        duration: 0.3,
        ease: 'power2.inOut',
      });
    }
  }, [shrunk]);

  if (!ride) return null;

  const durationMinutes = Math.round(Number(ride.duration) || 0);
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  const durationString =
    hours > 0
      ? `${hours} hr${hours > 1 ? 's' : ''} ${minutes} min`
      : `${minutes} min`;

  const handleFinish = () => {
    setVisible(false);
  };

  return (
    <div
      ref={panelRef}
      className="finish-ride"
      style={{
        position: 'absolute',
        background: '#fff',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '0%', // initial height will be animated
        display: 'flex',
        flexDirection: 'column',
        borderTopLeftRadius: '1rem',
        borderTopRightRadius: '1rem',
        boxShadow: '0 -2px 24px rgba(0,0,0,0.12)',
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 1000,
        overflow: 'hidden',
      }}
    >
      {/* Header with toggle */}
      <div
        style={{
          width: '100%',
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #e5e7eb',
          background: '#f9fafb',
        }}
      >
        <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Ride Summary</div>
        <button
          onClick={() => setShrunk((prev) => !prev)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.25rem',
            cursor: 'pointer',
            color: '#4b5563',
          }}
        >
          {shrunk ? <FaAngleUp /> : <FaAngleDown />}
        </button>
      </div>

      {/* Content only shown when expanded */}
      {!shrunk && (
        <div
          style={{
            width: '90%',
            margin: '0 auto',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
            background: '#f9fafb',
            marginTop: '1rem',
            borderRadius: '1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ fontSize: '1.5rem' }}>
            <span style={{ fontWeight: 'bold' }}>Distance:</span> {ride.distance} Km
          </div>
          <div style={{ fontSize: '1.5rem' }}>
            <span style={{ fontWeight: 'bold' }}>Duration:</span> {durationString}
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a' }}>
            ₹{ride.fare}
          </div>
          <button
            style={{
              backgroundColor: '#ef4444',
              color: '#fff',
              padding: '1rem 3rem',
              borderRadius: '0.5rem',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
            onClick={handleFinish}
          >
            Make Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default MakePayment;
