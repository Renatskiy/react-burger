import { ActionModalTypes, ModalAction } from "../actions/modal/types";
const initialState = {
  modalMode: "",
  modalIsOpen: false,
};

export default function modalReducer(
  state = initialState,
  action: ModalAction
) {
  switch (action.type) {
    case ActionModalTypes.OPENMODAL:
      return {
        ...state,
        modalIsOpen: action.payload.modalIsOpen,
        modalMode: action.payload.mode,
      };
    case ActionModalTypes.CLOSEMODAL:
      return { ...state, modalIsOpen: false };
    default:
      return state;
  }
}
