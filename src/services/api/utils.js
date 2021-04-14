const objectToQueryParams = (data) => {
  let query = '';
  if (data) {
    query = Object.entries(data)
      .filter((e) => e[1] !== undefined && e[1] !== '')
      .map((e) => `${e[0]}=${e[1]}`)
      .join("&");
    if (query !== '') {
      query = `?${query}`;
    } 
  }
  return query;
}

export { objectToQueryParams }