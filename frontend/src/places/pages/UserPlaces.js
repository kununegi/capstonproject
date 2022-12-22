import React from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList'
// import Button from '../../shared/components/FormElements/Button';

const DUMMY_PLACES =[
    {
        id:'pl',
        title:'Emipre State building',
        description:'One of the famouns building in the world',
        image:'https://cdn.pixabay.com/photo/2022/12/06/05/57/branch-7638340_960_720.jpg',
        address:'20 W 34th St., New York, NY 10001, United States',
        location:{
            lat:40.7478496,
            lng:-73.9894482
        },
        creator:'u1'
    },
    {
        id:'p2',
        title:'Emipre State building',
        description:'One of the famouns building in the world',
        image:'https://cdn.pixabay.com/photo/2022/12/06/05/57/branch-7638340_960_720.jpg',
        address:'20 W 34th St., New York, NY 10001, United States',
        location:{
            lat:40.7478496,
            lng:-73.9894482
        },
        creator:'u2'
    },
];
const UserPlaces = () => {
    const userId= useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place =>place.creator===userId)
  
  return (
    <div>
      <PlaceList items={loadedPlaces}/>;
    </div>
  )
}

export default UserPlaces
