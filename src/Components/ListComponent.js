import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead'; // Import TableHead
import Paper from '@mui/material/Paper';
import './List.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FcApproval ,FcCancel} from "react-icons/fc";

function CustomPaginationActionsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [stack, setStack] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the data by stackId from URL parameter
  const { stackId } = useParams();

  useEffect(() => {
    axios
      .get(`https://zenml-frontend-challenge-backend.fly.dev/components`)
      .then((response) => {
        const stackData = response.data;
        setStack(stackData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [stackId]); // Re-fetch data when stackId changes

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  // Calculate the index of the first and last item on the current page
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <div className="stacks-details">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center" // Center the table horizontally
        m={2} // Add margin around the table
      >
        <Paper elevation={3} sx={{ borderRadius: 10, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
          <TableContainer>
            <Table sx={{ minWidth: 500, paddingTop:'18px', marginBottom:"8px" }} aria-label="custom pagination table">
              <TableHead> {/* Table header */}
                <TableRow>
                  <TableCell  align="center" style={{fontWeight:'bold'}}>ID</TableCell>
                  <TableCell align="center" style={{fontWeight:'bold'}}>Created</TableCell>
                  <TableCell align="center" style={{fontWeight:'bold'}}>Name</TableCell>
                  <TableCell align="center" style={{fontWeight:'bold'}}>Shared</TableCell>
                  <TableCell align="right" style={{fontWeight:'bold'}}>Flavor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stack.slice(startIndex, endIndex).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {item.created}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {item.name}
                    </TableCell>
                 
                    <TableCell style={{ width: 160 }} align="center">
                      {item.is_shared===true ?
                    <FcApproval/>
                    :
                    <FcCancel/>}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {item.flavor}
                    </TableCell>
                    {/* <TableCell style={{ width: 160 }} align="right">
  {JSON.stringify(item.configuration)}
</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Add pagination component */}
        <TablePagination
        sx={{ borderRadius: 10, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={stack.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </div>
  );
}

export default CustomPaginationActionsTable;
