import { Button, Divider, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, Switch, TextField, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import FeatureToggleEntity from '../../entities/FeatureToggleEntity';
import FeatureToggleService from '../../services/feature-toggle-service/FeatureToggleService';
import './FeatureToggle.css';


function FeatureToogle(props) {
  const [toggle, setToggle] = useState(new FeatureToggleEntity(0, "", false));
  const FEAT_TOGGLE_URL = "/feature-toggles"
  const toggleId = props.match.params.toggleId;

  function updateToggle() {
    FeatureToggleService.findOne(toggleId)
      .then(response => setToggle(response))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    updateToggle();
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    isEdit()
      ? FeatureToggleService.update(toggle)
        .then(response =>
          props.history.push(`${FEAT_TOGGLE_URL}?featName=${toggle.name}&operation=edit&success=true`)
        )
        .catch(error => props.history.push(`${FEAT_TOGGLE_URL}?featName=${toggle.name}&operation=edit&success=false`))
      : FeatureToggleService.create(toggle)
        .then(response => props.history.push(`${FEAT_TOGGLE_URL}?featName=${toggle.name}&operation=create&success=true`))
        .catch(error => props.history.push(`${FEAT_TOGGLE_URL}?featName=${toggle.name}&operation=create&success=false`));

  }

  function handleToggle() {
    const newToggle = Object.assign({}, toggle);
    newToggle.enabled = !newToggle.enabled;
    setToggle(newToggle)
  }

  function handleNameChange(event) {
    const newToggle = {...toggle};
    newToggle.name = event.target.value;
    setToggle(newToggle)
  }

  function handleDelete() {
    FeatureToggleService.delete(toggle)
      .then(response => props.history.push(`${FEAT_TOGGLE_URL}?featName=${toggle.name}&operation=delete&success=true`))
      .catch(error => props.history.push(`${FEAT_TOGGLE_URL}?featName=${toggle.name}&operation=delete&success=false`))
  }

  function isEdit() {
    return toggleId ? true : false;
  }

  return (
    <div className="toggle-container">
      

      <Paper className="paper">
        <h3 className="title">{isEdit() ? "Edit " + toggle.name : "New Feature Toggle"}</h3>

        <Divider />

        <form onSubmit={handleSubmit}>
          <TextField
            name='featName'
            label='Feature Name'
            value={toggle ? toggle.name : ''}
            onChange={handleNameChange}
            fullWidth={true}
          />
          <Divider />
          <div className="toggleDiv">
            <List>
              <ListItem className="listSwitch">
                <ListItemText primary="Feature enabled" />
                <ListItemSecondaryAction>
                  <BlueSwitch
                    name="featEnabled"
                    edge="end"
                    onChange={() => handleToggle()}
                    checked={toggle.enabled}
                    color="#4467fd"
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
          <Divider />


          <div className="buttonsContainer">

            <Link to={FEAT_TOGGLE_URL}>
              <Button variant="contained" color="default">Cancel</Button>
            </Link>
            {isEdit() ? <Button variant="contained" color="secondary" className="saveButton" onClick={handleDelete}>Delete</Button> : ""}
            <Button variant="contained" color="primary" type="submit" className="saveButton">Save</Button>

          </div>
        </form>


        <div className="clear" />

      </Paper>
    </div>
  );
}

const BlueSwitch = withStyles({
  switchBase: {
    '&$checked': {
      color: "#4467fd",
    },
    '&$checked + $track': {
      backgroundColor: "#4467fd",
    },
  },
  checked: {},
  track: {},
})(Switch);

export default withRouter(FeatureToogle);
