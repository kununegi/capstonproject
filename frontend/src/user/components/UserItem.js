import React from 'react';
import {Link} from 'react-router-dom';
import Card from '../../shared/components/Uelement/Card';
import Avatar from '../../shared/components/Uelement/Avatar';
import './UserItem.css';

const UserItem = props => {
  return (
    <div className='user-item'>        
        <Card className='user-item__content'>
          <Link to={`/${props.id}/places`}>
            <div className='user-item__image'>
            <Avatar image={`http://localhost:4000/${props.image}`} alt={props.name}/>
            {/* <Avatar image={props.image} alt={props.name}/> */}
            </div>
            <div className='user-item__info'>
                <h2> {props.name}</h2>
                <h3>
                    {props.placeCount} {props.placeCount===1 ? 'Place' : 'Places'}
                </h3>                
            </div>
          </Link>
            
        </Card>
       

    </div>
  )
}

export default UserItem
