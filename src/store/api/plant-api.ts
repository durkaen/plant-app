import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CategoriesResponse, QuestionsResponse } from '@/types/api';

const BASE_URL = 'https://dummy-api-jtg6bessta-ey.a.run.app';

export const plantApi = createApi({
  reducerPath: 'plantApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => '/getCategories',
    }),
    getQuestions: builder.query<QuestionsResponse, void>({
      query: () => '/getQuestions',
    }),
  }),
});

export const { useGetCategoriesQuery, useGetQuestionsQuery } = plantApi;
