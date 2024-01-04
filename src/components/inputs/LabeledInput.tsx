import { Box, FormControl, WarningOutlineIcon } from "native-base";
import React from 'react';
import { StyleSheet } from "react-native";

const LabeledInput = ({
    label = '',
    errorMessage = '',
    isInvalid = false,
    children = null as any as JSX.Element
}) => {

    return (<Box>
        <FormControl isInvalid={isInvalid}>
            <Box flexDirection="row">
                {label && <FormControl.Label style={styles.label}>{label}</FormControl.Label>}
                {children}
            </Box>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    </Box>)
};

const styles = StyleSheet.create({
    label: {
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow: 1,
    },
});

export default LabeledInput;