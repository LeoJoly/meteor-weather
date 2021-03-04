// == Package imports
import axios from 'axios';

// == Local imports
// actions
import { AUTOCOMPLETE, HANDLE_GEOLOC } from '../store/actions';
import { autocompleteSuccess } from '../store/actions';
// keys
import { hereKey } from './apiKeys';

const searchMw = store => next => action => {
  switch (action.type) {

    case AUTOCOMPLETE: {
      const { search: { searchInput }} = store.getState();

      const config = {
        method: 'get',
        url: `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searchInput.replace(/ /g, '+')}&apiKey=${hereKey}`,
      };

      axios(config)
        .then(response => {
          store.dispatch(autocompleteSuccess(response.data.items));
        }).catch(error => {
          console.error(error);
        });

      break;
    };

    case HANDLE_GEOLOC: {
      const { search: { searchInput }} = store.getState();

      const config = {
        method: 'get',
        url: `https://geocode.search.hereapi.com/v1/geocode?q=${searchInput.replace(/ /g, '+')}&apiKey=${hereKey}`,
      };

      axios(config)
        .then(response => {
          console.log(response.data.items[0].position);
        }).catch(error => {
          console.error(error);
        });

      break;
    };

    default: next(action);
  };
};

export default searchMw;