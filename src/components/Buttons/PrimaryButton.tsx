import utilService from '@/utilities/services/utils.service';
import Fonts from '@/utilities/shared/Fonts';
import { scale, verticalScale } from '@/utilities/shared/Metrics';
import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import { Colors } from '@/constants/colors';

import { Loading } from '../Loading/Loading';
import ButtonView, { ButtonViewProps } from './ButtonView';

/**
 * Props for the PrimaryButton component
 * @interface IPrimaryButton
 * @extends {Omit<ButtonViewProps, 'children'>}
 */
interface IPrimaryButton extends Omit<ButtonViewProps, 'children'> {
    /** Text to display in the button */
    title: string;
    /** Optional custom container styles */
    containerStyle?: StyleProp<ViewStyle>;
    /** Optional custom text styles */
    textStyle?: StyleProp<TextStyle>;
    /** Whether the button is disabled */
    disabled?: boolean;
    /** Whether to show loading state */
    loading?: boolean;
    /** Function called when button is pressed */
    onPress: () => void;
}

/**
 * Primary button component with loading state and customizable styles
 * @component
 * @param {IPrimaryButton} props - The props for the PrimaryButton component
 * @returns {React.ReactElement} A styled primary button
 *
 * @example
 * // Basic usage
 * <PrimaryButton title="Click me" onPress={() => {}} />
 *
 * // With loading state
 * <PrimaryButton
 *   title="Submit"
 *   onPress={handleSubmit}
 *   loading={isSubmitting}
 * />
 *
 * // Disabled state
 * <PrimaryButton
 *   title="Disabled Button"
 *   onPress={handlePress}
 *   disabled
 * />
 *
 * // Custom styles
 * <PrimaryButton
 *   title="Styled Button"
 *   onPress={handlePress}
 *   containerStyle={{
 *     paddingVertical: 16,
 *     paddingHorizontal: 32,
 *     borderRadius: 12,
 *   }}
 *   textStyle={{
 *     fontSize: 18,
 *     fontWeight: 'bold',
 *   }}
 * />
 *
 * // Loading with custom styles
 * <PrimaryButton
 *   title="Loading..."
 *   onPress={handlePress}
 *   loading={true}
 *   containerStyle={{
 *     backgroundColor: Colors.accent,
 *   }}
 * />
 *
 * // Disabled with loading
 * <PrimaryButton
 *   title="Processing"
 *   onPress={handlePress}
 *   loading={true}
 *   disabled={true}
 * />
 */
const PrimaryButton: FC<IPrimaryButton> = ({
    onPress,
    title,
    containerStyle,
    textStyle,
    disabled,
    loading,
    ...rest
}) => {
    return (
        <ButtonView
            {...rest}
            disabled={disabled || loading}
            onPress={onPress}
            style={[styles.container, containerStyle, disabled && styles.disabled]}
        >
            <View style={styles.contentContainer}>
                {loading ? (
                    <Loading
                        size={6}
                        color={Colors.white}
                        containerStyle={styles.loadingContainer}
                        animationDuration={400}
                        scaleFactor={1.3}
                    />
                ) : (
                    <Text style={[styles.text, textStyle]}>{title}</Text>
                )}
            </View>
        </ButtonView>
    );
};

export default PrimaryButton;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        paddingVertical: verticalScale(12),
        paddingHorizontal: scale(24),
        borderRadius: verticalScale(8),
    },
    disabled: {
        opacity: 0.7,
        backgroundColor: Colors.primary + utilService.getOpacityHex('70%'),
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: verticalScale(24), // Ensure consistent height during loading
    },
    loadingContainer: {
        flex: 0, // Prevent loading from stretching
        gap: 4, // Reduce gap between dots
    },
    text: {
        ...Fonts.Regular(16),
        fontWeight: '600',
        textAlign: 'center',
    },
});
