import React, { FC, useMemo } from 'react';
import { INote } from '@/modules/notes/interfaces';
import { TouchableNativeFeedback, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from '@/components/core';

// Theme config
import * as themeConfig from '@/modules/theme/config';
import { createSpacing } from '@/modules/theme/utils';
import { useTheme } from '@/modules/theme/hooks';
import DropShadow from 'react-native-drop-shadow';
import { useNavigation } from '@react-navigation/native';
import { RoutesConstant } from '@/constants';

interface Props {
  item: INote;
  isLastItem: boolean;
}
export const NotesCardItem: FC<Props> = (props) => {
  const { item: note, isLastItem } = props;

  const navigation = useNavigation();

  const theme = useTheme();

  console.log('isLastItem', isLastItem);

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
    if (!note.color) {
      return theme.palette.common.white;
    }
    return note.color;
  }, [note]);

  /**
   * Get notes border color
   */
  const getBorderColor = useMemo<string>(() => {
    if (!note.color) {
      return theme.palette.divider;
    }
    return note.color;
  }, [note]);

  /**
   * Get notes text color
   */
  const getTextColor = useMemo<string>(() => {
    if (note.colorMode === 'dark') {
      return theme.palette.common.white;
    } else if (note.colorMode === 'light' && note.color) {
      return theme.palette.text.primary;
    } else {
      return theme.palette.text.primary;
    }
  }, [note]);

  /**
   * Handle press
   */
  const handlePress = (): void => {
    navigation.navigate(RoutesConstant.EditableNoteScreen as never, { note } as never);
  };

  return (
    <>
      <DropShadow
        style={StyleSheet.flatten([
          {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.03,
            shadowRadius: 5,
            flex: 1 / 2,
          },
        ])}>
        <TouchableNativeFeedback onPress={handlePress}>
          <View
            style={StyleSheet.flatten([
              styles.noteCard,
              {
                backgroundColor: getBackgroundColor,
                borderColor: getBorderColor,
              },
            ])}>
            <Typography style={StyleSheet.flatten([styles.textTitle, { color: getTextColor }])} numberOfLines={3}>
              {note.title}
            </Typography>
            <Typography style={StyleSheet.flatten([styles.textSummary, { color: getTextColor }])} numberOfLines={3}>
              {note.body}
            </Typography>
          </View>
        </TouchableNativeFeedback>
      </DropShadow>
      {isLastItem && renderAddNoteMarker()}
    </>
  );
};

const styles = StyleSheet.create({
  noteCard: {
    borderWidth: 1,
    borderRadius: themeConfig.shape.borderRadius,
    margin: createSpacing(2),
    height: 200,
    paddingVertical: createSpacing(2.8),
    paddingHorizontal: createSpacing(4),
  },
  textTitle: {
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: createSpacing(2.4),
  },
  textSummary: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
    opacity: 0.75,
  },
  noteDarkMode: {},
});
