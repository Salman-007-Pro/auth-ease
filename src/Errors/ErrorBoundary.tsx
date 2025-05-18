/**
 * ErrorBoundary component that catches JavaScript errors anywhere in its child component tree.
 * It displays a fallback UI when an error occurs and provides a way to recover from the error.
 *
 * Features:
 * - Catches and logs errors in child components
 * - Displays a user-friendly error message with an image
 * - Provides a restart button to recover from errors
 * - Handles both development and production environments differently
 *
 * @component
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 * ```
 */
import Fonts from '@/utilities/shared/Fonts';
import { scale, verticalScale } from '@/utilities/shared/Metrics';
import * as Updates from 'expo-updates';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/colors';

import PrimaryButton from '@/components/Buttons/PrimaryButton';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleRestart = async () => {
        try {
            if (__DEV__) {
                // In development, just reset the error state
                this.setState({ hasError: false, error: null });
            } else {
                // In production, reload the app
                await Updates.reloadAsync();
            }
        } catch (error) {
            console.error('Failed to restart app:', error);
            // Fallback to resetting error state
            this.setState({ hasError: false, error: null });
        }
    };

    render() {
        if (this.state.hasError) {
            return (
                <View style={styles.container}>
                    <Image
                        source={require('@/assets/images/under-construction.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>Oops! Something went wrong</Text>
                    <Text style={styles.message}>We're working on fixing this. Please try again in a moment.</Text>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton title="Restart App" onPress={this.handleRestart} />
                    </View>
                </View>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: scale(20),
        backgroundColor: Colors.background,
    },
    image: {
        width: scale(200),
        height: scale(200),
        marginBottom: verticalScale(24),
    },
    title: {
        ...Fonts.Bold(24, Colors.textPrimary),
        marginBottom: verticalScale(10),
        textAlign: 'center',
    },
    message: {
        ...Fonts.Regular(16, Colors.textSecondary),
        textAlign: 'center',
        marginBottom: verticalScale(32),
        paddingHorizontal: scale(20),
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: scale(40),
    },
});
