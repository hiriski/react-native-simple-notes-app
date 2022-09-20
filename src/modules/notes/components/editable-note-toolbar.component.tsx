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
} from 'react-native';
import { Typography } from '@/components/core';

// Theme config
import * as themeConfig from '@/modules/theme/config';
import { createSpacing, isDarkMode } from '@/modules/theme/utils';
import { useTheme } from '@/modules/theme/hooks';
import DropShadow from 'react-native-drop-shadow';
import { useState } from 'react';
import { grey } from '@/modules/theme/libs';

const TOOLBAR_HEIGHT = 52;

interface Props {}

export const EditableNoteToolbar: FC<Props> = (props) => {
  const theme = useTheme();
  const [inputTitleHeight, setInputTitleHeight] = useState<number>(32);

  const renderAddNoteMarker = () => {
    <TouchableOpacity style={{ flex: 1, backgroundColor: 'red', width: 100, height: 100 }}>
      <View style={{ borderWidth: 1, height: 100, width: 100 }}>
        <Typography>OK</Typography>
      </View>
    </TouchableOpacity>;
  };

  const handleContentSizeChange = (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>): void => {
    const { height } = event.nativeEvent.contentSize;
    if (height < 240) {
      setInputTitleHeight(height);
    }
  };

  return (
    <View style={StyleSheet.flatten([styles.root])}>
      <Typography style={{ textAlign: 'center', fontWeight: '600', color: '#fbfbfb' }}>Toolbar here</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: createSpacing(5),
    backgroundColor: themeConfig.paletteBase.primary.main,
    height: TOOLBAR_HEIGHT,
  },
});
