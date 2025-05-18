import { pathGenerator } from '@/utilities/services/router.service';
import Fonts from '@/utilities/shared/Fonts';
import { scale, verticalScale } from '@/utilities/shared/Metrics';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/colors';
import Routes from '@/constants/routes';

import PrimaryButton from '@/components/Buttons/PrimaryButton';

const Index = () => {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push(pathGenerator(Routes.Movies));
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
            <View style={styles.content}>
                <Image source={require('@/assets/images/icon.png')} style={styles.logo} resizeMode="contain" />
                <Text style={styles.title}>Welcome to Movie App</Text>
                <Text style={styles.subtitle}>Discover and explore your favorite movies in one place</Text>
                <PrimaryButton
                    title="Get Started"
                    onPress={handleGetStarted}
                    containerStyle={styles.button}
                    textStyle={styles.buttonText}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: scale(24),
    },
    logo: {
        width: scale(200),
        height: scale(200),
        marginBottom: verticalScale(32),
    },
    title: {
        ...Fonts.Bold(32),
        color: Colors.white,
        textAlign: 'center',
        marginBottom: verticalScale(16),
    },
    subtitle: {
        ...Fonts.Regular(16),
        color: Colors.white,
        textAlign: 'center',
        marginBottom: verticalScale(48),
        opacity: 0.8,
    },
    button: {
        width: '100%',
        maxWidth: scale(200),
        backgroundColor: Colors.white,
    },
    buttonText: {
        color: Colors.primary,
    },
});

export default Index;
