import { Box, Typography, Divider, AccordionDetails, Accordion, AccordionSummary, ImageListItem, ImageListItemBar, ImageList } from "@mui/material";
import homepage from "../../public/pictures/home image2.jpg"
import ExpandMoreIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from "react";
import { Exports } from "../DataFiles/Chef";
import { Pictures } from "../DataFiles/FoodPicture";
import { QuestionsAnswers } from "../DataFiles/QuesAns";

function Home() {
    const [expanded, setExpanded] = useState<number | null>(null);

    const questions = QuestionsAnswers
    const experts = Exports
    const pictures = Pictures
    return (
        <Box sx={{ padding: '0', width: '100%', margin: 0}}>

            <Box sx={{ width: '100%', height: '642px', backgroundImage: `url(${homepage})`, objectFit: 'cover', backgroundPosition: 'center', marginBottom: '35px' }}>
            </Box>

            <Divider sx={{ marginBottom: '35px', marginTop: '20px', fontSize: '32px' }}>Our Recommendations</Divider>
            <ImageList sx={{ width: '100%', height: 'max-content', gap: '16px' }} cols={3} rowHeight={300}>
                {pictures.map((item) => (
                    <ImageListItem key={item.img} sx={{ marginBottom: '20px', height: '300px' }}>
                        <img
                            src={item.img}
                            alt={item.title}
                            loading="lazy"
                            style={{ height: '90%', objectFit: 'cover' }}
                        />
                        <ImageListItemBar
                            title={item.title}
                            position="below"
                        />
                    </ImageListItem>
                ))}
            </ImageList>

            <Divider sx={{ marginBottom: '50px', marginTop: '20px', fontSize: '32px' }}>Our Expert Chefes</Divider>

            <ImageList sx={{ width: '100%', justifyContent: 'center' }} cols={4} >
                {experts.map((item) => (
                    <ImageListItem key={item.img}
                        sx={{
                            marginBottom: '20px',
                            marginLeft: '15px',
                            transition: '0.3s',
                        }}
                    >
                        <img
                            src={item.img}
                            alt={item.name}
                            loading="lazy"
                            style={{ width: '280px', height: '280px', objectFit: 'cover', borderRadius: '50%', border: "0.5px solid rgba(0, 0, 0, 0.09)" }}
                        />
                        <ImageListItemBar
                            title={item.name}
                            position="below"
                            sx={{
                                textAlign: 'center',
                            }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>

            < Divider sx={{ marginBottom: '50px', marginTop: '20px', fontSize: '32px' }}>Frequently Asked Questions</Divider>

            {questions.map((item, index) => (
                <Accordion
                    key={index}
                    expanded={expanded === index}
                    onChange={() => setExpanded(index)}
                    sx={{ color: 'black', marginBottom: '8px' }}
                >
                    <AccordionSummary
                        expandIcon={
                            expanded === index
                                ? <RemoveIcon sx={{ color: 'rgb(46,166,130)' }} />
                                : <ExpandMoreIcon sx={{ color: 'rgb(214,62,101)' }} />
                        }
                        sx={{ '& .MuiAccordionSummary-content': { marginLeft: '8px' } }}
                    >
                        <Typography>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{item.answer}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}

            {/* Footer */}
            <Box sx={{ backgroundColor: 'rgb(235,214,167)', padding: '16px 0', textAlign: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                    Chaya Etrog © 2025 All Rights Reserved.
                </Typography>
            </Box>

        </Box>
    );
}

export default Home;