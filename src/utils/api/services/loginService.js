import apiInstance from "../apiInstance";

export const getUser = () => {
  return apiInstance.get(`/users`);
};
