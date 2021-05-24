import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid  from "@material-ui/core/Grid";

// TO DO:
{/*

As a Pokemon enthusiast I want to be able to see the information
o Name
o Weight
o Order
*/}
const PokemonCard = ({pokemon}) => {
    return (
        <Grid item xs={3} key={pokemon.id}>
            <div>
                <Card key={pokemon.id}>
                     <CardContent key={pokemon.id}>
                    <Typography  color="textSecondary" gutterBottom>
                         <b>Id</b>: {pokemon.id}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        <b>Name:</b> {pokemon.name}
                    </Typography>
                    <Typography color="textSecondary">
                    <b> Height:</b> {pokemon.height*10}cm
                    </Typography>
                    
                    <img src={pokemon.sprites['front_default']} />
                    <img src={pokemon.sprites['back_default']} />     
                </CardContent>       
                </Card> 
            </div> 
      </Grid>
    )
};

export default PokemonCard