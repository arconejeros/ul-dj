import React, {useState, useContext} from 'react';

import createContainer from 'constate';

const nameHOC=(Component, suffix='') =>
  `${
    Component.originalName ||
    Component.displayName ||
    Component.name ||
    'Component'
  }${suffix}`;

function useCampaignContext() {
  const [loading, setLoading]=useState({});
  const [campaigns, setCampaigns]=useState([]);
  const [error, setError]=useState(false);
  const [newCampaignModal, setNewCampaignModal]=useState(false);
  const [deleteCampaignModal, setDeleteCampaignModal]=useState({
    opened: false,
    data: null,
  });
  const [editCampaignModal, setEditCampaignModal]=useState({
    opened: false,
    data: null,
  });
  const getCampaigns=() => {
    fetch('/api/campaigns', {
      headers: {
        'auth-token': localStorage.getItem('loggedUser'),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setCampaigns(json.data.reverse());
        setLoading(false);
      })
      .catch((e) => {
        console.log(`API call failed: ${e}`);
        setLoading(false);
      });
  };
  const newCampaign=(credentials) =>
    fetch('/api/campaigns', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('loggedUser'),
      },
      body: JSON.stringify({
        ...credentials,
      }),
    })
      .then((result) => {
        getCampaigns();
        return result.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError(false);
          setNewCampaignModal(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });

  const deleteCampaign=(campaignId) => {
    fetch(`/api/campaigns/${campaignId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('loggedUser'),
      },
    })
      .then((result) => {
        getCampaigns();
        return result.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError(false);
          setDeleteCampaignModal(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const editCampaign=(campaign) =>
    fetch(`/api/campaigns/${campaign._id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('loggedUser'),
      },
      body: JSON.stringify({
        users: campaign.users,
        course: campaign.course,
      }),
    })
      .then((result) => {
        getCampaigns();
        return result.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError(false);
          setEditCampaignModal({opened: false, data: null});
        }
      })
      .catch((e) => {
        console.log(e);
      });

  return {
    campaigns,
    setCampaigns,
    loading,
    setLoading,
    error,
    setError,
    newCampaignModal,
    setNewCampaignModal,
    deleteCampaignModal,
    setDeleteCampaignModal,
    editCampaignModal,
    setEditCampaignModal,
    getCampaigns,
    newCampaign,
    deleteCampaign,
    editCampaign,
  };
}

const CampaignContext=createContainer(useCampaignContext);

const withCampaign=(WrappedComponent) => {
  const {getInitialProps}=WrappedComponent;
  const ComponentWithCampaignData=(props) => {
    const campaignDataWithState=useContext(CampaignContext.Context);
    return <WrappedComponent {...props} campaign={campaignDataWithState}/>;
  };
  if (typeof getInitialProps === 'function') {
    ComponentWithCampaignData.getInitialProps=getInitialProps;
  }
  ComponentWithCampaignData.originalName=nameHOC(WrappedComponent);
  ComponentWithCampaignData.displayName=nameHOC(WrappedComponent, 'WithCampaign');
  return ComponentWithCampaignData;
};

export default CampaignContext;
export {withCampaign};
