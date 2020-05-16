import React from "react";
import { Container, Card, CardContent, Typography, Grid, BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import { Restore, Favorite, LocationOn } from "@material-ui/icons";
import "./UserCard.css";



const UserCard =() => {

  return(
    <Container>
      <Grid container spacing={3} justify="center">
        <Grid item component={Card} xs={12} md={3} className="card">
          <CardContent>
            <Typography variant="h4" gutterBottom>Bob Bobsen</Typography>
            <Typography color="textSecondary">Lives in Bimbam</Typography>
            <Typography variant="h5">Pace: 9min/miles</Typography>
            <Typography variant="h5">Distance: 3mile runs</Typography>
            <BottomNavigation 
              showLabels>
              <BottomNavigationAction label="Recents" icon={<Restore />} />
              <BottomNavigationAction label="Favorites" icon={<Favorite />} />
              <BottomNavigationAction label="Nearby" icon={<LocationOn />} />
            </BottomNavigation>
          </CardContent>
        </Grid>

        <Grid item component={Card} xs={12} md={3} className="card">
          <CardContent>
            <Typography variant="h4" gutterBottom>Bob Bobsen</Typography>
            <Typography color="textSecondary">Lives in Bimbam</Typography>
            <Typography variant="h5">Pace: 9min/miles</Typography>
            <Typography variant="h5">Distance: 3mile runs</Typography>
            <BottomNavigation 
              showLabels>
              <BottomNavigationAction label="Recents" icon={<Restore />} />
              <BottomNavigationAction label="Favorites" icon={<Favorite />} />
              <BottomNavigationAction label="Nearby" icon={<LocationOn />} />
            </BottomNavigation>
          </CardContent>
        </Grid>

        <Grid item component={Card} xs={12} md={3} className="card">
          <CardContent>
            <Typography variant="h4" gutterBottom>Bob Bobsen</Typography>
            <Typography color="textSecondary">Lives in Bimbam</Typography>
            <Typography variant="h5">Pace: 9min/miles</Typography>
            <Typography variant="h5">Distance: 3mile runs</Typography>
            <BottomNavigation 
              showLabels>
              <BottomNavigationAction label="Recents" icon={<Restore />} />
              <BottomNavigationAction label="Favorites" icon={<Favorite />} />
              <BottomNavigationAction label="Nearby" icon={<LocationOn />} />
            </BottomNavigation>
          </CardContent>
        </Grid>

        </Grid>
    </Container>
)
}

export default UserCard;