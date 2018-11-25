import { css } from "styled-components";
import kalam_boldttf from "./Kalam-Bold.ttf";
import kalam_regularttf from "./Kalam-Regular.ttf";
// import kalam_regularwoff from "./Kalam-Regular.woff";
// import atlas_black_eot from "./atlas/AtlasGrotesk-Web-Black.eot";
// import atlas_black_svg from "./atlas/AtlasGrotesk-Web-Black.svg";
// import atlas_black_ttf from "./atlas/AtlasGrotesk-Web-Black.ttf";
// import atlas_black_woff from "./atlas/AtlasGrotesk-Web-Black.woff";
import atlas_bold_eot from "./atlas/AtlasGrotesk-Web-Bold.eot";
import atlas_bold_svg from "./atlas/AtlasGrotesk-Web-Bold.svg";
import atlas_bold_ttf from "./atlas/AtlasGrotesk-Web-Bold.ttf";
import atlas_bold_woff from "./atlas/AtlasGrotesk-Web-Bold.woff";
import atlas_medium_ttf from "./atlas/AtlasGrotesk-Web-Medium.ttf";
import atlas_medium_woff from "./atlas/AtlasGrotesk-Web-Medium.woff";
import atlas_medium_woff2 from "./atlas/AtlasGrotesk-Web-Medium.woff2";
import atlas_regular_eot from "./atlas/AtlasGrotesk-Web-Regular.eot";
import atlas_regular_svg from "./atlas/AtlasGrotesk-Web-Regular.svg";
import atlas_regular_ttf from "./atlas/AtlasGrotesk-Web-Regular.ttf";
import atlas_regular_woff from "./atlas/AtlasGrotesk-Web-Regular.woff";
// import graphik_light_eot from "./graphik/Graphik-Light.eot";
// import graphik_light_svg from "./graphik/Graphik-Light.svg";
// import graphik_light_ttf from "./graphik/Graphik-Light.ttf";
// import graphik_light_woff from "./graphik/Graphik-Light.woff";
// import graphik_Medium_eot from "./graphik/Graphik-Medium.eot";
// import graphik_Medium_svg from "./graphik/Graphik-Medium.svg";
import graphik_Medium_ttf from "./graphik/Graphik-Medium.ttf";
import graphik_Medium_woff from "./graphik/Graphik-Medium.woff";
import graphik_Regular_eot from "./graphik/Graphik-Regular.eot";
import graphik_Regular_svg from "./graphik/Graphik-Regular.svg";
import graphik_Regular_ttf from "./graphik/Graphik-Regular.ttf";
import graphik_Regular_woff from "./graphik/Graphik-Regular.woff";
import graphik_Semibold_eot from "./graphik/Graphik-Semibold.eot";
import graphik_Semibold_svg from "./graphik/Graphik-Semibold.svg";
import graphik_Semibold_ttf from "./graphik/Graphik-Semibold.ttf";
import graphik_Semibold_woff from "./graphik/Graphik-Semibold.woff";
import { breakpoints } from "../breakpoints";

// Custom Font Name
const font_name = {
  atlas: "AtlasGrotesk",
  kalam: "Kalam",
  graphik: "Graphik"
};

// Font Weight
export const font_weight = {
  regular: 400,
  medium: 500,
  bold: 600
};

// Font Family
export const font_family = `'${
  font_name.graphik
}',system-ui, sans-serif !important`;

let kk = {
  woff: "woff",
  ttf: "ttf",
  eot: "eot"
};

// Line Heights
export const line_height = {
  xxxl: "60px",
  xxl: "48px",
  xl: "40px",
  l: "32px",
  m: "28px",
  default: "24px",
  s: "20px;",
  xs: "16px;"
};

