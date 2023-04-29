import { MapTitleChoices } from "../utils/types";
import {
  accessoryChoices,
  ipadChoices,
  iphoneChoices,
  macChoices,
  soundChoices,
  watchChoices,
} from "./choices";

export const mapTitleChoices: MapTitleChoices[] = [
  { title: "iPhone", choices: iphoneChoices, goTo: "/iphone" },
  { title: "iPad", choices: ipadChoices, goTo: "/ipad" },
  { title: "Mac", choices: macChoices, goTo: "/mac" },
  { title: "Watch", choices: watchChoices, goTo: "/apple-watch" },
  { title: "Âm thanh", choices: soundChoices, goTo: "/sound" },
  { title: "Phụ kiện", choices: accessoryChoices, goTo: "/accessory" },
];
