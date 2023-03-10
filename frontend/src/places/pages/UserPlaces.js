import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/Uelement/ErrorModal';
import { useHttpClient } from '../../hook/Http-Hook';
import LoadingSpinner from '../../shared/components/Uelement/LoadingSpinner';
// import Button from '../../shared/components/FormElements/Button';


const UserPlaces = () => {
  const[loadedPlaces, setLoadedPlaces] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const userId = useParams().userId;
  useEffect(()=> {
    const fetchPlaces = async () => {
       try {
        const responseData = await sendRequest (`http://localhost:4000/api/places/user/${userId}`);
        setLoadedPlaces (responseData.places)
       } catch (err) {}
    };
    fetchPlaces();

  }, [sendRequest,userId ])
    
  const placeDeleteHandler = deletedPlaceId=> {
    setLoadedPlaces( prevPlaces => prevPlaces.filter(place=>place.id !==deletedPlaceId)
    );
  }
  return (
    <>
    <ErrorModal error = {error} onClear = {clearError} />
    { isLoading && (
      <div className='center' >
        <LoadingSpinner />
      </div>

    )}
    {!isLoading && loadedPlaces && <PlaceList items = {loadedPlaces} onDeletePlace={placeDeleteHandler}/>}
     
    </>
  )
}

export default UserPlaces
