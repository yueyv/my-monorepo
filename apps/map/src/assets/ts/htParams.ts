export const formula = {
    "modified": "Tue Sep 10 2024 11:29:12 GMT+0800 (香港标准时间)",
    "dataBindings": [
        {
            "attr": "width",
            "valueType": "PositiveNumber"
        },
        {
            "attr": "bg_color",
            "valueType": "Color"
        },
        {
            "attr": "border_color",
            "valueType": "Color"
        },
        {
            "attr": "rect",
            "valueType": "String"
        },
        {
            "attr": "title",
            "valueType": "String"
        },
        {
            "attr": "title_color",
            "valueType": "Color"
        },
        {
            "attr": "text_rect1",
            "valueType": "String"
        },
        {
            "attr": "value",
            "valueType": "String"
        },
        {
            "attr": "value_color",
            "valueType": "Color"
        },
        {
            "attr": "text_rect2",
            "valueType": "String"
        }
    ],
    "width": {
        "func": "attr@width",
        "value": 172
    },
    "height": 50,
    "comps": [
        {
            "type": "roundRect",
            "background": {
                "func": "attr@bg_color",
                "value": "#eda198"
            },
            "borderWidth": 1,
            "borderColor": {
                "func": "attr@border_color",
                "value": "rgb(247,92,74)"
            },
            "cornerRadius": 10,
            "rect": {
                "func": "attr@rect",
                "value": [2, 1.09063, 168.4639, 47.81874]
            }
        },
        {
            "type": "text",
            "text": {
                "func": "attr@title",
                "value": "文本"
            },
            "align": "center",
            "color": {
                "func": "attr@title_color",
                "value": "rgb(61,61,61)"
            },
            "font": "12px fantasy",
            "rect": {
                "func": "attr@text_rect1",
                "value": [1, 5, 178, 20]
            }
        },
        {
            "type": "text",
            "text": {
                "func": "attr@value",
                "value": "0"
            },
            "align": "center",
            "color": {
                "func": "attr@value_color",
                "value": "rgb(61,61,61)"
            },
            "font": "12px fantasy",
            "displayName": "文本",
            "anchorY": 0.59232,
            "rect": {
                "func": "attr@text_rect2",
                "value": [1, 22.79263, 178, 20]
            }
        }
    ]
}
export const param = {
    "modified": "Tue Sep 10 2024 11:41:08 GMT+0800 (香港标准时间)",
    "dataBindings": [
        {
            "attr": "formula_id",
            "valueType": "String"
        },
        {
            "attr": "width",
            "valueType": "PositiveNumber"
        },
        {
            "attr": "bg_color",
            "valueType": "Color"
        },
        {
            "attr": "border_color",
            "valueType": "Color"
        },
        {
            "attr": "rect",
            "valueType": "String"
        },
        {
            "attr": "title",
            "valueType": "String"
        },
        {
            "attr": "title_color",
            "valueType": "Color"
        },
        {
            "attr": "text_rect1",
            "valueType": "String"
        }
    ],
    "width": {
        "func": "attr@width",
        "value": 172
    },
    "height": 40,
    "comps": [
        {
            "type": "roundRect",
            "background": {
                "func": "attr@bg_color",
                "value": "#fae2bb"
            },
            "borderWidth": 1,
            "borderColor": {
                "func": "attr@border_color",
                "value": "rgb(252,181,66)"
            },
            "cornerRadius": 10,
            "rect": {
                "func": "attr@rect",
                "value": [1.76805, 1.32873, 168.4639, 37.34255]
            }
        },
        {
            "type": "text",
            "text": {
                "func": "attr@title",
                "value": "文本"
            },
            "align": "center",
            "color": {
                "func": "attr@title_color",
                "value": "rgb(61,61,61)"
            },
            "font": "12px fantasy",
            "rect": {
                "func": "attr@text_rect1",
                "value": [1.76805, 10, 178, 20]
            }
        }
    ]
}
export const root = {
    "modified": "Tue Sep 10 2024 11:30:03 GMT+0800 (香港标准时间)",
    "dataBindings": [
        {
            "attr": "formula_id",
            "valueType": "String"
        },
        {
            "attr": "width",
            "valueType": "PositiveNumber"
        },
        {
            "attr": "bg_color",
            "valueType": "Color"
        },
        {
            "attr": "border_color",
            "valueType": "Color"
        },
        {
            "attr": "rect",
            "valueType": "String"
        },
        {
            "attr": "title",
            "valueType": "String"
        },
        {
            "attr": "title_color",
            "valueType": "Color"
        },
        {
            "attr": "text_rect1",
            "valueType": "String"
        },
        {
            "attr": "value",
            "valueType": "String"
        },
        {
            "attr": "value_color",
            "valueType": "Color"
        },
        {
            "attr": "text_rect2",
            "valueType": "String"
        }
    ],
    "width": {
        "func": "attr@width",
        "value": 172
    },
    "height": 50,
    "comps": [
        {
            "type": "roundRect",
            "background": {
                "func": "attr@bg_color",
                "value": "#cdd8fc"
            },
            "borderWidth": 1,
            "borderColor": {
                "func": "attr@border_color",
                "value": "#597ff7"
            },
            "cornerRadius": 10,
            "rect": {
                "func": "attr@rect",
                "value": [2, 1.09063, 168.4639, 47.81874]
            }
        },
        {
            "type": "text",
            "text": {
                "func": "attr@title",
                "value": "文本"
            },
            "align": "center",
            "color": {
                "func": "attr@title_color",
                "value": "rgb(61,61,61)"
            },
            "font": "12px fantasy",
            "rect": {
                "func": "attr@text_rect1",
                "value": [1, 5, 178, 20]
            }
        },
        {
            "type": "text",
            "text": {
                "func": "attr@value",
                "value": "0"
            },
            "align": "center",
            "color": {
                "func": "attr@value_color",
                "value": "rgb(61,61,61)"
            },
            "font": "12px fantasy",
            "displayName": "文本",
            "anchorY": 0.59232,
            "rect": {
                "func": "attr@text_rect2",
                "value": [1, 22.79263, 178, 20]
            }
        }
    ]
}
