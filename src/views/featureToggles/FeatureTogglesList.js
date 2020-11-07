import { Button, List, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { urls } from '../../components/Router';
import OperationStatusEntity from '../../entities/OperationStatusEntity';
import FeatureToggleService from '../../services/feature-toggle-service/FeatureToggleService';
import SessionStorageService from '../../services/session-storage-service/SessionStorageService';
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
    updateTogglesList();
    checkToast();
  }, [])

  function checkToast() {
    const toastInfo = OperationStatusEntity.Of(SessionStorageService.pop());
    if (toastInfo!==undefined) {
      let message = `${toastInfo.isSuccessful()
        ? toastInfo.featureName + (toastInfo.operationType === 'edit'
          ? " saved correctly"
          : toastInfo.operationType === 'create'
            ? " created successfully"
            : " has been deleted")
        : toastInfo.operationType === 'edit'
          ? "An error occured when saving " + toastInfo.featureName
          : toastInfo.operationType === 'create'
            ? "An error occured when creating " + toastInfo.featureName
            : "An error occured when deleting " + toastInfo.featureName
        }`
      toastInfo.isSuccessful()
        ? toast.success(`${message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        : toast.error(`${message}`, {
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
        </div>
      </form>

      <List className="featuresList">
        {toggles.length 
          ? toggles.filter(t => t.name.toLowerCase().indexOf(filters.name.toLowerCase())>=0).map(t => 
              <FeatureTogglesListItem key={t.id} item={t} handleToggle={(i) => handleToggle(i)}></FeatureTogglesListItem>
            ) 
          : ""}
      </List>
    </div>
  );
}

export default FeatureTooglesList;
