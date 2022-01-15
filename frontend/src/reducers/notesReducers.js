import {
  NOTES_CREATE_FAIL,
  NOTES_CREATE_REQUEST,
  NOTES_CREATE_SUCCESS,
  NOTES_DELETE_FAIL,
  NOTES_DELETE_REQUEST,
  NOTES_DELETE_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
  NOTES_UPDATE_FAIL,
  NOTES_UPDATE_REQUEST,
  NOTES_UPDATE_SUCCESS,
} from "../constants/notesConstants";

export const noteListReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case NOTES_LIST_REQUEST:
      return { isPending: true };
    case NOTES_LIST_SUCCESS:
      return { isPending: false, notes: action.payload };
    case NOTES_LIST_FAIL:
      return { isPending: false, error: action.payload };

    default:
      return state;
  }
};

export const noteCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_CREATE_REQUEST:
      return { isPending: true };
    case NOTES_CREATE_SUCCESS:
      return { isPending: false, success: true };
    case NOTES_CREATE_FAIL:
      return { isPending: false, error: action.payload };

    default:
      return state;
  }
};

export const noteDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_DELETE_REQUEST:
      return { isPending: true };
    case NOTES_DELETE_SUCCESS:
      return { isPending: false, success: true };
    case NOTES_DELETE_FAIL:
      return { isPending: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const noteUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_UPDATE_REQUEST:
      return { isPending: true };
    case NOTES_UPDATE_SUCCESS:
      return { isPending: false, success: true };
    case NOTES_UPDATE_FAIL:
      return { isPending: false, error: action.payload, success: false };

    default:
      return state;
  }
};
