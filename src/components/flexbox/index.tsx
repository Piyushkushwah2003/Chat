import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';

type FlexBoxProps = {
    children?: React.ReactNode;
    flexDirection?: 'row' | 'column';
    justifyContent?: 'between' | 'around' | 'center' | 'start' | 'end';
    alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    style?: StyleProp<ViewStyle>;
    columngap?: number;
    rowgap?: number;
};

export default function FlexBox({
    children,
    flexDirection = 'row',
    justifyContent = 'start',
    alignItems = 'stretch',
    flexWrap = 'nowrap',
    columngap = 0,
    rowgap = 0,
    style,
}: FlexBoxProps) {
    const getJustifyContent = () => {
        switch (justifyContent) {
            case 'between':
                return 'space-between';
            case 'around':
                return 'space-around';
            case 'center':
                return 'center';
            case 'start':
                return 'flex-start';
            case 'end':
                return 'flex-end';
            default:
                return 'flex-start';
        }
    };

    return (
        <View
            style={[
                styles.container,
                {
                    flexDirection: flexDirection as ViewStyle['flexDirection'],
                    justifyContent: getJustifyContent(),
                    alignItems: alignItems as ViewStyle['alignItems'],
                    flexWrap: flexWrap as ViewStyle['flexWrap'],
                    columnGap: columngap,
                    rowGap: rowgap,
                },
                style,
            ]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});
