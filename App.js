import React, { Component } from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator, DrawerActions} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {View, Image, TouchableOpacity} from 'react-native';

import homeContact from './screens/homeContact';
import contactList from './screens/contactList';


class NavigationDrawerStructure extends Component {

  render(){
    const { navigationProps } = this.props
    return(
      <View style={{flexDirextion: 'row'}}>
        <TouchableOpacity onPress= {() => navigationProps.dispatch(DrawerActions.toggleDrawer())}>
          <Image
            source = {require('./assets/images/appBar.png')}
            style = {{
              width: 20,
              height: 20,
              marginLeft: 5
            }}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const HomeActivity_StackNavigator = createStackNavigator({
  Second: {
    screen: homeContact,
    navigationOptions: ({navigation}) => ({
      title: 'Home',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation}/>
      ),
      headerStyle: {
        backgroundColor: '#000000',
      },
      headerTintColor: '#ffffff',
    }),
  },
});

const ContactList_StackNavigator = createStackNavigator({
  First: {
    screen: contactList,
    navigationOptions: ({navigation}) => ({
      title: 'Contacts',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation}/>
      ),
      headerStyle: {
        backgroundColor: '#00000',
      },
      headerTintColor: '#fffff',
    }),
  },
});

const DrawerNavigatorExample = createDrawerNavigator({
  homeContact: {
    screen: HomeActivity_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Home',
    },
  },

  contactList: {
    screen: ContactList_StackNavigator,
    navigationOptions: {
      drawerLabel: 'List Contact',
    },
  },
});

export default createAppContainer(DrawerNavigatorExample);