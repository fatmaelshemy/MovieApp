import React from 'react';
import img from '../../assets/img/09.png';

export default function Notfound() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <img style={{ width: '400px', height: '400px'}} src={img} alt="Not Found" />
    </div>
  );
}
