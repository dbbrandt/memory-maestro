import React from 'react'
import Spinner from '@bit/lekanmedia.shared-ui.spinner';

const AppSpinner = () => {
  return (
  <Spinner
    size={150}
    thickness={10}
    colors={['#3b73ff', '#5cb85c', '#d9534f', '#910ac7']}
  />
  )
}

export default AppSpinner;
