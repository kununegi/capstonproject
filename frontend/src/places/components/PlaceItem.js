import React, {useState, useContext} from 'react';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/Uelement/Card';
import Map from '../../shared/components/Uelement/Map';
import Modal from '../../shared/components/Uelement/Modal';
import { AuthContext } from '../../shared/context/Authcontext';
import './PlaceItem.css';

const PlaceItem = props => {
  const auth =useContext(AuthContext);

  const [showMap, setShowMap] = useState(false);
  const[showConfirmModal, setShowConfirm] = useState(false);
  const openMapHandler = () =>setShowMap (true);
  const closeMapHandler = () =>setShowMap (false);
  const showDeleteWarningHandler =() => {
    setShowConfirm(true);
  };
  const cancelDeleteHandler =()=>{
    setShowConfirm(false);
  }

  const confirmDeleteHandler =()=>{
    setShowConfirm(false)
    console.log("Delete");
  }

  return (
    <>
    <Modal show={showMap} 
    onCancel ={closeMapHandler} 
    header ={props.address} 
    contentClass="place-item__modal-content"
    footerClass="place-item__modal-actions"
    footer={<Button onClick={closeMapHandler}>CLOSE</Button>}>
    <div className='map-container'>
      <Map center={props.coordinates} zoom={16} />
    </div>
    </Modal>

    <Modal 
      show={showConfirmModal}
      onCancel={cancelDeleteHandler}
    header="Are you Sure?" 
    footerClass="place-item__modal-actions" 
    footer={
      <>
      <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
      <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
      </>
    }>
      <p> Do you want to proceed and delete this place ? Please note that 
        it can't be undone thereafter.
      </p>
    </Modal>
    <li className='place-item'>
      <Card className="place-item__content">        
        <div className='place-item__image'>
            <img src ={props.image} alt={props.title} />
            
        </div>
        <div className='place-item__info'>
                <h2>{props.title}</h2>
                <h3> {props.address}</h3>
                <p>{props.description}</p>
            </div>  
        </Card>        
        <div className='place-item__action'>
            <Button inverse onClick={openMapHandler}> VIEW ON MAP</Button>
            {auth.isLoggedIn && <Button to={`/places/${props.id}`}> EDIT</Button>}
            {auth.isLoggedIn && <Button danger onClick={showDeleteWarningHandler}> DELETE</Button>}
        </div>    
        
    </li>
    </>
    
  )
}

export default PlaceItem