import { TRaceCarResponse } from '../types';

export const getPage = (page: number, limit: number): Promise<TRaceCarResponse> => {
  return fetch(`http://127.0.0.1:3000/garage?_page=${page}&_limit=${limit}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
};

export const carRemoveRequest = (id: number) => {
  return fetch(`http://127.0.0.1:3000/garage/${id}`, {
    method: 'DELETE',
  });
};

export const carUpdateRequest = (carColor: string, carName: string, id: number) => {
  return fetch(`http://127.0.0.1:3000/garage/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: carName,
      color: carColor,
    }),
  });
};

export const carCreateRequest = (carName: string, carColor: string) => {
  return fetch('http://127.0.0.1:3000/garage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: carName,
      color: carColor,
    }),
  });
};
