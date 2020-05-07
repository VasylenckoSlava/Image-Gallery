// @flow
const initialState = {
  pictures: [],
  isLoading: true,
  page: 1,
  errorMessage: '',
}

export default function (state: any = initialState, action: Object) {
  const { payload, type } = action;
  console.log('payload',payload)
  switch (type) {
    case "PICTURES_FETCH_SUCCESS":
      if (payload.data.pictures === 1) {
        return {
          ...state,
          isLoading: false,
          page: payload.data.page,
          pictures: payload.data.pictures,
        };
      }
      let pictures = state.pictures.concat(payload.data.pictures);
      return {
        ...state,
        isLoading: false,
        page: payload.data.page,
        pictures,
      };
      break;
    case "FETCH_FAILED":
      return {
        ...state,
        isLoading: false,
        errorMessage: payload.data.errorMessage
      };
      break;
    case "PICTURES_FETCH_REQUESTED":
      return {
        ...state,
        isLoading: true,
      };
      break;
    default:
      return {
        ...state
      };
  }
}
