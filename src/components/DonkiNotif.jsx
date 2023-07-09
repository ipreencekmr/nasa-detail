import React from "react";
import dayjs from 'dayjs';

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from '@mui/material/Typography';
import { notifTypes } from "../constants/constants";

const API_URL = 'https://api.nasa.gov/DONKI/notifications';
const API_KEY = 'Vv0TXGbYxieYxAIb0NfziTHJssra0FHhF8cn6DD9';

import { DonkiCard } from "./DonkiCard";

export const DonkiNotif = () => {
    const now = new Date();
    const [startDate, setStartDate] = React.useState(dayjs(now).format("YYYY-MM-DD"));
    const [endDate, setEndDate] = React.useState(dayjs(now).format("YYYY-MM-DD"));
    const [type, setType] = React.useState('all');

    const [donkiResponse, setDonkiResponse] = React.useState([]);

    const fetchAPI = React.useCallback(() => {

        const paramStr = new URLSearchParams({
            type:type,
            start_date: startDate,
            end_date: endDate,
            api_key: API_KEY
        });

        fetch(API_URL+'?'+paramStr).then((response)=>response.json()).then(response => {
            setDonkiResponse(response);
        }).catch((error) => {
            console.log('API Error: '+error);
        });
    },[startDate, endDate, type]);

    React.useEffect(() => {
        fetchAPI();
    }, []);

    return (
        <Container>
            <Typography gutterBottom variant="h5" component="div">
                Donki Notifications (max feed limit is 7 Days)
            </Typography>
            <Grid 
                container={true}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                rowGap="1rem"
                >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    columnGap="1rem"
                    flexGrow={1}
                >
                    <TextField 
                        type="date"
                        value={startDate}
                        onChange={(e)=>setStartDate(e.target.value)}
                        variant="outlined" />

                    <TextField 
                        type="date"
                        value={endDate}
                        onChange={(e)=>setEndDate(e.target.value)}
                        variant="outlined" />

                    <Select
                        value={type}
                        label="Type"
                        onChange={(e) => setType(e.target.value)}
                    >
                        {
                            notifTypes.map((item) => (
                                <MenuItem key={item} 
                                    value={item}>{item}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                >
                    <Button variant="outlined" onClick={()=>fetchAPI()}>Refresh</Button>
                </Box>
            </Grid>
            <Grid 
                container={true}
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                rowGap="1rem"
                sx={{
                    my:2,
                }}
            >
                {
                    donkiResponse.map((item)=>(
                        <DonkiCard key={item.messageID} item={item} />
                    ))
                }
            </Grid>
        </Container>
    )
}