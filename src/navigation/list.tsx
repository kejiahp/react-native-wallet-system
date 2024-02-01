/**
 * React native has:
 * FlatLists: displaying a simple list to the user.
 * SectionLists: Section List is a regular list but partitioned.
 * VirtualizedLists:
 */
function UpcomingWeather() {
  const renderItem = ({ item }) => {
    return (
      <UpcomingFlatList
        condition={item.weather[0].main}
        dt_txt={item.dt_txt}
        min={item.main.temp_min}
        max={item.main.temp_max}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/cool-volcano.jpg")}
        style={styles.image}
      >
        <Text>Upcoming Weather</Text>

        <FlatList
          renderItem={renderItem}
          data={data}
          keyExtractor={(item) => item.dt_txt}
          ItemSeparatorComponent={<View style={styles.separator}></View>}
          ListEmptyComponent={
            <View>
              <Text>Nothing Here</Text>
            </View>
          }
          ListFooterComponent={
            <View>
              <Text>This is a list</Text>
            </View>
          }
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
