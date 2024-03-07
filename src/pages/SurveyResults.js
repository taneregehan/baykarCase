import React from "react";
import { Div, P } from "../helpers/StyledElements";
import { useLocalSearchParams } from "expo-router";
import { CalendarIcon } from "../helpers/GeneralIcons";

export default function SurveyResults() {
  const result = useLocalSearchParams();

  const total = result?.total;
  const correct = result?.correct;
  const resultValue = (100 / total) * correct;

  return (
    <Div styles="flexBox pt-100 gap-40">
      <Div styles="center  contentCenter gap-10 ">
        <P styles="font size-15">Anket Sonuçları</P>
        <Div styles="w-300 h-120 row  gap-10">
          <Div styles="flex-1">
            <P styles="font size-40 text-center c-#0300A3"> {result?.total}</P>
            <P styles="font size-16 text-center ">Yanlış</P>
          </Div>
          <Div styles="w-1 h-65 bg-stroke" />
          <Div styles="flex-1.2ph-4 ">
            <P styles="font size-40 text-center c-#0300A3"> {result?.correct}</P>
            <P styles="font size-16 text-center ">Doğru</P>
          </Div>
          <Div styles="w-1 h-65 bg-stroke" />
          <Div styles="flex-1.2">
            <P styles="font size-40 text-center c-#0300A3 "> {result?.false}</P>
            <P styles="font size-16 text-center ">Yanlış</P>
          </Div>
          <Div styles="w-1 h-65 bg-stroke" />
          <Div styles="flex-1">
            <P styles="font size-40 text-center c-#0300A3"> {result?.emptyCount}</P>
            <P styles="font size-16 text-center ">Boş</P>
          </Div>
        </Div>
      </Div>
      <Div styles="bg-disabledLight w-300 h-120 center rounded-5 ph-14 pv-14 gap-5 ">
        <P styles="font c-#0300A3">Anket</P>
        <Div styles="row gap-10 items-center">
          <CalendarIcon size={15} />
          <P styles="font c-#0300A3 size-11">{result.date}</P>
        </Div>
        <Div styles="absolute right-10 bottom-10 bg-#0300A3 w-100  h-30 rounded-10 contentCenter ">
          <P styles="font c-white">{"Modunuz" + " " + resultValue}</P>
        </Div>
      </Div>
    </Div>
  );
}
