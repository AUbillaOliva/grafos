const Common = {
    COLOR_ACCENT: "#B2C932",
    TEXT_COLOR_DARK: "#000000",
    TEXT_COLOR_LIGHT: "#FFFFFF",
};

export const DarkTheme = {
    mode: "dark",

    BUTTON: {
        BACKGROUND: {
            PRIMARY: "#B2C932",
            SECONDARY: "#121212",
            SUCCESS: "#D4EDDA",
            WARNING: "#856404",
            ERROR: "#CF6679",
            INFO: "#2a1ab9",
            LIGHT: "#FFFFFF",
            DARK: "#000000",
        },
        TEXT: {
            PRIMARY: "#000000",
            SECONDARY: "#F5F5F5",
            SUCCESS: "#000000",
            WARNING: "#FFFFFF",
            ERROR: "#000000",
            INFO: "#FFFFFF",
            LIGHT: "#000000",
            DARK: "#FFFFFF",
        },
    },

    ALERT: {
        TEXT: {
            ERROR: "#000000",
            INFO: "#000000",
            SUCCESS: "#000000",
            WARNING: "#FFFFFF",
        },
        BACKGROUND: {
            ERROR: "#CF6679",
            INFO: "#2a1ab9",
            SUCCESS: "#D4EDDA",
            WARNING: "#856404",
        },
        ICON: {
            ERROR: "#812325",
            INFO: "#d7d6e6",
            SUCCESS: "#155724",
            WARNING: "#FFF3CD",
        },
    },

    CARD: {
        TEXT: {
            TITLE: "#FFFFFF",
            TEXT: "#F3F3F3",
        },
        BACKGROUND: "#161B22",
    },

    SELECT: {
        CLEAR_INDICATOR: {
            COLOR: "#000000",
        },
        INPUT: {
            COLOR: "#000000",
        }
    },

    TEXT: {
        DARK: Common.TEXT_COLOR_DARK,
        LIGHT: Common.TEXT_COLOR_LIGHT,
        PRIMARY: "#FFFFFF",
        TITLE: "#FFFFFF",
        NAVLINK: "#FFFFFF",
    },

    BACKGROUND: {
        PRIMARY: "#121212",
        SURFACE: "#161B22",
    },

    // BACKGROUND
    SIDEBAR_ITEM_BG_COLOR: "rgba(200, 133, 255, 0.3)",

    // THEME COLORS
    PRIMARY_COLOR: "#161B22",
    COLOR_ACCENT: Common.COLOR_ACCENT,
    BOX_SHADOW: "rgba(255, 255, 255, 0.03)",
    DIVIDER_COLOR: "rgba(255, 255, 255, 0.12)",
    ERROR_COLOR: "#CF6679",
};

export const LightTheme = {
    mode: "light",

    BUTTON: {
        TEXT: {
            PRIMARY: "#000000",
            SECONDARY: "#000000",
            SUCCESS: "#000000",
            WARNING: "#000000",
            ERROR: "#FFFFFF",
            INFO: "#000000",
            LIGHT: "#000000",
            DARK: "#FFFFFF",
        },
        BACKGROUND: {
            PRIMARY: "#B2C932",
            SECONDARY: "#F5F5F5",
            SUCCESS: "#D4EDDA",
            WARNING: "#FFF3CD",
            ERROR: "#B00020",
            INFO: "#81c5ce",
            LIGHT: "#FFFFFF",
            DARK: "#000000",
        },
    },

    ALERT: {
        TEXT: {
            ERROR: "#FFFFFF",
            INFO: "#FFFFFF",
            SUCCESS: "#000000",
            WARNING: "#000000",
        },
        BACKGROUND: {
            ERROR: "#B00020",
            INFO: "#81c5ce",
            SUCCESS: "#D4EDDA",
            WARNING: "#856404",
        },
        ICON: {
            ERROR: "#FFFFFF",
            INFO: "#856404",
            SUCCESS: "#155724",
            WARNING: "#FFF3CD",
        },
    },

    CARD: {
        TEXT: {
            TITLE: "#000000",
            TEXT: "#5f6368",
        },
        BACKGROUND: "#FFFFFF",
    },

    SELECT: {
        CLEAR_INDICATOR: {
            COLOR: "#000000",
        },
        INPUT: {
            COLOR: "#000000",
        }
    },

    TEXT: {
        DARK: Common.TEXT_COLOR_DARK,
        LIGHT: Common.TEXT_COLOR_LIGHT,
        PRIMARY: "#5f6368",
        TITLE: "#000000",
        NAVLINK: "#000000",
    },

    BACKGROUND: {
        PRIMARY: "#FFFFFF",
        SURFACE: "#F5F5F5",
    },

    // BACKGROUND
    SIDEBAR_ITEM_BG_COLOR: "rgb(178, 201, 50, 0.7)",

    // THEME COLORS
    PRIMARY_COLOR: "#FFFFFF",
    COLOR_ACCENT: Common.COLOR_ACCENT,
    BOX_SHADOW: "rgba(0, 0, 0, 0.15)",
    DIVIDER_COLOR: "#E5E5E5",
    ERROR_COLOR: "#B00020",
};
