import {createGlobalStyle} from "styled-components";

export const theme = {
    colors: {
        primaryText: "#2F2C58",
        secondaryText: "#6B1E2C",
        lightText: "#F5F3EE",

        headerBackground: "#2F2C58",
        mainBackground: "#FFF4D8",
    },
};

export const DefaultStyling = createGlobalStyle`
body {
    background-color: ${({ theme }) => theme.colors.mainBackground};
}`;

export type ThemeType = typeof theme;

export default theme;