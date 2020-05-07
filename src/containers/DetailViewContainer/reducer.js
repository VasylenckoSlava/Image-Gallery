const initialState = {
  hiResPictures: [],
  isLoading: false,
}

export default function(state: any = initialState, action: Object) {
  const { payload, type } = action;
  switch (type) {
    case "PICTURE_DETAILS_FETCH_SUCCESS":
      return {
        ...state,
        ...payload,
        isLoading: false
      };
      break;
    case "FETCH_FAILED":
      return {
        ...state,
        isLoading: false,
        errorMessage: "Error message"
      };
      break;
    case "PICTURE_DETAILS_FETCH_REQUESTED":
      return {
        ...state,
        isLoading: true
      };
      break;
    default:
      return {
        ...state
      };
  }
}
