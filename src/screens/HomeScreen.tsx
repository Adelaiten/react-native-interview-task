import React from 'react';
import { StyleSheet, View } from "react-native";
import AccountCreationForm from '../components/accountCreationForm/AccountCreationForm';

const HomeScreen = ({}) => {
    return (
        <View style={styles.container}>
            <AccountCreationForm/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 25
    }
});

export default HomeScreen;