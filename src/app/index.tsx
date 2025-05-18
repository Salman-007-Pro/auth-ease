import { pathGenerator } from '@/utilities/services/router.service';
import Fonts from '@/utilities/shared/Fonts';
import { scale, verticalScale } from '@/utilities/shared/Metrics';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/colors';
import Routes from '@/constants/routes';

import PrimaryButton from '@/components/Buttons/PrimaryButton';
import ImageView from '@/components/ImageView/ImageView';

const Index = () => {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push(pathGenerator(Routes.SignIn));
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <ImageView
                source={require('@/assets/images/backgroundImage.png')}
                containerStyle={styles.backgroundImage}
                contentFit="cover"
                transition={1000}
            />
            <View style={styles.content}>
                <Image
                    source={require('@/assets/images/app-icon.png')}
                    style={styles.logo}
                    contentFit="contain"
                    transition={1000}
                />
                <Text style={styles.title}>Welcome to Auth Ease</Text>
                <Text style={styles.subtitle}>Secure authentication made simple and easy</Text>
                <PrimaryButton
                    title="Get Started"
                    onPress={handleGetStarted}
                    containerStyle={styles.button}
                    textStyle={styles.buttonText}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
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
