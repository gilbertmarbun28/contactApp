import React, { Component } from 'react';
import {Text, FlatList, View, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ListItem, SearchBar} from 'react-native-elements';
import ActionButton from 'react-native-action-button';


class FlatListDemo extends Component{
    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          data: [],
          error: null,
        };
        this.arrayholder = [];
    }

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        const url = `https://reqres.in/api/users?page=2`;
        this.setState({
            loading:true
        });

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res.data,
                    error: res.error || null,
                    loading: false,
                });
                this.arrayholder = res.data;
            })
            .catch(error =>{
                this.setState({error, loading: false});
            });
    };

    renderSeparator = () => {
        return(
            <View style ={{
                height: 1,
                width: '80%',
                backgroundColor: '#DEDEDE',
                marginLeft: '10%',
            }}/>
        );
    };

    searchFilterFunction = text => {
        this.setState({
          value: text,
        });
    
        const newData = this.arrayholder.filter(item => {
          const itemData = `${item.first_name.toUpperCase()} ${item.last_name.toUpperCase()} `;
          const textData = text.toUpperCase();
    
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
          data: newData,
        });
      };

    renderHeader = () => {
        return(<SearchBar
            placeholder = "Cari kontak"
            lightTheme='75%'
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.value}
        />);
    };

    render(){
        if(this.state.loading){
            return(
                <View style = {{
                    flex:1,
                    alignItems: 'center',
                    justifyContent:'center'
                }}>
                    <ActivityIndicator/>
                </View>
            );
        }
        return(
            <View style = {{flex: 1}}>
                <FlatList
                    data = {this.state.data}
                    renderItem = {({item}) => (
                        <ListItem
                            leftAvatar = {{source: {uri: item.avatar}}}
                            title= {`${item.first_name} ${item.last_name}`}
                            subtitle={item.email}
                            />
                    )}
                    keyExtractor={(item) => item.email}
                    ItemSeparatorComponent = {this.renderSeparator}
                    ListHeaderComponent = {this.renderHeader}
                />
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item
                        buttonColor="#9b59b6"
                        title="New Contact"
                        onPress={() => console.log('notes tapped!')}>
                        <Icon
                        name="md-create"
                        style={{fontSize: 20, height: 22, color: 'white'}}
                        />
                    </ActionButton.Item>
                    <ActionButton.Item
                        buttonColor="#1abc9c"
                        title="All Contact"
                        onPress={() => {}}>
                        <Icon
                        name="md-done-all"
                        style={{fontSize: 20, height: 22, color: 'white'}}
                        />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        );
    }
}

export default FlatListDemo;