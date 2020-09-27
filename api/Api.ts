class Api {
  private readonly baseUrl = 'https://api.thecatapi.com/v1';
  private readonly headers = {
    'x-api-key': '3fff7141-ec87-42e8-9cbf-008bb8bb62c9',
  };

  // Don't use params with special characters like space colon and etc.
  private readonly get = (path: string, params?: {[key: string]: string}) => {
    let searchParams = '';
    if (params) {
      searchParams = Object.keys(params).reduce(
        (urlSearchParams, paramKey) =>
          `${urlSearchParams}${
            urlSearchParams.length > 1 ? '&' : ''
          }${paramKey}=${params[paramKey]}`,
        '?',
      );
    }
    const url = new URL(`${this.baseUrl}${path}${searchParams}`);
    return fetch(url.toString(), {
      headers: this.headers,
    });
  };

  readonly fetchCategories = () => this.get('/categories');
  readonly fetchImages = (categoryId: string, page = 0) =>
    this.get('/images/search', {
      category_ids: categoryId,
      limit: '10',
      page: page.toString(),
    });
}

export const api = new Api();
