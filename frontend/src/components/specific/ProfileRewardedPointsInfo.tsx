import CustomerInfosContainer from "./CustomerInfosContainer";

export default function ProfileRewardedPointsInfo() {
  const mainContent = (
    <div className="p-4 bg-white rounded-lg">
      <p className="text-sm text-gray-500 mb-4">
        Số dư hiện tại của bạn là 0 điểm thưởng.
      </p>
      <p className="text-sm text-gray-500">Chưa có lịch sử cân bằng nào</p>
    </div>
  );

  return <CustomerInfosContainer mainContent={mainContent} />;
}
