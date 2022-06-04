// import { EksportSettings } from './../../models/eksportSettings';
// import { FilterQueries } from '../../app/utils/filter';
// import { PaginatedResult } from '../../models/paginatedResult';
// import { client } from '../client';
// import { FetchArg } from '../rtk-queries/queryApiCreator';
import React from "react";

// export type NextPageParam = FetchArg<unknown> & {
//     endpoint: string,
// };
// export default class RequestService<T, U extends string> {
//     serviceName: string;
//     typeName: U;
//     capitalizeTypeName: Capitalize<U>;

//     constructor(serviceName: string & U) {
//         this.serviceName = serviceName;
//         this.typeName = serviceName.toLowerCase() as U;
//         this.capitalizeTypeName = (serviceName.charAt(0).toUpperCase() + serviceName.slice(1)) as Capitalize<U>;
//     }
//     fetch = async (pageUrl?: string) => client.get<PaginatedResult<T>>(pageUrl ?? this.serviceName);
//     filter = async (filter?: FilterQueries, query?: string, pageUrl?: string,) => client.post<PaginatedResult<T>>(pageUrl ?? `${this.serviceName}/filter?q=${query}`, filter);
//     getById = async (id: string | number) => client.get<T>(`${this.serviceName}/${id}`);
//     init = async () => client.get<T>(`${this.serviceName}/init`);
//     plainSearch = async (query: string) => client.get<PaginatedResult<T>>(`${this.serviceName}?disablePagination=true&q=${encodeURIComponent(query)}`);
//     plainPaginatedSearch = async (query: string) => client.get<PaginatedResult<T>>(`${this.serviceName}?q=${query}`);
//     search = async (query: T | Partial<T>, pageUrl?: string) => client.post<PaginatedResult<T>>(pageUrl ?? `${this.serviceName}/Search`, query);
//     create = async (item: T) => client.post<T>(`${this.serviceName}`, item);
//     update = async (id: string | number, item: T) => client.post<T>(`${this.serviceName}/${id}`, item);
//     loadEksport = async (eksportSettings: EksportSettings<T>) => await client.getFile(`${this.serviceName}/eksport`, 'POST', eksportSettings);
//     delete = async (id: string | number) => client.delete<void>(`${this.serviceName}/${id}`);
//     get getNextPage() {
//         return (param: Omit<NextPageParam, 'endpoint'>) => getNextPageURL({ endpoint: this.serviceName, ...param });
//     }
// }


// export const getNextPageURL = ({ endpoint, param, disablePagination, query }: NextPageParam, queryParams?: { [key: string]: string; }) => {
//     const { ascending = typeof param?.orderColumn === 'string' ? true : undefined } = param ?? {};

//     return getQueryURL(endpoint, { ...param, ascending, q: query, disablePagination, ...queryParams });
// };

// export const getQueryURL = (endpoint: string, params?: object) => {
//     let searchParams = new URLSearchParams();

//     if (params) {
//         for (const [key, value] of Object.entries(params)) {
//             if (value != null) searchParams.set(key, value);
//         }
//     }

//     const url = searchParams.toString().length > 0 ? `${endpoint}?${searchParams.toString()}` : endpoint;
//     return url;
// };