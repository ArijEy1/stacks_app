import React from 'react'
import './Stacks.css'
import CustomPaginationActionsTable from './ListComponent';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';

function Stacks() {
    const { stackId } = useParams();
  return (<> <Navbar/>
    <CustomPaginationActionsTable/> </>

 
  )
}

export default Stacks