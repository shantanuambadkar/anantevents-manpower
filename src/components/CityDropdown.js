import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const CityDropdown = () => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch(
                    'https://sheets.googleapis.com/v4/spreadsheets/1xpmhPUNWl7B9DuEX6ybO6OFN0I9fmGBXA7jlYUWMW4E/values/Sheet1!F2:F?key=AIzaSyBFtCHKaHsZ65qFW-Tx4reAz_qQS8rE2S0'
                );
                const data = await response.json();

                if (!data.values) {
                    throw new Error('No data found');
                }

                const uniqueCities = Array.from(new Set(data.values.map(city => city[0]))).filter(Boolean);
                setCities(uniqueCities);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCities();
    }, []);

    const handleChangeCity = (e) => {
        setSelectedCity(e.target.value);
    };

    const handleChangeDate = (newValue) => {
        setSelectedDate(newValue);
    };

    const handleViewEvents = () => {
        // Logic to view events based on selected city and date
        console.log('View Events:', selectedCity, selectedDate);
    };

    /* const handleViewAllEvents = () => {
        // Logic to view all events
        console.log('View All Events');
    }; */

    if (loading) return <CircularProgress />;
    if (error) return <div>Error: {error}</div>;

    return (
        <Box sx={{ flexGrow: 1 }} className='custom-top-mar'>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="manpower-city-label">Select Event City</InputLabel>
                        <Select
                            labelId="manpower-city-label"
                            id="manpower-city"
                            value={selectedCity}
                            label="Select Event City"
                            onChange={handleChangeCity}
                            sx={{
                                minWidth: '200px',
                                '& .MuiSelect-select': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    minWidth: '200px',
                                },
                            }}
                        >
                            {cities.map((city) => (
                                <MenuItem key={city} value={city}>{city}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Select Event Date"
                            value={selectedDate}
                            onChange={handleChangeDate}
                            renderInput={(params) => <TextField {...params} fullWidth sx={{ height: '56px' }} />}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
            <Grid container spacing={2} className='custom-top-mar'>
                <Grid item xs={12} sm={8} md={9}>
                    <Button variant="contained" onClick={handleViewEvents}>View Events</Button>
                </Grid>
                {/* <Grid item xs={12} sm={4} md={3}>
                    <Button variant="contained" fullWidth onClick={handleViewAllEvents}>View All Events</Button>
                </Grid> */}
            </Grid>
        </Box>
    );
};

export default CityDropdown;
