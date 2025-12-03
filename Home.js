import React, {useState} from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets  } from 'react-native-safe-area-context';
import {datasource} from './Data';

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
    },
    opacityStyle: {
        borderWidth: 1,
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight:'bold',
    },
});

const Home = ({navigation}) => {

    const insets = useSafeAreaInsets();

    const [mydata, setMydata] = useState([]);

    const getData = async () => {
        let datastr = await AsyncStorage.getItem("alphadata");
        if (datastr != null) {
            const jsondata = JSON.parse(datastr);
            setMydata(jsondata);
        }
        else {
            setMydata(datasource);
        }
    };

    getData();

    const renderItem =  ({item, index, section}) => {
        return (
            <TouchableOpacity style={styles.opacityStyle}
                              onPress={()=>
                              {
                                  navigation.navigate("Edit",{index:index, type:section.title, key:item.key})
                              }
                              }
            >
                <Text style={styles.textStyle}>{item.key}</Text>
            </TouchableOpacity>
        );
    };

    const sectionHeader = ({ section: { title, bgcolor } }) => {
        return (
            <Text style={[styles.headerText, { backgroundColor: bgcolor }]}>
                {title}
            </Text>
        );
    };

    return (
        <View style={{ paddingTop: insets.top }}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <Button title='Add Letter' onPress={()=>{navigation.navigate("Add", {datastring:JSON.stringify(mydata)})}}/>
            <SectionList sections={mydata}
                         renderItem={renderItem}
                         renderSectionHeader={sectionHeader}/>
        </View>
    );
};

export default Home;