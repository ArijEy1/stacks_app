import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import './Table.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FcApproval, FcCancel } from "react-icons/fc";
import Alert from '@mui/material/Alert';
import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { format } from 'date-fns';
import { GridLoader } from 'react-spinners';

function CustomPaginationActionsTable() {
  const [openAlert, setOpenAlert] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [stack, setStack] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  }, [stackId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  if (loading) {
    return (
      <div className="loader">
        <GridLoader
                  color="#7c3679"
                  loading={loading}
                  size={30}
                  style={{
                    marginTop: '15vh',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'block',
                  }}
                />
      </div>
    );
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  if (error) {
    return (
      <div className="error">
        <Snackbar
          open={openAlert}
          autoHideDuration={6000} 
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            severity="error"
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseAlert}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
            sx={{ zIndex: 2000 }}
          >
            Error: {error.message}
          </Alert>
        </Snackbar>
      </div>
    );
  }

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <div className="stacks-details">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center" 
        m={2} 
      >
        <Paper
          elevation={4}
          sx={{ borderRadius: 10, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
        >
          <TableContainer>
            <Table
              sx={{ minWidth: 500, paddingTop: '18px', marginBottom: "8px" }}
              aria-label="custom pagination table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    ID
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Created
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Name
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Shared
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Flavor
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stack.slice(startIndex, endIndex).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      <Tooltip title={item.id} arrow>
                        <span>{item.id.substring(0, 8)}...</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {format(new Date(item.created), 'MM/dd/yyyy HH:mm:ss')}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {item.name}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {item.is_shared === true ? <FcApproval /> : <FcCancel />}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {item.flavor}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

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
