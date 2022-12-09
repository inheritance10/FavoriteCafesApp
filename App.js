import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';
import React, {useState} from "react";
import FavoriteSuccessModal from "./src/compnents/modals/favoriteModal/FavoriteSuccessModal";

const data = [
  {id: 0, name: 'cafe one', image: "https://www.cenuta.com/blog/wp-content/uploads/2022/08/cafe-isimleri.jpg", isFavorite: true},
  {id: 1, name: 'cafe two', image: 'https://www.cenuta.com/blog/wp-content/uploads/2022/08/cafe-isimleri.jpg' , isFavorite: true},
  {id: 2, name: 'cafe three', image: 'https://serbethane.com.tr/resimler/slide/slide-803.jpg' , isFavorite: true},
  {id: 3, name: 'cafe four', image: 'https://serbethane.com.tr/resimler/slide/slide-495.jpg' , isFavorite: true},
  {id: 4, name: 'cafe five', image: 'https://media-cdn.tripadvisor.com/media/photo-s/18/34/66/86/bahcesi-de-var.jpg' , isFavorite: true},
];

export default function App() {
  let datas = [];
  const [cafeList, setCafeList] = useState(data);
  const [allData, setAllData] = useState(data);

  const [favoriteCafeStatus, setFavoriteCafeStatus] = useState(false);

  if(!favoriteCafeStatus){
    datas = allData;
  }else{
    datas = cafeList;
  }

  function changeFavoriteCafeStatus(isFavorite){
    setFavoriteCafeStatus(isFavorite);

    if(isFavorite){
      setCafeList(datas.filter((cafe) => cafe.isFavorite));
    }else {
      setCafeList(allData);
    }
  }



  function favoriteStatusUpdate(favoriteStatus ,ids){
    if(favoriteStatus === false) {
      favoriteStatus = true;
    }
    else{
      favoriteStatus = false;
    }
    setAllData(allData.map(el => el.id === ids ? {
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
                  item.id) }/>
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
            <View style={styles.add_favorite_button}>
              <Button title="Remove Favorite" color="#991119" onPress={() => favoriteStatusUpdate(item.isFavorite,
                  item.id)}/>
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
      <FlatList horizontal={false} showsVerticalScrollIndicator={false} data={datas} renderItem={({item}) => getCafeList(item)} keyExtractor={(item, index) => index.toString()} />
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
