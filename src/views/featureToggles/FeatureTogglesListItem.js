import { ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import React from 'react';
import { Link } from 'react-router-dom';
import { urls } from '../../components/Router';


const FeatureTogglesListItem = (props) => {
  return (
    <ListItem key={props.item.id} button component={Link} to={`${urls.featureTogglesURL}/${props.item.id}`}>
      <ListItemText id={props.item.id} primary={props.item.name} />
      <ListItemSecondaryAction>
        {props.item.enabled
          ? <ToggleOnIcon style={{ color: "#4467fd99", fontSize: 40 }}/>
          : <ToggleOffIcon color="disabled" style={{fontSize: 40}}/>
        }
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default FeatureTogglesListItem;