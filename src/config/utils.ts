/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { intersection } from 'lodash';
import jwt_decode from 'jwt-decode';

const token : {groups: any[]} = localStorage?.token && jwt_decode(localStorage?.token)
const {groups} = token
export function isArrayWithLength(arr) {
 return (Array.isArray(arr) && arr.length)
}

export function getAllowedRoutes(routes) {
 return routes.filter(({ permission }) => {
  if(!permission) return true;
  else if(!isArrayWithLength(permission)) return true;
  else return intersection(permission, groups).length;
 });
}