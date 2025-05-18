import Fonts from '@/utilities/shared/Fonts';
import { verticalScale } from '@/utilities/shared/Metrics';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Colors } from '@/constants/colors';

interface EmptyListProps {
    title?: string;
    message?: string;
    containerStyle?: ViewStyle;
}

const EmptyList: React.FC<EmptyListProps> = ({
    title = 'No Items Found',
    message = 'There are no items to display at the moment.',
    containerStyle,
}) => {
    return (
        <View style={StyleSheet.flatten([styles.container, containerStyle])}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: verticalScale(20),
    },
    title: {
        ...Fonts.Bold(18, Colors.textPrimary),
        marginBottom: verticalScale(8),
    },
    message: {
        ...Fonts.Regular(14, Colors.textSecondary),
        textAlign: 'center',
    },
});

export default EmptyList;
