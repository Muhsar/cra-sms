import { useQuery } from 'react-query';
import { getRequest } from './apiCall';
const query = (key, param, url, enabled) => {
  const {data} = useQuery(
    [key, param],
    async () => await getRequest({ url }),
    {
      retry: 2,
      enabled: !!enabled,
      onError(data){
        alert(data)
      }
    }
    )
    return data
}
export default query