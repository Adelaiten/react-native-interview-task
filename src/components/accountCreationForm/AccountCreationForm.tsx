import { Box, Button, Checkbox, FormControl, Input, Select } from "native-base";
import React, { useReducer, useState } from 'react';
import { Alert, StyleSheet } from "react-native";
import { emailRegex } from "../../utils/regexp";
import LabeledInput from "../inputs/LabeledInput";


type FormState = {
    accountType: string;
    userName: string;
    password: string;
    serverAddress: string;
    serverPath: string;
    port: string;
    useSSL: boolean;
};

type FormAction =
    | { type: 'SET_ACCOUNT_TYPE'; payload: string }
    | { type: 'SET_USER_NAME'; payload: string }
    | { type: 'SET_PASSWORD'; payload: string }
    | { type: 'SET_SERVER_ADDRESS'; payload: string }
    | { type: 'SET_SERVER_PATH'; payload: string }
    | { type: 'SET_PORT'; payload: string }
    | { type: 'TOGGLE_SSL' };

const initialState: FormState = {
    accountType: '',
    userName: '',
    password: '',
    serverAddress: '',
    serverPath: '',
    port: '',
    useSSL: false,
};
    
const formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
        case 'SET_ACCOUNT_TYPE':
            return { ...state, accountType: action.payload };
        case 'SET_USER_NAME':
            return { ...state, userName: action.payload };
        case 'SET_PASSWORD':
            return { ...state, password: action.payload };
        case 'SET_SERVER_ADDRESS':
            return { ...state, serverAddress: action.payload };
        case 'SET_SERVER_PATH':
            return { ...state, serverPath: action.payload };
        case 'SET_PORT':
            return { ...state, port: action.payload };
        case 'TOGGLE_SSL':
            return { ...state, useSSL: !state.useSSL };
        default:
            return state;
    }
};

const AccountCreationForm = ({
    inputHeight = 35,
    fontSize = 12,
    inputWidth = 260 as string | number,
}) => {

    const [formState, dispatch] = useReducer(formReducer, initialState);
    const [isFormSubmitted, setFormSubmitted] = useState(false);
    const isAdvanced = formState.accountType === 'advanced';

    const handleAccountTypeChange = (value: string) => {
        dispatch({ type: 'SET_ACCOUNT_TYPE', payload: value });
    };

    const handleUserNameChange = (value: string) => {
        dispatch({ type: 'SET_USER_NAME', payload: value });
    };

    const handlePasswordChange = (value: string) => {
        dispatch({ type: 'SET_PASSWORD', payload: value });
    };

    const handleServerAddressChange = (value: string) => {
        dispatch({ type: 'SET_SERVER_ADDRESS', payload: value });
    };

    const handleServerPathChange = (value: string) => {
        dispatch({ type: 'SET_SERVER_PATH', payload: value });
    };

    const handlePortChange = (value: string) => {
        dispatch({ type: 'SET_PORT', payload: value });
    };

    const handleToggleSSL = () => {
        dispatch({ type: 'TOGGLE_SSL' });
    };

    const validate = (formState: FormState): boolean => {
            return true;

    };

    const onSubmit = () => {
        if(isAdvanced) {
            Alert.alert(JSON.stringify(formState));
        } else {
            Alert.alert(JSON.stringify(
                {
                    accountType: formState.accountType,
                    userName: formState.userName,
                    password: formState.password,
                    serverAddress: formState.serverAddress
                }
            ))
        }
    }

    return (
        <Box style={styles.container}>
                <LabeledInput label="Account Type:">
                    <Select width={inputWidth} height={inputHeight} placeholder="Choose Account Type" defaultValue="manual" onValueChange={handleAccountTypeChange}>
                        <Select.Item label="Manual" value="manual" />
                        <Select.Item label="Advanced" value="advanced" />
                    </Select>
                </LabeledInput>
                <LabeledInput isInvalid={formState.userName.length > 0 && !emailRegex.test(formState.userName)} errorMessage="Username should be a valid email" label="User Name:">
                    <Input type="text" height={inputHeight} fontSize={fontSize} value={formState.userName} onChangeText={handleUserNameChange} width={inputWidth} placeholder="name@example.com"/>
                </LabeledInput>
                <LabeledInput errorMessage="jr" label="Password:">
                    <Input type="password" height={inputHeight} fontSize={fontSize} value={formState.password} onChangeText={handlePasswordChange} width={inputWidth} placeholder="Required"/>
                </LabeledInput>
                <LabeledInput errorMessage="jr" label="Server Adress:">
                    <Input type="text" height={inputHeight} fontSize={fontSize} value={formState.serverAddress} onChangeText={handleServerAddressChange} width={inputWidth} placeholder="example.com"/>
                </LabeledInput>
                {isAdvanced && <React.Fragment>
                    <LabeledInput errorMessage="jr" label="Server Path:">
                        <Input type="text" height={inputHeight} fontSize={fontSize} value={formState.serverPath} onChangeText={handleServerPathChange} width={inputWidth} placeholder="/calendars/user/"/>
                    </LabeledInput>
                    <Box style={styles.portCheckboxContainer}>
                        <LabeledInput errorMessage="jr" label="Port:">
                            <Input type="text" height={inputHeight} fontSize={fontSize} value={formState.port} onChangeText={handlePortChange} width={100} placeholder="/calendars/user/"/>
                        </LabeledInput>
                        <Box style={styles.sslContainer}>
                            <Checkbox onChange={handleToggleSSL} value="Use SSL"/>
                            <FormControl.Label style={styles.label}>Use SSL</FormControl.Label>
                        </Box>
                    </Box>
                </React.Fragment>}
                <Button style={styles.submit} onPressOut={onSubmit}>Submit</Button>
        </Box>
    )
};



const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        paddingHorizontal: 16
    },
    submit: {
        width: '50%',
        alignSelf: 'center'
    },
    sslContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        marginLeft: 8
    },
    portCheckboxContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 38
    },
});

export default AccountCreationForm;