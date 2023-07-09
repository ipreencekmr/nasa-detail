import React from "react"
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import dayjs from 'dayjs';

export const DonkiCard = ({item}) => {
    if(!item) return null;

    const {
        messageID,
        messageType, 
        messageURL,
        messageIssueTime,
        messageBody
    } = { ...item };

    return (
        <Card elevation={6}>
        <CardHeader
            title={messageID}
        />
            <CardContent>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        py: '2rem'
                    }}>
                    <Typography 
                        variant="body1" 
                        component="div">
                        {messageType}
                    </Typography>    
                    <Typography 
                        component="div"
                        sx={{
                            fontWeight:'fontWeightBold',
                            color:'gray'
                        }}
                        >
                        {dayjs(messageIssueTime).format("DD-MMM-YYYY")}
                    </Typography>         
                </Box>
                <Typography 
                    component="pre" 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                        whiteSpace:'pre-wrap',
                        wordWrap:'keep-all'
                    }}>
                    {messageBody}
                </Typography>
            </CardContent>
            <CardActions sx={{pl:'1rem'}}>
                <Link href={messageURL} underline="hover">
                    {messageURL}
                </Link>
            </CardActions>
        </Card>
    )
}