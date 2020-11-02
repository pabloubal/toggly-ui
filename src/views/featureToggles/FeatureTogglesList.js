import { Button, List, TextField } from '@material-ui/core';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { urls } from '../../components/Router';
import FeatureToggleService from '../../services/feature-toggle-service/FeatureToggleService';
import FeatureTogglesListItem from './FeatureTogglesListItem';



function FeatureTooglesList(props) {
  const [toggles, setToggles] = useState([]);
  const [filters, setFilters] = useState({
    name: ''
  });

  function updateTogglesList() {
    FeatureToggleService.getAll()
      .then(response => setToggles(response))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    console.log("get logs")
    updateTogglesList();
    checkToast();
  }, [])

  function checkToast() {
    let toaster = {}
    toaster.name = qs.parse(props.location.search, { ignoreQueryPrefix: true }).featName
    if (toaster.name) {
      toaster.operation = qs.parse(props.location.search, { ignoreQueryPrefix: true }).operation
      toaster.success = (qs.parse(props.location.search, { ignoreQueryPrefix: true }).success === 'true')
      toaster.message = `${toaster.success
        ? toaster.name + (toaster.operation === 'edit'
          ? " saved correctly"
          : toaster.operation === 'create'
            ? " created successfully"
            : " has been deleted")
        : toaster.operation === 'edit'
          ? "An error occured when saving " + toaster.name
          : toaster.operation === 'create'
            ? "An error occured when creating " + toaster.name
            : "An error occured when deleting " + toaster.name
        }`
      toaster.success
        ? toast.success(`${toaster.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        : toast.error(`${toaster.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    }
  }

  function handleToggle(item) {
    item.enabled = !item.enabled;
    FeatureToggleService.update(item).then(response => {
      updateTogglesList();
    });
  }

  function filterByName(event) {
    const f = {...filters}
    f.name = event.target.value;
    setFilters(f)
  }

  return (
    <div className="toggles-container">
      <ToastContainer />

      <Route render={({ history }) => (
        <Button variant="contained" color="primary" component="span" onClick={() => { history.push(urls.featureTogglesAddURL) }}>
          New
        </Button>
      )} />

      <form>
        <div>
          <TextField
            id="toggle-name-filter"
            label="Filter by name"
            value={filters.name}
            onChange={filterByName}
            margin="normal"
          />
          {/* <Button variant="contained" color="secondary" type="submit" className="saveButton">Clear</Button> */}
        </div>
      </form>

      <List className="featuresList">
        {toggles.length 
          ? toggles.filter(t => t.name.toLowerCase().indexOf(filters.name.toLowerCase())>=0).map(t => 
              <FeatureTogglesListItem item={t} handleToggle={(i) => handleToggle(i)}></FeatureTogglesListItem>
            ) 
          : ""}
      </List>
    </div>
  );
}

export default FeatureTooglesList;
