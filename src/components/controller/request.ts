import { TRaceCarResponse, ICar, TWinnerCarResponse } from '../types';
import { defaultServerAddress, selectParametrsRequest } from '../variables';

export const getPage = (page: number, limit: number): Promise<TRaceCarResponse> => {
  return fetch(`${defaultServerAddress}/garage?_page=${page}&_limit=${limit}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
};

export const getCarCount = (): Promise<number> => {
  return fetch(`${defaultServerAddress}/garage?_limit`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      return response.length;
    });
};

export const getWinnerCarCount = (): Promise<number> => {
  return fetch(`${defaultServerAddress}/winners?_limit`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      return response.length;
    });
};

export const getSingleCar = (id: number): Promise<ICar> => {
  return fetch(`${defaultServerAddress}/garage/${id}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
};

export const carRemoveRequest = (id: number) => {
  return fetch(`${defaultServerAddress}/garage/${id}`, {
    method: 'DELETE',
  });
};

export const carUpdateRequest = (carColor: string, carName: string, id: number) => {
  return fetch(`${defaultServerAddress}/garage/${id}`, {
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
  return fetch(`${defaultServerAddress}/garage`, {
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

export const startEngine = async (id: number) => {
  return fetch(`${defaultServerAddress}/engine?id=${id}&status=started`, {
    method: 'PATCH',
  });
};

export const driveCar = async (id: number, controller: AbortController) => {
  return fetch(`${defaultServerAddress}/engine?id=${id}&status=drive`, {
    method: 'PATCH',
    signal: controller.signal,
  });
};

export const stopEngine = async (id: number) => {
  return fetch(`${defaultServerAddress}/engine?id=${id}&status=stopped`, {
    method: 'PATCH',
  });
};

export const getWinner = async (id: number): Promise<Response> => {
  return fetch(`${defaultServerAddress}/winners/${id}`, {
    method: 'GET',
  });
};

export const addWinner = async (carId: number, carRime: number) => {
  return fetch(`${defaultServerAddress}/winners`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: carId,
      wins: 1,
      time: carRime,
    }),
  });
};

export const updateWinner = async (carId: number, winCount: number, carRime: number) => {
  return fetch(`${defaultServerAddress}/winners/${carId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      wins: winCount,
      time: carRime,
    }),
  });
};

export const getWinnersList = async (page: number, limit: number, filterParam: number): Promise<TWinnerCarResponse> => {
  return fetch(`${defaultServerAddress}/winners?_page=${page}&_limit=${limit}${selectParametrsRequest[filterParam]}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
};

export const deleteWinnerCar = async (carId: number) => {
  return fetch(`${defaultServerAddress}/winners/${carId}`, {
    method: 'DELETE',
  });
};
