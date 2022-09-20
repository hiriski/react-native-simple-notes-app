import React, { FC, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import { RoutesConstant } from '@/constants';
import { IRootStackParamList } from '@/navigators';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { useTheme } from '@/modules/theme/hooks';
import { SafeAreaView, ScreenTitle, StatusBar } from '@/components/shared';
import { NotesSmIcon } from '@/assets';
import { useNotes } from '@/modules/notes/hooks/use-notes';
import { INote } from '@/modules/notes/interfaces';
import { NotesCardItem } from '@/modules/notes/components/notes-card-item.component';
import { createSpacing } from '@/modules/theme/utils';
import { v4 as uuidv4 } from 'uuid';
import { EditableNoteToolbar, NoteForm } from '../components';
import { useIsFocused } from '@react-navigation/native';

type Props = NativeStackScreenProps<IRootStackParamList, 'EditableNoteScreen'>;

const initialNote: INote = {
  id: uuidv4(),
  color: undefined,
  colorMode: 'light',
  title: '',
  body: '',
};

export const EditableNoteScreen: FC<Props> = (props) => {
  const isNavigationFocused = useIsFocused();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [note, setNote] = useState<INote>(props.route.params?.note ? props.route.params?.note : initialNote);

  /**
   * Get notes background color
   */
  const getBackgroundColor = useMemo<string>(() => {
    if (!note.color) {
      return theme.palette.common.white;
    }
    return note.color;
  }, [note]);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={getBackgroundColor}
        barStyle={note.colorMode === 'dark' ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView style={{ backgroundColor: getBackgroundColor }}>
        <ScreenTitle title="" enableBackButton style={{ backgroundColor: getBackgroundColor }} />
        <NoteForm note={note} setNote={setNote} />
        {isNavigationFocused && <EditableNoteToolbar />}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: createSpacing(4),
    paddingBottom: createSpacing(3),
  },
});
