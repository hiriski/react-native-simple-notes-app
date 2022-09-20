import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, Image, FlatList, ListRenderItem } from 'react-native';

import { RoutesConstant } from '@/constants';
import { IRootStackParamList } from '@/navigators';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { useTheme } from '@/modules/theme/hooks';
import { SafeAreaView, ScreenTitle } from '@/components/shared';
import { NotesSmIcon } from '@/assets';
import { useNotes } from '@/modules/notes/hooks/use-notes';
import { INote } from '@/modules/notes/interfaces';
import { NotesCardItem } from '@/modules/notes/components';
import { createSpacing } from '@/modules/theme/utils';

type Props = NativeStackScreenProps<IRootStackParamList, typeof RoutesConstant.BottomTab.HomeScreen>;

export const HomeScreen: FC<Props> = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { notes } = useNotes();

  const renderItem: ListRenderItem<INote> = ({ item, index }) => (
    <NotesCardItem item={item} isLastItem={index === notes?.length - 1} />
  );
  return (
    <SafeAreaView backgroundColor="paper">
      <ScreenTitle
        title="My Notes"
        renderLeftContent={
          <TouchableOpacity activeOpacity={0.7}>
            <Image source={NotesSmIcon} style={{ height: 26, width: 26 }} />
          </TouchableOpacity>
        }
      />
      <FlatList
        data={notes}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContentContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: createSpacing(4),
    paddingBottom: createSpacing(3),
  },
});
