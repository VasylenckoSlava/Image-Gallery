// @flow

import { getPictureDetails } from '../../services/API'
import { FETCH_FAILED } from '../HomeContainer/actions'
import type { ActionWithPayload, ActionWithoutPayload } from '../../types/actions'

export const PICTURE_DETAILS_FETCH_REQUESTED = 'PICTURE_DETAILS_FETCH_REQUESTED'
export const PICTURE_DETAILS_FETCH_SUCCESS = 'PICTURE_DETAILS_FETCH_SUCCESS'

export function pictureIsLoading (): ActionWithoutPayload {
  return {
    type: PICTURE_DETAILS_FETCH_REQUESTED,
  }
}

export function fetchPictureSuccess (imageId: number, hiResImage: string): ActionWithPayload {
  return {
    type: PICTURE_DETAILS_FETCH_SUCCESS,
    payload: { imageId, hiResImage}
  };
}

export function fetchPictureFailed (errorMessage: string): ActionWithPayload {
  return {
    type: FETCH_FAILED,
    payload: { errorMessage }
  };
}

export function fetchPictureDetails (imageId: number) {
  return async dispatch => {
    dispatch(pictureIsLoading());
    getPictureDetails(imageId)
        .then(({ data }) => {
          dispatch(fetchPictureSuccess(data));
        })
        .catch(err => {
          dispatch(fetchPictureFailed("Oops, something went wrong"));
        });
  };
}
