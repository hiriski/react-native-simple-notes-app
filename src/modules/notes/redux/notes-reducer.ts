// Action types.
import { NotesActionTypes } from './notes-actions-types.enum';

// Union action types.
import { NotesActions } from './notes-actions';

// Interfaces.
import { INote } from '@/modules/notes/interfaces';
import { dummyNotes } from '../data/dummy-notes';

export interface NotesState {
  notes: INote[];
}

const initialState: NotesState = {
  notes: dummyNotes,
};

export const notesReducer = (state: NotesState = initialState, action: NotesActions): NotesState => {
  switch (action.type) {
    default:
      return state;
  }
};
