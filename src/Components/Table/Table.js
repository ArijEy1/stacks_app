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
import { FcApproval, FcCancel } from 'react-icons/fc';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar'; // Use MUI Snackbar
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { format } from 'date-fns';
import { Alert } from '@mui/material';

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
        setOpenAlert(true); // Open the Snackbar when an error occurs
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

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  if (loading) {
    return (
      <div className="loader">
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    <div className="stacks-details">
      <Box display="flex" flexDirection="column" alignItems="center" m={2}>
        <Paper
          elevation={4}
          sx={{
            borderRadius: 10,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <TableContainer>
            {/* ... Rest of your table code ... */}
          </TableContainer>
        </Paper>

        <TablePagination
          sx={{
            borderRadius: 10,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          }}
          // ... Rest of your pagination code ...
        />
      </Box>

      {/* Snackbar for displaying errors */}
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        // Adjust the position of the Snackbar based on your design
        sx={{ top: '50px' }}
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
          Error: {error?.message || 'Unknown error'}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomPaginationActionsTable;
