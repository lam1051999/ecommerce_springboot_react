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

type ChoiceBarProps = {
  choices: ChoiceItem[];
};

export default function ChoiceBar({ choices }: ChoiceBarProps) {
  const productType = useAppSelector((state) => state.choiceBar.productType);
  const productSubType = useAppSelector(
    (state) => state.choiceBar.productSubType
  );
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const sortType = useAppSelector((state) => state.choiceBar.sortType);
  const dispatch = useAppDispatch();

  function getNameByActionValue(actionValue: string) {
    return dropdownChoices.filter((item) => item.actionValue === actionValue)[0]
      .name;
  }
  function getChoiceByProductTypeAndProductSubType(
    productType: string,
    productSubType: string | null
  ) {
    return choices.filter(
      (item) =>
        item.productType === productType &&
        item.productSubType === productSubType
    )[0];
  }
  function getChoiceByActionValue(actionValue: string) {
    return choices.filter((item) => item.actionValue === actionValue)[0];
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
        <button
          className="text-gray-700 w-full flex items-center justify-between border border-gray-300 rounded bg-white px-6 py-2"
          onClick={() => setIsOpenDropdown((prevState) => !prevState)}
        >
          <span className="pr-2">{getNameByActionValue(sortType)}</span>
          <AiOutlineDown />
        </button>
        <div
          className={`absolute z-10 bg-white rounded-lg shadow w-full ${
            isOpenDropdown ? "block" : "hidden"
          }`}
        >
          <ul className="py-2 text-sm text-gray-700">
            {dropdownChoices.map((item, index) => (
              <li
                className="cursor-pointer px-4 py-2 hover:bg-gray-600 hover:text-white"
                key={index}
                onClick={() => {
                  dispatch(onChangeSortType(item.actionValue));
                  dispatch(onChangePage(0));
                  setIsOpenDropdown(false);
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
