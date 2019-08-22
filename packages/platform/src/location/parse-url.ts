import * as url from 'url';

import { Location } from './location.interface';

export function parseUrl(urlStr: string): Location {
  const parsedUrl = url.parse(urlStr);

  return {
    hostname: parsedUrl.hostname || '',
    protocol: parsedUrl.protocol || '',
    port: parsedUrl.port || '',
    pathname: parsedUrl.pathname || '',
    search: parsedUrl.search || '',
    hash: parsedUrl.hash || '',
  };
}
