import React from 'react'
import './StackComponents.css'
import CustomPaginationActionsTable from '../Table/Table';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

function StackComponents() {
  return (
    <>
      <Navbar />
      <CustomPaginationActionsTable />
      <Footer/>
    </>
  )
}

export default StackComponents