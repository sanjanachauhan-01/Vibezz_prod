import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import VibezzSignalsCard from '../../components/VibezzSignalsCard';
import ExplorePostsCard from '../../components/ExplorePostsCard';
import SearchUser from '../../components/SearchUser';
import { Text, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Adverts from '../../components/Ads/Adverts';

const GlobalSearch = () => {

  const data = [
    { key : 'Adverts' , component: <Adverts/>},
    { key: 'VibezzSignalsCard', component: <VibezzSignalsCard /> },
    { key: 'ExplorePostsCard', component: <ExplorePostsCard /> },
  ];

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 10 }}>
      {item.component}
    </View>
  );

  return (
    <View className="bg-primary h-full">
      <SearchUser/>
      {/* <ScrollView style={{ backgroundColor:'purple' , height: 90}}> 
      <VibezzSignalsCard/>
      <ExplorePostsCard/>
      </ScrollView> */}
      {/* <View style={{ marginBottom: 2}}>  */}
      {/* <Adverts/> */}
      {/* </View> */}
       <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        // style={{ backgroundColor: 'purple' }}
        contentContainerStyle={{ paddingVertical:5}}
      />
      </View>
 
  );
};

export default GlobalSearch;