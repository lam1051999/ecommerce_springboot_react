import { useState } from "react";
import CustomerInfosContainer from "./CustomerInfosContainer";
import {
  useUpdateCustomerAvatarMutation,
  useGetCustomerAvatarQuery,
  useDeleteCustomerAvatarMutation,
} from "../../redux/api/userApi";
import { getFullPathImage } from "../../utils/helper";
import { CustomBaseQueryError } from "../../redux/types/types";
import { AiOutlineLoading } from "react-icons/ai";

export default function ProfileAvatarInfo() {
  const [avatarFile, setAvatarFile] = useState<File>();
  const [
    createAvatar,
    {
      isError: createAvatarIsError,
      isSuccess: createAvatarIsSuccess,
      isLoading: createAvatarIsLoading,
    },
  ] = useUpdateCustomerAvatarMutation();
  const [
    deleteAvatar,
    {
      isError: deleteAvatarIsError,
      isSuccess: deleteAvatarIsSuccess,
      isLoading: deleteAvatarIsLoading,
    },
  ] = useDeleteCustomerAvatarMutation();
  const {
    data: getAvatarData,
    error: getAvatarError,
    isLoading: getAvatarIsLoading,
  } = useGetCustomerAvatarQuery();
  const buttonIsLoading = createAvatarIsLoading || deleteAvatarIsLoading;

  function selectImage(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = event.target.files as FileList;
    setAvatarFile(selectedFiles?.[0]);
  }
  async function uploadImage() {
    if (!avatarFile) return;
    const formData = new FormData();
    formData.append("avatar_file", avatarFile);
    await createAvatar(formData)
      .unwrap()
      .then(() => {
        alert("Tải ảnh đại diện thành công");
      })
      .catch((error) => {
        if ((error as CustomBaseQueryError).status === 413) {
          alert("Kích thước ảnh quá lớn, chưa tải được ảnh đại diện");
        } else {
          alert("Đã có lỗi xảy ra, chưa tải được ảnh đại diện");
        }
      });
  }
  async function deleteImage() {
    await deleteAvatar()
      .unwrap()
      .then(() => {
        alert("Xoá ảnh đại diện thành công");
      })
      .catch(() => {
        alert("Đã có lỗi xảy ra, chưa xoá được ảnh đại diện");
      });
  }

  const mainContent = (
    <div className="p-4 bg-white rounded-lg">
      <div className="flex">
        <div>
          {getAvatarError || getAvatarIsLoading ? null : getAvatarData ? (
            getAvatarData.data.avatar ? (
              <div className="w-[105px] h-[105px] rounded-full overflow-hidden mb-3">
                <img
                  src={getFullPathImage(getAvatarData.data.avatar)}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null
          ) : null}
          <input
            onChange={selectImage}
            type="file"
            name="avatar"
            accept="image/*"
            className="flex-1 text-sm"
          />
        </div>
        <div className="flex-1">
          <button
            disabled={buttonIsLoading}
            onClick={uploadImage}
            className={`block rounded-lg h-[40px] w-[200px] text-sm text-white bg-blue-700 hover:bg-blue-500 mb-3 ${
              buttonIsLoading ? "bg-blue-500" : "bg-blue-700 hover:bg-blue-500"
            }`}
          >
            {buttonIsLoading ? (
              <AiOutlineLoading className="animate-spin" size={25} />
            ) : (
              <span>Tải lên</span>
            )}
          </button>
          {getAvatarError || getAvatarIsLoading ? null : getAvatarData ? (
            getAvatarData.data.avatar ? (
              <button
                disabled={buttonIsLoading}
                onClick={deleteImage}
                className="rounded-lg h-[40px] w-[200px] text-sm bg-transparent text-[#FA5B46] border border-[#FA5B46]"
              >
                {buttonIsLoading ? (
                  <AiOutlineLoading className="animate-spin" size={25} />
                ) : (
                  <span>Xoá ảnh</span>
                )}
              </button>
            ) : null
          ) : null}
        </div>
      </div>
      <p className="mt-5 text-xs bg-gray-200 p-3 rounded-lg mt-2">
        Hình đại diện phải ở định dạng GIF, JPEG hoặc PNG, kích thước không quá
        500KB
      </p>
    </div>
  );
  return <CustomerInfosContainer mainContent={mainContent} />;
}
