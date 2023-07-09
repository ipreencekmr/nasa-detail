import React, { useCallback } from "react";

import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AsterCard } from "./AsterCard";
import dayjs from 'dayjs';

const API_URL = 'https://api.nasa.gov/neo/rest/v1/feed';
const API_KEY = 'Vv0TXGbYxieYxAIb0NfziTHJssra0FHhF8cn6DD9';

export const Asteroids = () => {

    const now = new Date();
    const [startDate, setStartDate] = React.useState(dayjs(now).format("YYYY-MM-DD"));
    const [endDate, setEndDate] = React.useState(dayjs(now).format("YYYY-MM-DD"));
    const [neoResponse, setNeoResponse] = React.useState([]);

    const fetchAPI = useCallback(() => {

        const paramStr = new URLSearchParams({
            start_date: startDate,
            end_date: endDate,
            api_key: API_KEY
        });

        fetch(API_URL+'?'+paramStr).then((response)=>response.json()).then(response => {
        
            const responseList = [];

            for (const [key, value] of Object.entries(response?.near_earth_objects)) {
                console.log(`${key}: ${value}`);

                const asteroidObjects = value.map((item)=> {
                    const newItem = {...item};
                    newItem['date'] = key;
                    return newItem;
                });
                responseList.push(...asteroidObjects);
            }

            setNeoResponse(responseList);
        }).catch((error) => {
            console.log('API Error: '+error);
        });
    },[startDate, endDate]);

    React.useEffect(() => {
        fetchAPI();
    }, []);

    return (
    <Container>
        <Typography gutterBottom variant="h5" component="div">
            Max feed limit is 7 Days
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
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            columnGap="1rem"
            rowGap="1rem"
            sx={{
                my:2, 
                border: '1px dashed gray',
                padding: '1rem'
            }}
        >
            {
                neoResponse.map(item => {
                    return <Grid item={true} key={item.name}>
                        <AsterCard item={item} />
                    </Grid>
                })
            }
        </Grid>
    </Container>)
}