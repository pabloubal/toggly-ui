import { Button, Divider, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, Switch, TextField, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { urls } from '../../components/Router';
import FeatureToggleEntity from '../../entities/FeatureToggleEntity';
import OperationStatusEntity from '../../entities/OperationStatusEntity';
import FeatureToggleService from '../../services/feature-toggle-service/FeatureToggleService';
import SessionStorageService from '../../services/session-storage-service/SessionStorageService';
import './FeatureToggle.css';


function FeatureToogle(props) {
  const [toggle, setToggle] = useState(new FeatureToggleEntity(0, "", false));
  const [redirect, setRedirect] = useState(false);
  const toggleId = props.match.params.toggleId;
  const OP_CREATE = "create"
  const OP_EDIT = "edit"
  const OP_DELETE = "delete"

  function updateToggle() {
    if(toggleId!=null){
      FeatureToggleService.findOne(toggleId)
        .then(response => setToggle(response))
        .catch(error => console.log(error))
    }
  }

  useEffect(() => {
    updateToggle();
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    isEdit()
      ? FeatureToggleService.update(toggle)
        .then(response => updateRedirect(new OperationStatusEntity(urls.featureTogglesURL, toggle.name, OP_EDIT, true)))
        .catch(error => updateRedirect(new OperationStatusEntity(urls.featureTogglesURL, toggle.name, OP_EDIT, false, error)))
      : FeatureToggleService.create(toggle)
        .then(response => updateRedirect(new OperationStatusEntity(urls.featureTogglesURL, toggle.name, OP_CREATE, true)))
        .catch(error => updateRedirect(new OperationStatusEntity(urls.featureTogglesURL, toggle.name, OP_CREATE, false, error)));
  }

  function updateRedirect(status) {
    SessionStorageService.push(status);
    setRedirect(true)
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
    .then(response => updateRedirect(new OperationStatusEntity(urls.featureTogglesURL, toggle.name, OP_DELETE, true)))
    .catch(error => updateRedirect(new OperationStatusEntity(urls.featureTogglesURL, toggle.name, OP_DELETE, false, error)))
  }

  function isEdit() {
    return toggleId ? true : false;
  }

  return (
    <div className="toggle-container">
      {redirect ? <Redirect to={urls.featureTogglesURL} /> : null}
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
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
          <Divider />


          <div className="buttonsContainer">

            <Link to={urls.featureTogglesURL}>
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
