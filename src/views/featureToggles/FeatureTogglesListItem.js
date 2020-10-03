import { ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import React from 'react';
import { Link } from 'react-router-dom';


const FeatureTogglesListItem = (props) => {
  const FEAT_TOGGLE_URL = "/feature-toggles"
  return (
    <ListItem key={props.item.id} button component={Link} to={`${FEAT_TOGGLE_URL}/${props.item.id}`}>
      <ListItemText id={props.item.id} primary={props.item.name} />
      <ListItemSecondaryAction>
        {props.item.enabled
          ? <ToggleOnIcon style={{ color: green[500], fontSize: 40 }}/>
          : <ToggleOnIcon color="disabled" style={{fontSize: 40}}/>
        }
        {/* <Switch
          edge="end"
          onChange={() => props.handleToggle(props.item)}
          checked={props.item.enabled}
          inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
        /> */}
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default FeatureTogglesListItem;