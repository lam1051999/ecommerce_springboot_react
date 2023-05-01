import PageContainer from "../components/common/PageContainer";
import { useGetCustomerInfosQuery } from "../redux/api/userApi";

export default function CustomerInfos() {
  const { data, error, isLoading } = useGetCustomerInfosQuery();

  return (
    <PageContainer>
      <div>{JSON.stringify(data)}</div>
    </PageContainer>
  );
}
