import { useEffect, useState } from "react";

type apiCallProps = {
  /**
   * Service function
   */
  service: Function;
  /**
   * Service parameters
   */
  params?: any | null;
  /**
   * Function that will be executed when an error occurred
   */
  onError?: Function;
  /**
   * Function that will be executed when service function complated successfully occurred
   */
  onSuccess?: Function;
};

export const apiCaller = async (props: apiCallProps) => {
  return props
    .service(props.params)
    .then(async (response: any) => {
      if (props?.onSuccess) {
        await props.onSuccess(response?.data);
      }
      return response.data;
    })
    .catch(async (error: any) => {
      if (props.onError) {
        await props.onError(error);
      }
      return error;
    });
};

const useApiCall = (initialLoadingStatus?: boolean) => {
  const [serviceLoad, setServiceLoad] = useState(initialLoadingStatus);

  const apiCall = async (props: apiCallProps) => {
    setServiceLoad(true);
    return apiCaller(props).finally(() => setServiceLoad(false));
  };

  return { serviceLoad, setServiceLoad, apiCall };
};

export default useApiCall;
