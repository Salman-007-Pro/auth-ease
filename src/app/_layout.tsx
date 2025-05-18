import { ErrorBoundary } from '@/Errors/ErrorBoundary';
import { FontVariations } from '@/utilities/shared/Fonts';
import type { Theme } from '@react-navigation/native';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from 'sonner-native';

import Routes from '@/constants/routes';
import { DEFAULT_THEME } from '@/constants/theme';

import useKeyboardManager from '@/hooks/useKeyboardManager';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
    duration: 4000,
    fade: true,
});

const RootLayout = () => {
    const [loaded] = useFonts({
        ...FontVariations,
    });

    // Keyboard manager
    useKeyboardManager();

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }
    return (
        <ErrorBoundary>
            <GestureHandlerRootView style={styles.container}>
                <ThemeProvider value={DEFAULT_THEME as Theme}>
                    <Toaster swipeToDismissDirection="left" position="top-center" closeButton />
                    <SafeAreaProvider>
                        <Stack
                            screenOptions={{
                                headerShown: false,
                                contentStyle: {
                                    backgroundColor: DEFAULT_THEME.colors.background,
                                },
                            }}
                        >
                            <Stack.Screen name={Routes.SignIn} options={{ headerShown: false }} />
                            <Stack.Screen
                                name={Routes.SignUp}
                                getId={({ params }) => params?.id}
                                options={{ headerShown: false }}
                            />
                        </Stack>
                    </SafeAreaProvider>
                </ThemeProvider>
            </GestureHandlerRootView>
        </ErrorBoundary>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default RootLayout;
