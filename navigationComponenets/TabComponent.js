import * as React from 'react';
import {Animated, StatusBar ,View,FlatList,StyleSheet,TouchableOpacity,TouchableHighlight,Text,Dimensions,Image,AppState,BackHandler,AsyncStorage , TextInput, ScrollView ,TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Button, Alert,ActivityIndicator, ToastAndroid , WebView,Easing} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { StackActions, NavigationActions } from 'react-navigation';


const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor='#ba60da'

export default class TabComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollX : new Animated.Value(0),
      scrollY: new Animated.Value(0),
      selectedTab:0,
      activeColor:themeColor,
      inactiveColor:themeColor,
      scale: new Animated.Value(0),
      color:'#000',
      size:20,
    };

  }

  componentDidMount(){

  }

  navigate=async(nav)=>{
    this.props.navigation.navigate(nav, {}, NavigationActions.navigate({ routeName: 'HomeScreen' }))
  }


  render(){
    var home = ['HomeScreen']



    let left = this.state.scrollX.interpolate({
                 inputRange: [0,1*width, ],
                 outputRange: [0, width*0.5,],
                 extrapolate: 'clamp'
               });

    return (
    <View style={{position: 'absolute',bottom:0,height:55,left:0,width:'100%',borderTopWidth:0,borderColor:'#f2f2f2',backgroundColor:'#fff'}}>
    <View style={{flex:1,flexDirection:'row',backgroundColor:'rgba(255, 255, 255, 0.95)',alignItems: 'center',justifyContent:'space-between',borderTopWidth:1,borderColor:'#f2f2f2',shadowOpacity: 1,elevation:4,shadowColor:'#aaaaaa',
    shadowOffset: {height: 1,width:1,borderRadius:30}}}>



      <View style={{flex:1}} >

       <Animated.View style={[{borderRadius:30,height:'100%',}]} >
       <Animated.View
       style={{ height: 0, width: '100%', backgroundColor:'#000',position: 'absolute',top: 0,left:0,transform: [{translateX:left}]}}/>
        <TouchableOpacity  style={{borderRadius:20,justifyContent: 'center',alignItems: 'center',height:'100%'}}>
           <Icon name="md-person" size={30} color={themeColor}/>
        </TouchableOpacity>
       </Animated.View>
      </View>

      <View style={{flex:1}} >
       <Animated.View style={[{borderRadius:30,height:'100%',}]} >
       <Animated.View
       style={{ height: 0, width: '100%', backgroundColor:'#000',position: 'absolute',top: 0,left:0,transform: [{translateX:left}]}}/>
        <TouchableOpacity  style={{borderRadius:20,justifyContent: 'center',alignItems: 'center',height:'100%'}}>
           <Icon name="log-out-outline" size={30} color={themeColor}/>

        </TouchableOpacity>
       </Animated.View>
      </View>
      <View style={{flex:1}} >
       <Animated.View style={[{borderRadius:30,height:'100%',}]} >
       <Animated.View
       style={{ height: 0, width: '100%', backgroundColor:'#000',position: 'absolute',top: 0,left:0,transform: [{translateX:left}]}}/>
        <TouchableOpacity  style={{borderRadius:20,justifyContent: 'center',alignItems: 'center',height:'100%'}}>
           <Icon name="log-out-outline" size={30} color={themeColor}/>

        </TouchableOpacity>
       </Animated.View>
      </View>



    </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  text:{
    fontStyle:'normal',

    lineHeight:22
  }
});
