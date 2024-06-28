import instance from "../axiosApi"; // Import your axios instance

const baseUrl = "/users";
const baseUrl2 = "/auth";

// 유저 정보 수정
export async function updateUser(userData) {
  try {
    const response = await instance.put(baseUrl + "/update", userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update user information:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request data:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw new Error("Failed to update user information.");
  }
}
export const snsUserUpdate = async (authStore) => {
  console.log(authStore.userName, "fewegw");
  try {
    // authStore에서 userData를 생성하고 loggedIn 필드를 삭제
    const userData = {
      userId: authStore.userId,
      email: authStore.email,
      userName: authStore.userName,
      nickName: authStore.nickName,
      phone: authStore.phone,
      gender: authStore.gender,
      birthDate: authStore.birthDate,
      profileUrl: authStore.profileUrl,
    };

    console.log(userData);

    const response = await instance.put(
      baseUrl2 + "/update",
      JSON.stringify(userData),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to update user information:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request data:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw new Error("Failed to update user information.");
  }
};

// 유저 삭제
export const deleteUser = async (userId) => {
  try {
    const response = await instance.delete(`${baseUrl}/deleteUser/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 204) {
      // Clear the local storage
      localStorage.clear();
      console.log("유저 정보 삭제와 local storage 비움.");
    }

    return response.data;
  } catch (error) {
    console.error("Failed to delete user:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request data:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw new Error("Failed to delete user.");
  }
};

// 사용자 데이터 가져오기
export const getUserData = async (userId, token) => {
  console.log(token, "토큰");
  try {
    const response = await instance.get("/users/" + userId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw new Error("Failed to fetch user data.");
  }
};
