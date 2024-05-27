import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import GlobalStyles from '../styles/global.styles';
//@ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//@ts-ignore
import Feather from 'react-native-vector-icons/Feather';
import CollapsibleView from '@eliav2/react-native-collapsible-view';
import {useMarkets} from '../hooks/market.hooks';
import 'moment/locale/ar-tn';
import moment from 'moment';

const HomeScreen = ({navigation}: {navigation: any}) => {
  moment.locale('ar-tn');
  const {isMarketFetchingLoading, marketsData} = useMarkets();
  useEffect(() => {
    console.log('Market Data', marketsData);
  }, [isMarketFetchingLoading]);
  return (
    <View style={[GlobalStyles.mainContainer, styles.mainContainer]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.replace('Main');
          }}>
          <MaterialCommunityIcons
            name="location-exit"
            size={34}
            color={'#FFFF'}
          />
        </TouchableOpacity>
        <Text style={styles.textTitle}>مرحبا بكم في البورص</Text>
        <TouchableOpacity>
          <Feather name="globe" size={34} color={'#FFFF'} />
        </TouchableOpacity>
      </View>
      {marketsData && marketsData.marketList && (
        <FlatList
          data={marketsData.marketList}
          renderItem={({item}) => (
            <CollapsibleView
              touchableWrapperStyle={{elevation: 10}}
              noArrow
              title={
                <View style={styles.cardHeader}>
                  <Text style={{color: '#FFFF'}}>
                    {item.products.length != 0
                      ? moment(item.products[0].createdAt).fromNow()
                      : ''}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 5,
                      marginRight: 10,
                    }}>
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.marketTitle}>{item.marketName}</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={styles.marketSubTitle}>
                          {item.products.length != 0 &&
                            item.products[0].description}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: '#FF7901',
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{fontWeight: '600', color: '#FFFF'}}>
                        {item.products.length}
                      </Text>
                    </View>
                    <Image
                      source={require('../assets/images/marcher.jpg')}
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: 'cover',
                        borderRadius: 5,
                      }}
                    />
                  </View>
                </View>
              }
              style={{
                backgroundColor: '#0D1A27',
                width: '100%',

                borderWidth: 0,
              }}>
              <View style={styles.containerStyle}>
                {item.products.map((elm: any) => (
                  <View
                    key={elm._id}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 30,
                      paddingVertical: 20,
                    }}>
                    <Text style={{color: '#FFF'}}>
                      {moment(elm.createdAt).fromNow()}
                    </Text>
                    <Text style={{color: '#FFF'}}>{elm.description}</Text>
                  </View>
                ))}
              </View>
            </CollapsibleView>
          )}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#18181F',
    padding: 0,
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: '#FF7901',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 20,
    flexDirection: 'row',
  },
  textTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFF',
  },
  cardHeader: {
    width: '100%',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 10,
  },
  marketTitle: {
    fontWeight: '600',
    fontSize: 17,
    color: '#FFFF',
  },
  marketSubTitle: {
    fontWeight: '600',
    fontSize: 15,
    color: '#FFFF',
  },
  containerStyle: {
    width: '100%',
    justifyContent: 'flex-end',
  },
});
