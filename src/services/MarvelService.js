import { useCallback } from 'react';
import useHttp from '../hooks/http-hook';

const useMarvelService = () => {
  const { loading, error, getResourse, clearError } = useHttp();

  const _urlChars = 'https://gateway.marvel.com:443/v1/public/characters';
  const _apiKey = 'apikey=70b306b1048a409e977894c03637b4a3';
  const _baseOffset = 210;

  const _urlComics = 'https://gateway.marvel.com:443/v1/public/comics';
  const _baseComicsOffset = 0;

  const getAllCharacters = useCallback(
    (offset = _baseOffset) => {
      return getResourse(
        `${_urlChars}?limit=9&offset=${offset}&${_apiKey}`
      ).then((res) => res.data.results.map((char) => _transformData(char)));
    },
    [getResourse]
  );

  const getCharacter = useCallback(
    (id) => {
      return getResourse(`${_urlChars}/${id}?${_apiKey}`).then((res) => {
        return _transformData(res.data.results[0]);
      });
    },
    [getResourse]
  );

  const getAllComics = useCallback(
    async (offset = _baseComicsOffset) => {
      return getResourse(
        `${_urlComics}?orderBy=-issueNumber&limit=8&offset=${offset}&${_apiKey}`
      ).then((res) => {
        return res.data.results.map((comics) => _transformComicsData(comics));
      });
    },
    [getResourse]
  );

  const getComics = useCallback(
    async (comicsId) => {
      return getResourse(`${_urlComics}/${comicsId}?${_apiKey}`).then((res) =>
        _transformComicsData(res.data.results[0])
      );
    },
    [getResourse]
  );

  const _transformData = (charData) => {
    return {
      id: charData.id,
      name: charData.name,
      description: charData.description
        ? charData.description.slice(0, 210)
        : 'Sorry, no information about this character',
      thumbnail: charData.thumbnail.path + '.' + charData.thumbnail.extension,
      homepage: charData.urls[0].url,
      wiki: charData.urls[1].url,
      comics: charData.stories.items,
    };
  };

  const _transformComicsData = (comicsData) => {
    return {
      id: comicsData.id,
      title: comicsData.title,
      price: comicsData.prices[0].price
        ? `${comicsData.prices[0].price}$`
        : 'not available',
      thumbnail:
        comicsData.thumbnail.path + '.' + comicsData.thumbnail.extension,
      homepage: comicsData.urls[0].url,
      description: comicsData.description || 'There is no description',
      pageCount: comicsData.pageCount
        ? `${comicsData.pageCount} p.`
        : 'No information about the number of pages',
      language: comicsData.textObjects.language || 'en-us',
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    clearError,
    getAllComics,
    getComics,
  };
};

export default useMarvelService;
