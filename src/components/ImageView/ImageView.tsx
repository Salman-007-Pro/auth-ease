import { Image, ImageErrorEventData } from 'expo-image';
import React, { useState } from 'react';
import { ActivityIndicator, ImageStyle, StyleSheet, View, ViewStyle } from 'react-native';

import { Colors } from '@/constants/colors';

interface ImageViewProps {
    source: string | number;
    style?: ImageStyle;
    containerStyle?: ViewStyle;
    contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    transition?: number;
    onLoad?: () => void;
    onError?: (error: ImageErrorEventData) => void;
    loadingColor?: string;
}

const ImageView: React.FC<ImageViewProps> = ({
    source,
    style,
    containerStyle,
    contentFit = 'cover',
    transition = 300,
    onLoad,
    onError,
    loadingColor = Colors.accent,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleLoad = () => {
        setIsLoading(false);
        onLoad?.();
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <Image
                source={source}
                style={[styles.image, style]}
                contentFit={contentFit}
                transition={transition}
                onLoadStart={() => setIsLoading(true)}
                onLoad={handleLoad}
                onError={onError}
            />
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={loadingColor} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background + 'CC',
    },
});

export default ImageView;
