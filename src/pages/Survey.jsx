import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Div, P, Touchable } from "../helpers/StyledElements";
import { ChevronLeft, HomeIcon } from "../helpers/GeneralIcons";
import ProgressBar from "../components/ProgressBar";
import { useNavigation } from "@react-navigation/native";
import { useSurvey } from "../hooks/SurveyContext";
import EmojiComponent from "../components/EmojiComponent";
import { format } from "date-fns";
export default function Survey() {
  const { questions, currentIndex, handleNext, handlePrev, text, timeLeft, setCurrentIndex } =
    useSurvey();
  const navigation = useNavigation();
  const [selectedOptions, setSelectedOptions] = useState({}); // Seçilen cevapları saklayacak obje
  const [surveyCompleted, setSurveyCompleted] = useState(false); // Anketin tamamlanıp tamamlanmadığını belirleyen state

  useEffect(() => {
    const lastAnsweredQuestionIndex = getLastAnsweredQuestionIndex();
    handleStartFromQuestion(lastAnsweredQuestionIndex);
  }, []);

  const getLastAnsweredQuestionIndex = () => {
    return null;
  };

  const handleStartFromQuestion = (index) => {
    if (index !== null) {
      setCurrentIndex(index);
    }
  };

  const renderItem = ({ item }) => {
    if (questions[currentIndex]?.id === item?.id) {
      return (
        <Div styles="center">
          <P styles="font">{item?.question}</P>
        </Div>
      );
    }
    return null;
  };

  const handleAnswer = (answer) => {
    if (questions[currentIndex] && currentIndex >= 0) {
      // Seçilen şıkkı state'e ekleyelim
      setSelectedOptions((prevState) => ({
        ...prevState,
        [questions[currentIndex].id]: answer,
      }));
    }
  };

  const calculateResults = () => {
    let correctCount = 0;
    let wrongCount = 0;
    let emptyCount = 0;

    questions.forEach((question) => {
      const selectedAnswer = selectedOptions[question.id];
      const correctOption = mockQuestions.options.find((option) => option.isCorrect);

      if (!selectedAnswer) {
        emptyCount++;
      } else if (selectedAnswer === correctOption.text) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    return { correctCount, wrongCount, emptyCount };
  };

  const mockQuestions = {
    id: 1,
    questionType: ["interaction", "options", "wrappedText"],
    options: [
      { text: "A", isCorrect: false },
      { text: "B", isCorrect: false },
      { text: "C", isCorrect: true },
      { text: "D", isCorrect: false },
    ],
  };

  if (currentIndex === 9) {
    const { correctCount, wrongCount, emptyCount } = calculateResults();
    return (
      <Div styles="center absolute top-400 bg-disabledLight bordered-1 ph-30 pv-40 rounded-10 contentCenter gap-10">
        <P styles="font">Anket Bitti</P>
        <Touchable
          onPress={() =>
            navigation.navigate("SurveyResults", {
              correct: correctCount,
              false: wrongCount,
              emptyCount: emptyCount,
              total: correctCount + wrongCount + emptyCount,
              date: format(new Date(), "dd.MM.yyyy HH:mm"),
            })
          }>
          <P styles="c-success font"> Sonuçlara Git</P>
        </Touchable>
        <P>Doğru: {correctCount}</P>
        <P>Yanlış: {wrongCount}</P>
        <P>Boş: {emptyCount}</P>
      </Div>
    );
  }

  return (
    <Div styles="flexBox pv-50 gap-20">
      <Div styles="h-171 w-390 bg-#0300A3 ph-20 pv-20 gap-70 roundBottomLeft-40 roundBottomRight-40">
        <Div styles="row between ">
          <Touchable
            onPress={() => navigation.navigate("Dashboard")}
            styles="bg-white w-40 h-40 contentCenter rounded-40 ">
            <HomeIcon size={30} color="#0300A3" />
          </Touchable>
          <Div styles="w-140 h-30">
            <ProgressBar
              showCounts
              counts={text}
              ratio={timeLeft / (30 * 60)}
              barColor="interaction"
            />
          </Div>
        </Div>

        <Div styles="flex-1 row gap-4 items-center ">
          <Div styles="w-295 h-5 ">
            <ProgressBar
              barColor="white"
              ratio={
                questions.length > 0 && questions[currentIndex]?.id
                  ? questions[currentIndex]?.id / questions.length
                  : 0
              }
            />
          </Div>

          {questions.length > 0 && <P styles="c-white font">{questions[currentIndex]?.id}/</P>}
          <P styles="c-disabled font">{questions.length} </P>
        </Div>
      </Div>
      {currentIndex === 0 && <EmojiComponent />}
      <FlatList
        data={questions && [questions[currentIndex]]}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id?.toString()}
      />
      <Div styles="row between absolute bottom-200 items-center center gap-20 ">
        <Touchable onPress={handlePrev} disabled={currentIndex === 0}>
          <ChevronLeft />
        </Touchable>
        <Touchable
          styles="bg-red w-142 h-40 bg-#0300A3 rounded-5 contentCenter"
          disabled={currentIndex === questions?.length - 1}
          onPress={handleNext}>
          <P styles="c-white font">İleri</P>
        </Touchable>
        {currentIndex !== 0 &&
          mockQuestions.options.map((ques) => {
            return (
              <Touchable
                key={ques.text}
                onPress={() => handleAnswer(ques.text)}
                styles={`w-20 h-30 contentCenter rounded-10 bg-${
                  selectedOptions[questions[currentIndex].id] === ques.text
                    ? "selected"
                    : "disabled"
                }`}>
                <P styles="c-white">{ques.text}</P>
              </Touchable>
            );
          })}
      </Div>
    </Div>
  );
}
