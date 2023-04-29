import { ChoiceItem } from "../components/common/types";

export type MapTitleChoices = {
  title: string;
  choices: ChoiceItem[];
  goTo: string;
};

export type MapTitlePreviewChoice = {
  title: string;
  choice: ChoiceItem;
  goTo: string;
};
