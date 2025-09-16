import aboutus from "../assets/aboutus.png";

const theme = {
  colors: {
    // background: "hsl(45 33% 90%)",
    foreground: "hsl(210 15% 15%)",

    primary: "hsl(142 35% 32%)",
    primaryForeground: "hsl(0 0% 100%)",
    primaryLight: "hsl(142 35% 42%)",
    primaryDark: "hsl(142 40% 24%)",

    accent: "hsl(34 85% 55%)",
    accentForeground: "hsl(0 0% 100%)",
    accentLight: "hsl(34 85% 65%)",
    accentMuted: "hsl(34 85% 95%)",

    secondary: "hsl(210 10% 40%)",
    secondaryForeground: "hsl(0 0% 100%)",

    muted: "hsl(210 16% 96%)",
    mutedForeground: "hsl(210 10% 40%)",

    card: "hsl(0 0% 100%)",
    cardForeground: "hsl(210 15% 15%)",
    cardHover: "hsl(45 20% 98%)",

    border: "hsl(210 16% 88%)",
    input: "hsl(210 16% 95%)",
    ring: "hsl(142 35% 32%)",

    success: "hsl(146 50% 36%)",
    warning: "hsl(34 85% 50%)",
    destructive: "hsl(0 72% 51%)",
    destructiveForeground: "hsl(0 0% 100%)",

    popover: "hsl(0 0% 100%)",
    popoverForeground: "hsl(210 15% 15%)",

    hex: {
      primary: "#007bfe",
      test: "#6d6e75",
      secondary: "#fdfdfd",
      grey: "#dedede",
      backgroundGrey: "#f3f3f3",
      black: "#0c0d19",
      lightwhite: "#F5F5F5",
      brightblue: "#007BFF",
      vividblue: "#0494FA",
      aliceBlue: "#F1F4FF",
      pastelBlue: "#94C8FF",
      royalBlue: "#435EBE",
      lightgray: "#BDBECC",
      platinumlightgray: "#EDEDED",
      darkgray: "#252525",
      silvergray: "#AEAEAE",
      chorcoalgray: "#313131",
      lavendargray: "#D4D7EA",
      silverGray: "#B1B2B5",
      dimGray: "#696969",
      charcoalGray: "#272727",
      darkblueGray: "#171821",
      graniteGray: "#717171",
      timeGray: "#B4B4B4",
      pureblack: "#000000",
      blueishblack: "#0C0D19",
      jetBlack: "#2F2F2F",
      white: "#FFFFFF",
      emaraldgreen: "#20A100",
      goldenyellow: "#D4B200",
      crimsonRed: "#FB4F4F",
      vividRed: "#FF1010",
      logoutButtonColor: "#FF2E00",
      salmonPink: "#FF6161",
    },
  },

  gradients: {
    primary: "linear-gradient(135deg, hsl(142 35% 32%) 0%, hsl(142 35% 42%) 100%)",
    accent: "linear-gradient(135deg, hsl(34 85% 55%) 0%, hsl(34 85% 65%) 100%)",
    hero: "linear-gradient(135deg, hsl(142 40% 24%) 0%, hsl(142 35% 32%) 60%, hsl(34 85% 55%) 100%)",
    card: "linear-gradient(145deg, hsl(0 0% 100%) 0%, hsl(210 16% 96%) 100%)",
  },

  shadows: {
    sm: "0 2px 4px -1px hsl(210 10% 20% / 0.10)",
    md: "0 8px 24px -6px hsl(210 10% 20% / 0.14)",
    lg: "0 20px 40px -12px hsl(210 10% 20% / 0.18)",
    card: "0 4px 18px -2px hsl(210 10% 20% / 0.12)",
    accent: "0 8px 30px -8px hsl(34 85% 50% / 0.28)",
  },

  radii: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
  },

  fonts: {
    body: "'Playfair Display',serif",
    heading: "'Playfair Display',serif",
    mono: "'Playfair Display',  serif",
  },

  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1280px",
    xl: "1440px",
  },

  transitions: {
    smooth: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },

  pageBg: {
    overlayAlpha: 0.18,
    image: { aboutus },
    position: "50% 35%",
  },
};

export default theme;