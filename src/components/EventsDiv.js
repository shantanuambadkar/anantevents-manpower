import axios from "axios";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Button, CardActions, CardContent, Typography } from '@mui/material';

export default function EventsDiv({ city, date }) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('https://sheets.googleapis.com/v4/spreadsheets/1xpmhPUNWl7B9DuEX6ybO6OFN0I9fmGBXA7jlYUWMW4E/values/Sheet1?key=AIzaSyBFtCHKaHsZ65qFW-Tx4reAz_qQS8rE2S0');
                console.log(response.data.values);
                setEvents(response.data.values.slice(1)); // Skip header row
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    const filteredEvents = events.filter((event) => {
        // Only filter if both city and date are provided
        if (city && date) {
            return event[1] === city && event[2] === date; // Assuming city is column 2 and date is column 3
        }
        // If either city or date is missing, return all events
        return true;
    });

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-start' },
                alignItems: { xs: 'center', md: 'flex-start' }, // Align vertically in small screens
                minHeight: { xs: '100vh', md: 'auto' }, // Full height on small screens
                padding: 2,
            }}
        >
            <Grid
                container
                spacing={2}
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' }, // Column on small screens, row on larger
                }}
            >
                {filteredEvents.map((event, index) => (
                    <Grid
                        item
                        key={index}
                        xs={12} // Full width on small screens
                        sm={6} // Half width on medium screens
                        md={3} // Quarter width on large screens
                        display="flex" // Ensure flex to center content in small/medium screens
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Card
                            className='custom-top-mar'
                            variant="outlined"
                            sx={{
                                minHeight: 300,
                                minWidth: 300
                            }}
                        >
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    sx={{ color: 'text.secondary', fontSize: 14 }}
                                >
                                    {event[4]} {/* Displaying column 5 */}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {event[3]} {/* Displaying column 4 */}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{event[5]}</Typography>
                            </CardContent>
                            <CardContent>
                                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Male Requirement: {event[6]}</Typography>
                                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Female Requirement: {event[7]}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
