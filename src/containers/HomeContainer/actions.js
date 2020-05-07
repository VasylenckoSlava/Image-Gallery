import { getPictures } from '../../services/API'
import type { ActionWithPayload, ActionWithoutPayload } from '../../types/actions'

export const PICTURES_FETCH_REQUESTED = 'PICTURES_FETCH_REQUESTED'
export const PICTURES_FETCH_SUCCESS = 'PICTURES_FETCH_SUCCESS'
export const FETCH_FAILED = 'FETCH_FAILED'

export function listIsLoading (): ActionWithoutPayload {
  return {
    type: PICTURES_FETCH_REQUESTED,
  }
}

export function fetchListSuccess (data: Array<Object>): ActionWithPayload {
  return {
    type: PICTURES_FETCH_SUCCESS,
    payload: { data}
  }
}

export function fetchListFailed (errorMessage: string): ActionWithPayload {
  return {
    type: FETCH_FAILED,
    payload: { errorMessage }
  }
}

export function fetchPictures (page: number = 1) {
  return dispatch => {
    dispatch(listIsLoading());
    getPictures(page)
        .then(({ data }) => {
          dispatch(fetchListSuccess(data));
        })
        .catch(err => {
          dispatch(fetchListFailed("Oops, something went wrong, try again"));
        });
  };
}
