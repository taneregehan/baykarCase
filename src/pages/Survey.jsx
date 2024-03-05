import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Div, P, Touchable } from "../helpers/StyledElements";
import useApiCall from "../hooks/useApiCall";
import { getPosts } from "../utils/api/services/postService";
import { ChevronLeft, HomeIcon } from "../helpers/GeneralIcons";
import ProgressBar from "../components/ProgressBar";
import { useNavigation } from "@react-navigation/native";

export default function Survey() {
  const { apiCall } = useApiCall();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, [questions]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const getData = async () => {
    try {
      const response = await apiCall({ service: getPosts });
      const extractedQuestions = extractQuestions(response);
      setQuestions(extractedQuestions.splice(0, 10));
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  const extractQuestions = (data) => {
    return data?.map((post, index) => ({
      id: index + 1,
      question: post?.title,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions?.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const renderItem = ({ item }) => {
    if (questions[currentIndex]?.id === item?.id) {
      return (
        <Div styles="center">
          <P>{item?.question}</P>
        </Div>
      );
    }
    return null;
  };

  const minutesLeft = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft % 60;
  const text = `${minutesLeft} : ${secondsLeft} `;
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
            <ProgressBar showCounts counts={text} ratio={timeLeft / (30 * 60)} barColor="white" />
          </Div>
        </Div>

        <Div styles="flex-1 row gap-4 items-center ">
          <Div styles="w-295 h-5">
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
      </Div>
    </Div>
  );
}
