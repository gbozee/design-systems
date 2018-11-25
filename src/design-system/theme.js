import { color, brand_color } from "./color";
import { font_face, font_family, font_weight } from "./font";
import { spacing } from "./spacing";
import { lighten, darken } from "polished";
import {
  border_color,
  border_radius,
  focus_states,
  border_thickness
} from "./border";
import { box_shadow } from "./box-shadow";
import { breakpoints } from "./breakpoints";
import { z_index } from "./z-index";
import { font_size, line_height } from "./font";

let n_font_size = { ...font_size, xxl: "44px" };
let n_font_family = font_family;
let n_line_height = line_height;
let n_font_weight = font_weight;

export default {
  color: {
    ...color,
    red: {
      ...color.red,
      primary: "#91272b"
    }
  },
  // fonts: font_family,
  // font_face: font_face,
  spacing,
  brand_color,
  button: spacing.button,
  font: [n_font_family, n_font_size, n_line_height, n_font_weight],
  font_size: n_font_size,
  line_height: n_line_height,
  appearances: [
    "default",
    "secondary",
    "gray",
    "subtle",
    "orange",
    "green",
    "outline"
  ]
  // borders: {
  //   border_color,
  //   border_radius,
  //   focus_states,
  //   border_thickness
  // },
  // shadows: box_shadow,
  // breakpoints,
  // // custom
  // z_index
};
