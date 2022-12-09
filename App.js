import { StatusBar } from 'expo-status-bar';
import {Button, Dimensions, FlatList, Image, StyleSheet, Switch, Text, View} from 'react-native';
import {useState} from "react";



const data = [
  {id: 0, name: 'cafe one', image: "https://www.cenuta.com/blog/wp-content/uploads/2022/08/cafe-isimleri.jpg", isFavorite: true},
  {id: 1, name: 'cafe two', image: 'https://www.cenuta.com/blog/wp-content/uploads/2022/08/cafe-isimleri.jpg' , isFavorite: true},
  {id: 2, name: 'cafe three', image: 'https://serbethane.com.tr/resimler/slide/slide-803.jpg' , isFavorite: false},
  {id: 3, name: 'cafe four', image: 'https://serbethane.com.tr/resimler/slide/slide-495.jpg' , isFavorite: false},
  {id: 4, name: 'cafe five', image: 'https://media-cdn.tripadvisor.com/media/photo-s/18/34/66/86/bahcesi-de-var.jpg' , isFavorite: true},
];

export default function App() {
  const [cafeList, setCafeList] = useState(data);
  const [favoriteCafeStatus, setFavoriteCafeStatus] = useState(false);

  function changeFavoriteCafeStatus(isFavorite){
    setFavoriteCafeStatus(isFavorite);

    if(isFavorite){
      setCafeList(cafeList.filter((cafe) => cafe.isFavorite));
    }else {
       setCafeList(cafeList)
    }
  }


  function favoriteStatusUpdate(favoriteStatus ,ids){
    if(favoriteStatus === false) {
      favoriteStatus = true;
    }
    else{
      favoriteStatus = false;
    }
    setCafeList(cafeList.map(el => el.id === ids ? {
      ...el,
      isFavorite: favoriteStatus }:
      el));

  }

  function getCafeList(item){
    if (item.isFavorite == false){
      return(
          <View style={styles.cafe_container}>
            <View style={styles.cafe_image_container}>
              <Image style={styles.cafe_image} source={{uri: item.image}}/>
            </View>
            <View style={styles.cafe_name_text_container}>
              <Text style={styles.cafe_name_text}>
                {item.name}
              </Text>
            </View>
            <View style={styles.add_favorite_button}>
              <Button title="Add Favorite" color="#a3b989" onPress={() => favoriteStatusUpdate(item.isFavorite,
                  item.id)}/>
            </View>
          </View>
      );
    }else {
      return(
          <View style={styles.cafe_container}>
            <View style={styles.cafe_image_container}>
              <Image style={styles.cafe_image} source={{uri: item.image}}/>
            </View>
            <View style={styles.cafe_name_text_container}>
              <Text style={styles.cafe_name_text}>
                {item.name}
              </Text>
            </View>
          </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.app_title_container}>
        <Text style={styles.app_title}>
          My favorite Cafe's
        </Text>
      </View>
      <View style={styles.switch_container}>
        <Text style={styles.switch_text}>
          Get Favorite Cafe's
        </Text>
        <Switch value={favoriteCafeStatus} onValueChange={changeFavoriteCafeStatus}/>
      </View>
      <FlatList horizontal={false} showsVerticalScrollIndicator={false} data={cafeList} renderItem={({item}) => getCafeList(item)} keyExtractor={(item, index) => index.toString()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  app_title_container:{
    borderRadius: 12,
    padding: 12,
    alignSelf: 'center',
    margin: 20
  },
  app_title:{
    fontSize: 22,

  },
  switch_container:{
    alignSelf: 'flex-end',
    marginRight: 10
  },
  switch_text:{
    fontSize:17
  },
  cafe_container:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#DEE9D7',
    padding: 12,
    borderRadius: 12
  },
  cafe_name_text_container:{
     flexBasis: '40%'
  },
  cafe_name_text:{
    marginLeft: 18,
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  cafe_image_container:{

  },
  cafe_image:{
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 5,
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42
  },
  add_favorite_button:{
    marginTop: 8,
  }
});
