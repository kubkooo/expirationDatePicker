import { ColorSet } from '../assets/colorSet';
import { View, FlatList, Text, StyleSheet } from 'react-native';

export default function ExpirationDatePircker({
  dates,
  numColumns,
  callbackFunction,
}) {
  return (
    <FlatList
      data={dates}
      renderItem={({ item }) => {
        return (
          <View
            style={[
              styles.GridViewBlockStyle,
              { backgroundColor: item.style.backgroundColor },
            ]}>
            <Text
              style={styles.GridViewInsideTextItemStyle}
              onPress={() => callbackFunction(item)}>
              {item.label}
            </Text>
          </View>
        );
      }}
      numColumns={numColumns}
    />
  );
}

const styles = StyleSheet.create({
  GridViewBlockStyle: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    height: 50,
    margin: 3,
    borderRadius: 10,
  },
  GridViewInsideTextItemStyle: {
    color: ColorSet.gridTextColor,
    padding: 5,
    fontSize: 14,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
});
