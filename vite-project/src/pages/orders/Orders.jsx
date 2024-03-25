import { useQuery } from '@tanstack/react-query';
import SortTable from '../../components/sortTable/SortTable'
import newRequest from '../../utils/newRequest';

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });
  return (
    <div className='container'>
    <p className="fs-1 text-start fw-bold">Narudžbe:</p>
    {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
    <SortTable newData={data} />)}</div>
  )
}

export default Orders