import { UrlObject } from 'url';

export type Location = Required<Pick<UrlObject, 'hostname' | 'protocol' | 'port' | 'pathname' | 'search' | 'hash'>>;
