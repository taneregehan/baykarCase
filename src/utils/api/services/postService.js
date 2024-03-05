import apiInstance from "../apiInstance";

export const getPosts = () => {
  return apiInstance.get(`/posts`);
};
