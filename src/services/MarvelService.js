class MarvelService {
  _url = 'https://gateway.marvel.com:443/v1/public/characters';
  _apiKey = 'apikey=70b306b1048a409e977894c03637b4a3';
  _baseOffset = 210;

  getResourse = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Could not fetch data from url: ${url}, status: ${res.status}`
      );
    }

    const data = await res.json();

    return data;
  };

  getAllCharacters = (offset = this._baseOffset) => {
    return this.getResourse(
      `${this._url}?limit=9&offset=${offset}&${this._apiKey}`
    ).then((res) => res.data.results.map((char) => this._transformData(char)));
  };

  getCharacter = (id) => {
    return this.getResourse(`${this._url}/${id}?${this._apiKey}`).then((res) =>
      this._transformData(res.data.results[0])
    );
  };

  _transformData = (charData) => {
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
}

export default MarvelService;
