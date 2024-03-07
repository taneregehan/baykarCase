// SurveyContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import { Div, P, Touchable } from "../helpers/StyledElements";
import useApiCall from "../hooks/useApiCall";
import { getPosts } from "../utils/api/services/postService";
import { ChevronLeft, HomeIcon } from "../helpers/GeneralIcons";
import ProgressBar from "../components/ProgressBar";

const SurveyContext = createContext();

export const useSurvey = () => useContext(SurveyContext);

export const SurveyProvider = ({ children }) => {
  const { apiCall } = useApiCall();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // setCurrentIndex fonksiyonunu burada sağlıyoruz
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, []);

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
  }, []);

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

  const minutesLeft = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft % 60;
  const text = `${minutesLeft} : ${secondsLeft} `;

  const value = {
    questions,
    currentIndex,
    setCurrentIndex, // setCurrentIndex'i value objesine ekliyoruz
    handleNext,
    handlePrev,
    text,
  };

  return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>;
};
