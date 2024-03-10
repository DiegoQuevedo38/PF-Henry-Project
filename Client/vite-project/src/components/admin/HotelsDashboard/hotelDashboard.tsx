import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../Redux/Reducer/reducer';
import { getDisabledHotels } from '../../../Redux/Actions/actions';
import TableContainer from '@material-ui/core/TableContainer';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {Row, createData} from "./tableRow"
import "./HotelDashboard.css"
import ReuseCalendar from '../utils/calendar';
import ReusableSearchBar from '../utils/ReusableSearchBar';


export default function HotelDashboard() {
  
  const allAdminHotels = useSelector((state: State) => state.allAdminHotels);
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getDisabledHotels());
  }, [dispatch]);
  

  const rows = allAdminHotels.map((hotel) =>
  createData(
    hotel._id,
    hotel.name,
    hotel.address,
    hotel.owner || null,
    hotel.availability, 
    hotel.rooms?.map((room) => ({
      description: room.description || '',
      typeOfRoom: room.typeOfRoom || '',
      id: room.id || '',
      num_rooms: room.num_rooms || 0,
      price: room.price || 0,
      availability: room.availability || true
    })) || [],
  )
);

  return (
    <div className='dashboardContainer'>
    <div className='table_search'>
      <ReusableSearchBar />

    <div className='TableContainer'>
    <TableContainer component={Paper} >
      <Typography variant="h3" gutterBottom component="div" className='table-title'>
        Admin your Hotels
      </Typography>
      <Table aria-label="collapsible table">
        <TableHead className='table-head'>
          <TableRow>
            <TableCell> </TableCell>
            <TableCell align="center">Hotel Name</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Owner</TableCell>
            <TableCell align="right">Available</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.Name} row={row} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    </div>
      <div className='calendar'>
      <ReuseCalendar />
      </div>
  </div>
  );
}
