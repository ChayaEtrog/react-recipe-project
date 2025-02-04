import { Avatar, Box, Divider, Typography } from "@mui/material";
import { Exports } from "../DataFiles/Chef";

function About() {
    const chefs = Exports
    return (<>
        <Box sx={{ padding: 4, marginTop: '100px' }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50', textAlign: 'center' }}>
                About Our Recipe Website
            </Typography>

            <Divider sx={{ marginBottom: 5, fontWeight: '600', color: '#34495e', fontSize: '28px ' }} textAlign="left">Our Mission</Divider>
            <Typography paragraph sx={{ lineHeight: 1.7, color: '#7f8c8d' }}>
                Welcome to our recipe website! We are dedicated to providing you with a wide variety of delicious and easy-to-follow recipes
                for all occasions. Whether you're a beginner in the kitchen or a seasoned chef, our goal is to inspire you to create meals
                that will bring joy to your table.
            </Typography>

            <Divider sx={{ marginBottom: 5, marginTop: 5, fontWeight: '600', color: '#34495e', fontSize: '28px ' }} textAlign="left">What We Offer</Divider>
            <Typography paragraph sx={{ lineHeight: 1.7, color: '#7f8c8d' }}>
                From breakfast to dinner, we offer a diverse collection of recipes tailored to suit every taste and dietary preference.
                Our website also features tips and tricks to make cooking easier and more enjoyable. You can search for recipes by ingredients,
                meal type, or cuisine, and save your favorites for future reference.
            </Typography>

            <Divider sx={{ marginBottom: 5, marginTop: 5, fontWeight: '600', color: '#34495e', fontSize: '28px ' }} textAlign="left" >Why Choose Us?</Divider>
            <Typography paragraph sx={{ lineHeight: 1.7, color: '#7f8c8d' }}>
                - **High-Quality Recipes** – All of our recipes are tested and approved by culinary experts.
                - **Healthy & Delicious Options** – We offer nutritious and tasty recipes to fit every lifestyle.
                - **Easy-To-Follow Instructions** – Step-by-step guides to make cooking stress-free.
                - **Community-Driven Platform** – Join a growing community of food lovers and share your own creations.
            </Typography>

            <Divider sx={{ marginBottom: 5, marginTop: 5, fontWeight: '600', color: '#34495e', fontSize: '28px ' }} textAlign="left">Meet Our Chefs</Divider>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3, marginTop: 2 }}>
                {chefs.map((chef, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 2,
                            width: 200
                        }}
                    >
                        <Avatar src={chef.img} sx={{ width: 100, height: 100 }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 1, color: '#34495e' }} textAlign="left">{chef.name}</Typography>
                    </Box>))}
            </Box>

            <Divider sx={{ marginBottom: 5, marginTop: 5, fontWeight: '600', color: '#34495e', fontSize: '28px ' }} textAlign="left">Join Us!</Divider>
            <Typography paragraph sx={{ lineHeight: 1.7, color: '#7f8c8d' }}>
                We believe that cooking is more than just a task—it's a creative and fulfilling experience. Join us as we explore new flavors,
                experiment with recipes, and share the love for food. Start cooking today and make every meal special!
            </Typography>
        </Box>
    </>)
}

export default About;