// Font Sizes
export const font_size = {
  xxxl: "44px",
  xxl: "36px",
  xl: "30px",
  l: "22px",
  m: "18px",
  default: "16px",
  s: "14px;",
  xs: "12px;"
};
const fontSizeFunc = (
  { font_family, size, line_height, weight = font_weight.medium },
  mobile
) => `
  font-family: ${font_family};
font-size: ${size};
    line-height: ${line_height};
    font-weight: ${weight};
    ${
  mobile
    ? `
        @media(max-width: ${breakpoints.tablet}){
          font-size: ${mobile.size};
          ${mobile.line_height ? `line-height: ${mobile.line_height};` : ``}
        }
    `
    : ""
  }
`;
export const font_styles = (
  font_family,
  font_size,
  line_height,
  font_weight
) => ({
  //  48px/60px
  hero_heading: {
    desktop: { font_family, size: font_size.xxxl, line_height: 1.3 },
    mobile: { size: font_size.xxl }
  },
  //  36px/48px

  big_heading: {
    desktop: { font_family, size: font_size.xxl, line_height: line_height.xxl },
    mobile: { size: "28px", line_height: line_height.xl }
  },
  // 30px/40px
  regular_heading: {
    desktop: { font_family, size: font_size.xl, line_height: line_height.xl },
    mobile: { size: "26px", line_height: line_height.xl }
  },
  // 22px/32px
  small_heading: {
    desktop: { font_family, size: font_size.l, line_height: line_height.l }
  },
  // 18px/28px
  big_body: {
    desktop: {
      font_family,
      size: font_size.m,
      line_height: line_height.m,
      weight: font_weight.regular
    }
  },
  // 16px/24px
  regular_body: {
    desktop: {
      font_family,
      size: font_size.default,
      line_height: line_height.default,
      weight: font_weight.regular
    }
  },
  // 14px/20px
  small_body: {
    desktop: {
      font_family,
      size: font_size.s,
      line_height: line_height.s,
      weight: font_weight.regular
    }
  },
  // 12px/16px
  tiny_body: {
    desktop: {
      font_family,
      size: font_size.xs,
      line_height: line_height.xs,
      weight: font_weight.regular
    }
  }
});
export function generateFont(f_styles) {
  let result = {};
  Object.keys(f_styles).forEach(x => {
    let { desktop, mobile } = f_styles[x];
    result[x] = fontSizeFunc(desktop, mobile);
  });
  return result;
}
export function getFont(props) {
  let font = generateFont(
    font_styles(font_family, font_size, line_height, font_weight)
  );
  return font[props.type];
}

// Generate the font properties based on props
export function generateFontStyle(props, kind = "heading") {
  let { theme = { font } } = props;
  let fontValue = theme.font || [
    font_family,
    font_size,
    line_height,
    font_weight
  ];
  let font = generateFont(font_styles(...fontValue));
  let result = font[`regular_${kind}`];
  if (["hero", "big", "small", "tiny"].includes(props.size)) {
    result = `${font[`${props.size}_${kind}`]}`;
  }
  return `${result}
  ${props => props.isWhite && "color: white;"};
  color: ${props => props.color || "inherit"};
    margin-top: ${props => props.marginTop};
  text-align: ${props => props.align};
  `;
}

function createFontFace(name, kind, weight = "medium") {
  let urls = Object.keys(kind).map(x => `url("${kind[x]}") format("${x}")`);
  return `
    @font-face {
        font-family: ${name};
        font-display: swap;
        src: ${urls.join(", ")}; 
        font-weight: ${font_weight[weight]};
        font-style: normal;
    }
    `;
}
export const font_face = css`
    ${createFontFace(font_name.atlas, {
      woff: atlas_medium_woff,
      woff2: atlas_medium_woff2,
      truetype: atlas_medium_ttf
    })}
    ${createFontFace(
      font_name.atlas,
      {
        woff: atlas_bold_woff,
        eot: atlas_bold_eot,
        truetype: atlas_bold_ttf,
        svg: atlas_bold_svg
      },
      "bold"
    )}
    ${createFontFace(
      font_name.atlas,
      {
        woff: atlas_regular_woff,
        eot: atlas_regular_eot,
        truetype: atlas_regular_ttf,
        svg: atlas_regular_svg
      },
      "regular"
    )}
      ${createFontFace(
        font_name.graphik,
        {
          woff: graphik_Semibold_woff,
          eot: graphik_Semibold_eot,
          truetype: graphik_Semibold_ttf,
          svg: graphik_Semibold_svg
        },
        "bold"
      )}

  ${createFontFace(
    font_name.graphik,
    {
      woff: graphik_Medium_woff,
      woff2: graphik_Medium_woff,
      truetype: graphik_Medium_ttf
    },
    "medium"
  )}
    
  ${createFontFace(
    font_name.graphik,
    {
      woff: graphik_Regular_woff,
      eot: graphik_Regular_eot,
      truetype: graphik_Regular_ttf,
      svg: graphik_Regular_svg
    },
    "regular"
  )}

    ${createFontFace(
      font_name.kalam,
      {
        truetype: kalam_boldttf
      },
      "bold"
    )}
    ${createFontFace(
      font_name.kalam,
      {
        truetype: kalam_regularttf
      },
      "regular"
    )}

`;
