import { useState } from "react";
import { ChoiceItem } from "./types";
import { AiOutlineDown } from "react-icons/ai";
import { dropdownChoices } from "../../constants/choices";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import {
  onChangePage,
  onChangeProductSubType,
  onChangeProductType,
  onChangeSortType,
} from "../../redux/slices/choiceBarSlice";
import { getChosenOptionId } from "../../utils/helper";
import { SortType } from "../../redux/types/types";

type ChoiceBarProps = {
  choices: ChoiceItem[];
};

export default function ChoiceBar({ choices }: ChoiceBarProps) {
  const productType = useAppSelector((state) => state.choiceBar.productType);
  const productSubType = useAppSelector(
    (state) => state.choiceBar.productSubType
  );
  const dispatch = useAppDispatch();
  function getChoiceByProductTypeAndProductSubType(
    productType: string,
    productSubType: string | null
  ) {
    const found = choices.find(
      (item) =>
        item.productType === productType &&
        item.productSubType === productSubType
    );
    return found ? found : choices[0];
  }
  function getChoiceByActionValue(actionValue: string) {
    const found = choices.find((item) => item.actionValue === actionValue);
    return found ? found : choices[0];
  }

  return (
    <div className="flex items-center justify-between w-full my-6">
      <ul className="flex items-center w-3/4 overflow-x-auto pb-4">
        {choices.map((choice, index) => (
          <li
            key={index}
            className={`mr-10 text-sm cursor-pointer font-semibold leading-10 whitespace-nowrap ${
              getChoiceByProductTypeAndProductSubType(
                productType,
                productSubType
              )
                ? getChoiceByProductTypeAndProductSubType(
                    productType,
                    productSubType
                  ).actionValue === choice.actionValue
                  ? "text-blue-700 shadow-[0px_2px_0px_0px_#1d4ed8]"
                  : "text-gray-800"
                : "text-gray-800"
            }`}
            onClick={() => {
              const validChoice = getChoiceByActionValue(choice.actionValue);
              dispatch(onChangeProductType(validChoice.productType));
              dispatch(onChangeProductSubType(validChoice.productSubType));
            }}
          >
            {choice.name}
          </li>
        ))}
      </ul>
      <div className="relative w-1/6">
        <div className="relative text-gray-700 w-full">
          <select
            onChange={(event) => {
              dispatch(
                onChangeSortType(
                  getChosenOptionId<SortType>(
                    event,
                    dropdownChoices[0].actionValue
                  )
                )
              );
              dispatch(onChangePage(0));
            }}
            name="sortTypeName"
            className="appearance-none p-3 w-full border border-gray-300 rounded bg-white h-12 mt-2 mb-4"
          >
            {dropdownChoices.map((item, index) => (
              <option key={index} id={item.actionValue}>
                {item.name}
              </option>
            ))}
          </select>
          <AiOutlineDown
            size={15}
            className="absolute right-3 top-1/2 -translate-y-2"
          />
        </div>
      </div>
    </div>
  );
}
