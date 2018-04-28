import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "header": {
        "position": "fixed !important",
        "zIndex": 10,
        "top": 0,
        "left": 0,
        "width": "100%",
        "height": 50,
        "backgroundColor": "#ff3300"
    },
    "headerleft": {
        "float": "left",
        "width": "20%",
        "height": 50,
        "lineHeight": 50
    },
    "headerleft span": {
        "width": "100%",
        "height": 50,
        "lineHeight": 50,
        "paddingLeft": 16,
        "color": "white",
        "fontSize": 16
    },
    "headertitle": {
        "float": "left",
        "width": "60%",
        "height": 50,
        "lineHeight": 50,
        "textAlign": "center"
    },
    "headertitle span": {
        "height": 50,
        "lineHeight": 50,
        "fontSize": 18,
        "color": "#FFFFFF",
        "overflowY": "hidden",
        "overflowX": "scroll",
        "textAlign": "center"
    },
    "headerright": {
        "float": "right",
        "width": "20%",
        "height": 50,
        "lineHeight": 50,
        "textAlign": "right"
    },
    "headerright span": {
        "width": "100%",
        "height": 50,
        "lineHeight": 50,
        "color": "white",
        "fontSize": 16,
        "paddingRight": 16
    },
    "container": {
        "width": "100%",
        "minHeight": 800,
        "marginTop": 60
    },
    "title-row": {
        "width": "100%",
        "height": 80,
        "lineHeight": 80,
        "textAlign": "center"
    },
    "title-row-title": {
        "width": "100%",
        "height": 40,
        "lineHeight": 40,
        "textAlign": "center"
    },
    "title-row-title span": {
        "color": "red",
        "fontSize": 16
    },
    "title-row-sub": {
        "width": "100%",
        "height": 40,
        "lineHeight": 40,
        "textAlign": "center"
    },
    "title-row-sub span": {
        "color": "blue",
        "fontSize": 16
    },
    "data-row": {
        "width": "100%",
        "height": 40,
        "lineHeight": 40,
        "textAlign": "center"
    },
    "data-row span": {
        "color": "blue",
        "fontSize": 16
    }
});