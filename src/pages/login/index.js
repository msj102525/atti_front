import { useState } from "react";
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { login } from "@/api/user/user"; 
import KakaoLogin from "@/components/user/kakaoLogin";
import MoveMainLogo from "@/components/common/MoveMainLogo";// authStore import 추가
// import Modal2 from "@/components/common/Modal2"; // 모달 컴포넌트 import 추가

export default function LoginForm() {
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
    });

    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [modalMessage, setModalMessage] = useState('');

    const router = useRouter();
    const handleLoginSuccess = (data) => {
        const token = data.headers["authorization"] || data.headers["Authorization"];
        const pureToken = token ? token.split(" ")[1] : '';
        window.localStorage.setItem("token", pureToken);
        window.localStorage.setItem("refresh", data.data.refreshToken || '');
        window.localStorage.setItem("userId", data.data.userId || '');
        window.localStorage.setItem("userName", data.data.userName || "");
        window.localStorage.setItem("nickName", data.data.nickName || "");
        window.localStorage.setItem("profileUrl", data.data.profileUrl || '');
        window.localStorage.setItem("userType", data.data.userType || 'U');
        window.localStorage.setItem("gender", data.data.gender || '');

        authStore.setLoggedIn(true);
        authStore.setUserId(data.data.userId || '');
        authStore.setUserName(data.data.userName || "");
        authStore.setNickName(data.data.nickName || "");
        authStore.setProfileUrl(data.data.profileUrl || '');
        authStore.setUserType(data.data.userType || 'U');
        authStore.setGender(data.data.gender || '');
    };

    const loginMutation = useMutation(loginData => login(loginData), {
        onSuccess: (data) => {
            handleLoginSuccess(data); // 로그인 성공 시 상태 설정
            router.push('/');
        },
        onError: (error) => {
            setModalMessage('로그인에 실패했습니다. 다시 시도해주세요.');
            setIsModalOpen(true);
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutate(formData);
    };

    // const closeModal = () => {
    //     setIsModalOpen(false);
    // };

    return ( 
        <div className="flex flex-col items-center h-screen p-4 bg-gray-100">
            <MoveMainLogo />
            <div className="mt-10 text-2xl font-bold text-gray-800">
                <h1>로그인</h1>
            </div>
            <div className="flex flex-col w-full max-w-lg p-8 mt-8 overflow-y-auto bg-white rounded-lg shadow-md max-h-[80vh]">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="userId" className="block mb-1 text-sm font-semibold text-gray-800">
                            아이디:
                        </label>
                        <input
                            type="text"
                            id="userId"
                            name="userId"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400"
                            value={formData.userId}
                            onChange={handleInputChange}
                            placeholder="아이디를 입력하세요"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1 text-sm font-semibold text-gray-800">
                            비밀번호:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="비밀번호를 입력하세요"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-teal-400 rounded-full cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed">
                            로그인
                        </button>
                    </div>
                    <div className="mt-4">
                        <KakaoLogin className="transform scale-50" />
                    </div>
                    <div className="mt-4 flex justify-between text-sm text-gray-600">
                        <button type="button" onClick={() => router.push('/password-find')}>비밀번호 찾기</button>
                        <button>
                            <a href="#">아이디 찾기</a>
                        </button>
                    </div>
                </form>
            </div>
            {/* <Modal2 isOpen={isModalOpen} onClose={closeModal} message={modalMessage} /> */}
        </div>
    );
}
