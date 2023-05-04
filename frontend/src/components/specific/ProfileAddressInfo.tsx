import { useGetProvincesAndShopsQuery } from "../../redux/api/addressApi";
import {
  useDeleteCustomerShipAddressesMutation,
  useGetCustomerShipAddressesQuery,
} from "../../redux/api/userApi";
import CustomerInfosContainer from "./CustomerInfosContainer";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import AddressesCreateForm from "./AddressesCreateForm";
import { DEFAULT_DISTRICT, DEFAULT_PROVINCE } from "../../pages/ShoppingCart";
import { Link } from "react-router-dom";

export const formInitialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  province: DEFAULT_PROVINCE,
  district: DEFAULT_DISTRICT,
  exactAddress: "",
};

export type AddressesFormInitialValues = {
  name: string;
  email: string;
  phoneNumber: string;
  province: string;
  district: string;
  exactAddress: string;
};

export type AddAddressFormikError = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  province?: string;
  district?: string;
  exactAddress?: string;
};

export default function ProfileAddressInfo() {
  const { data: provincesAndShopsData } = useGetProvincesAndShopsQuery();
  const {
    data: getAddressesData,
    error: getAddressesError,
    isLoading: getAddressesIsLoading,
  } = useGetCustomerShipAddressesQuery();
  const [
    deleteCustomerShipAddresses,
    {
      isError: deleteAddressesIsError,
      isSuccess: deleteAddressesIsSuccess,
      error: deleteAddressesError,
      data: deleteAddressesData,
      isLoading: deleteAddressesIsLoading,
    },
  ] = useDeleteCustomerShipAddressesMutation();
  const [isCreatingAddresses, setIsCreatingAddresses] = useState(false);

  async function handleDeleteAddresses(id: string) {
    const confirmDelete = confirm("Bạn có chắc không?");
    if (confirmDelete) {
      await deleteCustomerShipAddresses(id)
        .unwrap()
        .then(() => {
          alert("Xoá địa chỉ thành công");
        })
        .catch(() => {
          alert("Xoá địa chỉ thất bại");
        });
    }
  }

  const mainContent = (
    <div className="w-full overflow-hidden">
      <div
        className="grid grid-cols-2 w-[200%] transition-transform duration-500 ease-in-out"
        style={{
          transform: isCreatingAddresses ? "translateX(-50%)" : "translateX(0)",
        }}
      >
        <div className="w-full">
          {getAddressesError || getAddressesIsLoading ? (
            <div className="w-full animate-pulse">
              <div className="w-full bg-gray-300 mb-2 h-[15vh]" />
              <div className="w-full bg-gray-300 mb-2 h-[15vh]" />
            </div>
          ) : getAddressesData ? (
            getAddressesData.data.length === 0 ? (
              <div className="w-full h-full p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-500">Không có địa chỉ</p>
                <button
                  onClick={() => setIsCreatingAddresses(true)}
                  className="block my-4 rounded-lg w-36 text-white text-sm h-[40px] mx-auto bg-blue-700 hover:bg-blue-500"
                >
                  Thêm mới
                </button>
              </div>
            ) : (
              <div className="w-full">
                {getAddressesData.data.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 divide-y mb-5 p-4 bg-white rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 text-[15px]">
                        <FaMapMarkerAlt size={15} />
                        <p>Địa chỉ</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Link
                          to={`/customer-infos/ship-addresses/edit/${item.id}`}
                        >
                          <button className="rounded w-24 h-[30px] text-white text-sm bg-blue-700 hover:bg-blue-500 flex items-center justify-center space-x-1">
                            <MdEdit size={18} />
                            <span>Sửa</span>
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteAddresses(item.id)}
                          className="rounded w-24 h-[30px] text-sm flex items-center justify-center space-x-1 bg-transparent text-[#FA5B46] border border-[#FA5B46]"
                        >
                          <FaTrashAlt size={15} />
                          <span>Xóa</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1 mb-2 mt-4">
                        <span className="text-gray-500">Tên:</span>
                        <span>{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-1 my-2">
                        <span className="text-gray-500">Email:</span>
                        <span>{item.email}</span>
                      </div>
                      <div className="flex items-center space-x-1 my-2">
                        <span className="text-gray-500">Số điện thoại:</span>
                        <span>{item.phone_number}</span>
                      </div>
                      <div className="flex items-center space-x-1 mt-2 mb-4">
                        <span className="text-gray-500">Địa chỉ:</span>
                        <span>{item.exact_address}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setIsCreatingAddresses(true)}
                  className="block my-4 rounded-lg w-36 text-white text-sm h-[40px] mx-auto bg-blue-700 hover:bg-blue-500"
                >
                  Thêm mới
                </button>
              </div>
            )
          ) : (
            <div className="w-full animate-pulse">
              <div className="w-full bg-gray-300 mb-2 h-[15vh]" />
              <div className="w-full bg-gray-300 mb-2 h-[15vh]" />
            </div>
          )}
        </div>
        <AddressesCreateForm
          provincesAndShopsData={provincesAndShopsData}
          setIsCreatingAddresses={setIsCreatingAddresses}
        />
      </div>
    </div>
  );

  return <CustomerInfosContainer mainContent={mainContent} />;
}
