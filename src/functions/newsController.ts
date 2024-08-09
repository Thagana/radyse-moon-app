import Server from "../service/server";

/**
 *
 * @param page the page number of the request
 * @param size the size of the data response
 * @returns Promise<boolean, any[]>
 */
export const getAllNews = async (page: number, size: number) => {
  try {
    const response = await Server.getAllNews(page, size);
    if (response.status === 200) {
      const responseData = response.data;
      const { data, success } = responseData;

      if (success) {
        return {
          success: true,
          data,
        };
      }
      return {
        success: false,
        data: [],
      };
    }

    return {
      success: false,
      data: [],
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
    };
  }
};

export const getSearchedNews = async (query: string) => {
  const response = await Server.searchNews(query);
  return response;
};

export const headLineNews = () => {
  return new Promise<{ data: any[]; success: boolean }>((resolve, reject) => {
    Server.headlines()
      .then((response) => {
        const { data, success } = response.data;
        resolve({ data, success });
      })
      .catch((error) => reject(error));
  });
};
