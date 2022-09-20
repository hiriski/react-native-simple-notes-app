import React, { Dispatch, FC, SetStateAction, useMemo } from 'react';
import { INote } from '@/modules/notes/interfaces';
import {
  TouchableNativeFeedback,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
  ScrollView,
} from 'react-native';
import { Typography } from '@/components/core';

// Theme config
import * as themeConfig from '@/modules/theme/config';
import { createSpacing, isDarkMode } from '@/modules/theme/utils';
import { useTheme } from '@/modules/theme/hooks';
import DropShadow from 'react-native-drop-shadow';
import { useState } from 'react';
import { grey } from '@/modules/theme/libs';
import { useDimensions } from '@react-native-community/hooks';

interface Props {
  note: INote;
  setNote: Dispatch<SetStateAction<INote>>;
}
export const NoteForm: FC<Props> = (props) => {
  const { note, setNote } = props;
  const { screen } = useDimensions();

  const theme = useTheme();
  const [inputTitleHeight, setInputTitleHeight] = useState<number>(32);
  const [inputBodyHeight, setInputBodyHeight] = useState<number>(100);

  const renderAddNoteMarker = () => {
    <TouchableOpacity style={{ flex: 1, backgroundColor: 'red', width: 100, height: 100 }}>
      <View style={{ borderWidth: 1, height: 100, width: 100 }}>
        <Typography>OK</Typography>
      </View>
    </TouchableOpacity>;
  };

  /**
   * Get notes background color
   */
  const getBackgroundColor = useMemo<string>(() => {
    if (note.colorMode === 'dark') {
      return theme.palette.background.paper;
    } else {
      return note.color;
    }
  }, [note]);

  /**
   * Get getSelectionColor
   */
  const getSelectionColor = useMemo<string>(() => {
    if (!note.color) {
      return theme.palette.primary.main;
    }
    return note.color;
  }, [note]);

  /**
   * Get notes text color
   */
  const getTextColor = useMemo<string>(() => {
    if (note.colorMode === 'dark' && note.color) {
      return note.color;
    } else if (note.colorMode === 'light' && note.color) {
      return theme.palette.text.primary;
    } else {
      return theme.palette.text.primary;
    }
  }, [note]);

  const handleContentSizeChange = (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>): void => {
    const { height } = event.nativeEvent.contentSize;
    if (height < 240) {
      setInputTitleHeight(height);
    }
  };

  const handleBodyContentSizeChange = (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>): void => {
    const { height } = event.nativeEvent.contentSize;
    setInputBodyHeight(height);
  };

  /**
   * Handle input change
   *
   * @param {string} name
   * @param {string} value
   */
  const handleInputChange = (name: string, value: string): void => {
    console.log('name', name, value);
  };

  console.log('inputBodyHeight', inputBodyHeight);

  return (
    <ScrollView
      style={StyleSheet.flatten([
        styles.root,
        {
          backgroundColor: getBackgroundColor,
        },
      ])}>
      <TextInput
        multiline
        numberOfLines={4}
        defaultValue={note.title}
        style={StyleSheet.flatten([
          styles.textInput,
          styles.inputTitle,
          { maxHeight: Math.max(32, inputTitleHeight), color: getTextColor },
        ])}
        placeholderTextColor={isDarkMode(theme) ? grey[600] : grey[400]}
        placeholder="Note title.."
        onContentSizeChange={handleContentSizeChange}
        onChangeText={(value) => handleInputChange('title', value)}
      />
      <TextInput
        multiline
        defaultValue={note.body}
        style={StyleSheet.flatten([styles.textInput, styles.textBody, { minHeight: inputBodyHeight }])}
        placeholderTextColor={isDarkMode(theme) ? grey[600] : grey[400]}
        placeholder="Note body.."
        textAlignVertical="top"
        onChangeText={(value) => handleInputChange('body', value)}
        selectionColor={getSelectionColor}
        onContentSizeChange={handleBodyContentSizeChange}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: createSpacing(6),
    flex: 1,
  },
  textInput: {
    fontFamily: 'Plus Jakarta Sans',
    maxHeight: 240,
    paddingHorizontal: 0,
  },
  inputTitle: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 27,
    paddingVertical: createSpacing(3),
  },
  textBody: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 24,
    flex: 1,
    paddingBottom: createSpacing(5),
  },
});
