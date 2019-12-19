import React from 'react';
import PageNotFound from '../../assets/page-404.png';

const NotFound = () => (
  <div className='page-not-found'>
    <img alt='404 Error' src={PageNotFound} style={{width: 300, height: 300, display: 'block', margin: 'auto', position: 'relative' }} />
  </div>
);

export default NotFound;
