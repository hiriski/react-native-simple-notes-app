import { NotesState } from '@/modules/notes/redux';
import { useAppSelector } from '@/store';

interface IUseNotes extends NotesState {}

export const useNotes = (): IUseNotes => {
  const state = useAppSelector((s) => s.notes);

  return state;
};
