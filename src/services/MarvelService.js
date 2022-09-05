import { useCallback } from 'react';
import useHttp from '../hooks/http-hook';

const useMarvelService = () => {
  const { loading, error, getResourse, clearError } = useHttp();

  const _url = 'https://gateway.marvel.com:443/v1/public/characters';
  const _apiKey = 'apikey=70b306b1048a409e977894c03637b4a3';
  const _baseOffset = 210;

  const getAllCharacters = useCallback(
    (offset = _baseOffset) => {
      return getResourse(`${_url}?limit=9&offset=${offset}&${_apiKey}`).then(
        (res) => res.data.results.map((char) => _transformData(char))
      );
    },
    [getResourse]
  );

  const getCharacter = useCallback(
    (id) => {
      return getResourse(`${_url}/${id}?${_apiKey}`).then((res) => {
        return _transformData(res.data.results[0]);
      });
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

  return { loading, error, getAllCharacters, getCharacter, clearError };
};

export default useMarvelService;
