/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react'
import { PanResponder, Dimensions, Image, View, Animated} from 'react-native'
import Svg, { Polygon } from 'react-native-svg'

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon)

class CustomCrop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ImageWidth:
                Dimensions.get('window').height / (props.height / props.width),
            viewHeight: Dimensions.get('window').height,
            height: props.height,
            width: props.width,
            image: props.initialImage,
            moving: false,
        }

        this.state = {
            ...this.state,
            topLeft: new Animated.ValueXY(
                props.rectangleCoordinates
                    ? this.imageCoordinatesToViewCoordinates(
                          props.rectangleCoordinates.topLeft,
                          true
                      )
                    : { x: 100, y: 100 }
            ),
            topRight: new Animated.ValueXY(
                props.rectangleCoordinates
                    ? this.imageCoordinatesToViewCoordinates(
                          props.rectangleCoordinates.topRight,
                          true
                      )
                    : { x: Dimensions.get('window').width - 100, y: 100 }
            ),
            bottomLeft: new Animated.ValueXY(
                props.rectangleCoordinates
                    ? this.imageCoordinatesToViewCoordinates(
                          props.rectangleCoordinates.bottomLeft,
                          true
                      )
                    : { x: 100, y: this.state.viewHeight - 100 }
            ),
            bottomRight: new Animated.ValueXY(
                props.rectangleCoordinates
                    ? this.imageCoordinatesToViewCoordinates(
                          props.rectangleCoordinates.bottomRight,
                          true
                      )
                    : {
                          x: Dimensions.get('window').width - 100,
                          y: this.state.viewHeight - 100,
                      }
            ),
        }
        this.state = {
            ...this.state,
            overlayPositions: `${this.state.topLeft.x._value},
            ${this.state.topLeft.y._value} ${this.state.topRight.x._value},
            ${this.state.topRight.y._value} ${this.state.bottomRight.x._value},
            ${this.state.bottomRight.y._value} ${this.state.bottomLeft.x._value},
            ${this.state.bottomLeft.y._value}`,
        }

        this.panResponderTopLeft = this.createPanResponser(this.state.topLeft)
        this.panResponderTopRight = this.createPanResponser(this.state.topRight)
        this.panResponderBottomLeft = this.createPanResponser(
            this.state.bottomLeft
        )
        this.panResponderBottomRight = this.createPanResponser(
            this.state.bottomRight
        )
    }

    getCropData() {
        const {
            topLeft,
            topRight,
            bottomLeft,
            bottomRight,
            ImageWidth,
            height,
            width,
            image,
        } = this.state
        const cropData = {
            topLeft: this.viewCoordinatesToImageCoordinates(topLeft),
            topRight: this.viewCoordinatesToImageCoordinates(topRight),
            bottomLeft: this.viewCoordinatesToImageCoordinates(bottomLeft),
            bottomRight: this.viewCoordinatesToImageCoordinates(bottomRight),
            height,
            width,
            image,
        }

        const widthCorrection =
            (ImageWidth - Dimensions.get('window').width) / 2

        cropData.topLeft.x += widthCorrection
        cropData.bottomLeft.x += widthCorrection
        cropData.topRight.x -= widthCorrection
        cropData.bottomRight.x -= widthCorrection

        return cropData
    }

    createPanResponser(corner) {
        return PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([
                null,
                {
                    dx: corner.x,
                    dy: corner.y,
                },
            ]),
            onPanResponderRelease: () => {
                corner.flattenOffset()
                this.updateOverlayString()
            },
            onPanResponderGrant: () => {
                corner.setOffset({ x: corner.x._value, y: corner.y._value })
                corner.setValue({ x: 0, y: 0 })
            },
        })
    }

    updateOverlayString() {
        const { topLeft, topRight, bottomLeft, bottomRight } = this.state
        this.setState({
            overlayPositions: `${topLeft.x._value},${topLeft.y._value} ${topRight.x._value},${topRight.y._value} ${bottomRight.x._value},${bottomRight.y._value} ${bottomLeft.x._value},${bottomLeft.y._value}`,
        })
    }

    imageCoordinatesToViewCoordinates(corner) {
        return {
            x: (corner.x * Dimensions.get('window').width) / this.state.width,
            y: (corner.y * this.state.viewHeight) / this.state.height,
        }
    }

    viewCoordinatesToImageCoordinates(corner) {
        return {
            x:
                (corner.x._value / Dimensions.get('window').width) *
                    this.state.width,
            y: (corner.y._value / this.state.viewHeight) * this.state.height,
        }
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}>
                <View
                    style={[
                        s(this.props).cropContainer,
                        { height: this.state.viewHeight },
                    ]}>
                    <Image
                        style={[
                            s(this.props).image,
                            {
                                height: this.state.viewHeight,
                                width: this.state.ImageWidth,
                                alignSelf: 'center',
                            },
                        ]}
                        resizeMode="contain"
                        source={{ uri: this.state.image }}
                    />
                    <Svg
                        height={this.state.viewHeight}
                        width={Dimensions.get('window').width}
                        style={{ position: 'absolute', left: 0, top: 0 }}>
                        <AnimatedPolygon
                            ref={ref => (this.polygon = ref)}
                            fill={this.props.overlayColor || 'blue'}
                            fillOpacity={this.props.overlayOpacity || 0.5}
                            stroke={this.props.overlayStrokeColor || 'blue'}
                            points={this.state.overlayPositions}
                            strokeWidth={this.props.overlayStrokeWidth || 3}
                        />
                    </Svg>
                    <Animated.View
                        {...this.panResponderTopLeft.panHandlers}
                        style={[
                            this.state.topLeft.getLayout(),
                            s(this.props).handler,
                        ]}>
                        <View
                            style={[
                                s(this.props).handlerI,
                                { left: 10, top: 10 },
                            ]}
                        />
                        <View
                            hitSlop={{ top: 20, left: 20, bottom: 20 }}
                            style={[
                                s(this.props).handlerRound,
                                { right: 41, bottom: 41, opacity: 1 },
                            ]}
                        />
                    </Animated.View>
                    <Animated.View
                        {...this.panResponderTopRight.panHandlers}
                        style={[
                            this.state.topRight.getLayout(),
                            s(this.props).handler,
                        ]}>
                        <View
                            style={[
                                s(this.props).handlerI,
                                { left: -10, top: 10 },
                            ]}
                        />
                        <View
                            hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                            style={[
                                s(this.props).handlerRound,
                                { left: 41, bottom: 41 },
                            ]}
                        />
                    </Animated.View>
                    <Animated.View
                        {...this.panResponderBottomLeft.panHandlers}
                        style={[
                            this.state.bottomLeft.getLayout(),
                            s(this.props).handler,
                        ]}>
                        <View
                            style={[
                                s(this.props).handlerI,
                                { left: 10, top: -10 },
                            ]}
                        />
                        <View
                            hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                            style={[
                                s(this.props).handlerRound,
                                { right: 41, top: 41 },
                            ]}
                        />
                    </Animated.View>
                    <Animated.View
                        {...this.panResponderBottomRight.panHandlers}
                        style={[
                            this.state.bottomRight.getLayout(),
                            s(this.props).handler,
                        ]}>
                        <View
                            style={[
                                s(this.props).handlerI,
                                { left: -10, top: -10 },
                            ]}
                        />
                        <View
                            hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                            style={[
                                s(this.props).handlerRound,
                                { left: 41, top: 41 },
                            ]}
                        />
                    </Animated.View>
                </View>
            </View>
        )
    }
}

const s = props => ({
    handlerI: {
        borderRadius: 0,
        height: 14,
        width: 14,
        backgroundColor: props.handlerColor || 'blue',
    },
    handlerRound: {
        position: 'absolute',
        width: 26,
        height: 26,
        borderRadius: 100,
        backgroundColor: props.handlerColor || 'blue',
    },
    image: {
        width: Dimensions.get('window').width,
        position: 'absolute',
    },
    bottomButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
        width: 70,
        height: 70,
        borderRadius: 100,
    },
    handler: {
        height: 140,
        width: 140,
        overflow: 'visible',
        marginLeft: -70,
        marginTop: -70,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    cropContainer: {
        position: 'absolute',
        left: 0,
        width: Dimensions.get('window').width,
        top: 0,
    },
})

export default CustomCrop
