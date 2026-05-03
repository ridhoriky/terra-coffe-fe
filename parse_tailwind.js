const config = {
    "colors": {
        "espresso-dark": "#2C1A0E",
        "surface-dim": "#dfd9d1",
        "surface-container": "#f3ede4",
        "error-container": "#ffdad6",
        "background": "#fff9ef",
        "on-tertiary-fixed": "#231a0f",
        "on-secondary-container": "#58694e",
        "on-secondary-fixed": "#111f0a",
        "surface-bright": "#fff9ef",
        "tertiary-fixed-dim": "#d5c4b3",
        "surface-white": "#FDFAF6",
        "surface-container-highest": "#e7e2d9",
        "on-background": "#1d1b16",
        "surface-variant": "#e7e2d9",
        "surface-container-high": "#ede7de",
        "on-error-container": "#93000a",
        "on-secondary-fixed-variant": "#3b4b32",
        "on-primary-container": "#fffbff",
        "inverse-primary": "#ffb693",
        "on-surface": "#1d1b16",
        "warm-ivory": "#F0E4D0",
        "error": "#ba1a1a",
        "on-tertiary": "#ffffff",
        "inverse-surface": "#32302a",
        "primary-fixed": "#ffdbcc",
        "on-error": "#ffffff",
        "dark-roast-text": "#1E0F05",
        "tertiary": "#665a4c",
        "outline-variant": "#dcc1b5",
        "tertiary-fixed": "#f2e0ce",
        "secondary-fixed": "#d5e9c6",
        "secondary-fixed-dim": "#b9ccab",
        "surface-container-lowest": "#ffffff",
        "inverse-on-surface": "#f6f0e7",
        "on-tertiary-fixed-variant": "#504538",
        "surface-container-low": "#f9f3ea",
        "tertiary-container": "#807264",
        "on-tertiary-container": "#fffbff",
        "outline": "#897268",
        "primary-container": "#b95925",
        "secondary": "#526348",
        "on-surface-variant": "#56433a",
        "secondary-container": "#d5e9c6",
        "on-primary": "#ffffff",
        "surface": "#fff9ef",
        "surface-tint": "#9c440f",
        "on-primary-fixed": "#351000",
        "on-primary-fixed-variant": "#7a3000",
        "primary": "#99420d",
        "primary-fixed-dim": "#ffb693",
        "on-secondary": "#ffffff"
    },
    "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
    },
    "spacing": {
        "section-padding-v-mobile": "60px",
        "section-padding-v-desktop": "100px",
        "gutter": "24px",
        "stack-md": "16px",
        "stack-lg": "32px",
        "container-max": "1200px",
        "stack-sm": "8px"
    },
    "fontFamily": {
        "display-xl": ["Noto Serif"],
        "body-md": ["Be Vietnam Pro"],
        "headline-lg": ["Noto Serif"],
        "body-lg": ["Be Vietnam Pro"],
        "accent-italic": ["Noto Serif"],
        "headline-md": ["Noto Serif"],
        "label-caps": ["Be Vietnam Pro"]
    },
    "fontSize": {
        "display-xl": ["64px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "600"}],
        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "headline-lg": ["48px", {"lineHeight": "1.2", "fontWeight": "500"}],
        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "accent-italic": ["18px", {"lineHeight": "1.5", "fontWeight": "400"}],
        "headline-md": ["32px", {"lineHeight": "1.3", "fontWeight": "500"}],
        "label-caps": ["12px", {"lineHeight": "1.0", "letterSpacing": "0.1em", "fontWeight": "600"}]
    }
};

let css = '';
for (const [k, v] of Object.entries(config.colors)) {
    css += `  --color-${k}: ${v};\n`;
}
for (const [k, v] of Object.entries(config.spacing)) {
    css += `  --spacing-${k}: ${v};\n`;
}
for (const [k, v] of Object.entries(config.fontFamily)) {
    css += `  --font-${k}: ${v[0]};\n`;
}
for (const [k, v] of Object.entries(config.fontSize)) {
    css += `  --text-${k}: ${v[0]};\n`;
    if (v[1].lineHeight) css += `  --text-${k}--line-height: ${v[1].lineHeight};\n`;
    if (v[1].letterSpacing) css += `  --text-${k}--letter-spacing: ${v[1].letterSpacing};\n`;
    if (v[1].fontWeight) css += `  --text-${k}--font-weight: ${v[1].fontWeight};\n`;
}
console.log(css);
