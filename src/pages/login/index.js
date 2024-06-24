import { useState } from "react";
import MoveMainLogo from "@/components/common/MoveMainLogo";
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { login } from "@/api/user/user"; 
import KakaoLogin from "@/components/user/kakaoLogin";
import NaverLogin from "@/components/user/naverLogin";
import styles from "@/styles/login/normalLogin.module.css";
import Modal from "@/components/common/Modal"; 

export default function LoginForm() {
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const router = useRouter();

    const loginMutation = useMutation(loginData => login(loginData), {
        onSuccess: (data) => {
            router.push('/');
        },
        onError: (error) => {
            setModalMessage(error.response?.data?.message || '로그인에 실패했습니다.');
            setIsModalOpen(true);
        },
    });

    const handleNormalLogin = (e) => {
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

    const handlePasswordFindClick = () => {
        router.push('/user/password'); // 비밀번호 찾기 페이지로 라우팅
    };

    const handleIdFindClick = () => {
        router.push('/user/idFind'); // 아이디 찾기 페이지로 라우팅
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col items-center h-screen p-4 bg-gray-100">
            <MoveMainLogo />
            <div className="mt-10 text-2xl font-bold text-gray-800">
                <h1>로그인</h1>
            </div>
            <div className={`flex flex-col w-full max-w-md p-6 mt-5 overflow-y-auto bg-white rounded-lg shadow-md max-h-[70vh] ${styles.loginForm}`}>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className={styles.formGroup}>
                        <label htmlFor="userId" className={`${styles.label} block mb-1 text-sm font-semibold text-gray-800`}>
                            아이디:
                        </label>
                        <input
                            type="text"
                            id="userId"
                            name="userId"
                            className={`${styles.inputField} px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400`}
                            value={formData.userId}
                            onChange={handleNormalLogin}
                            placeholder="아이디를 입력하세요"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={`${styles.label} block mb-1 text-sm font-semibold text-gray-800`}>
                            비밀번호:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={`${styles.inputField} px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400`}
                            value={formData.password}
                            onChange={handleNormalLogin}
                            placeholder="비밀번호를 입력하세요"
                            required
                        />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 font-bold text-white bg-teal-400 rounded-full cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      로그인
                    </button>
                    <div className={styles.socialLogin}>
                        <KakaoLogin />
                        <NaverLogin />                      
                    </div>
                    <div className={styles.findInfo}>
                        <button
                            type="button"
                            onClick={handlePasswordFindClick}
                            className="px-4 py-2 mt-2 font-bold text-teal-400 bg-transparent border-none cursor-pointer"
                        >
                            비밀번호 찾기
                        </button>
                        <button
                            type="button"
                            onClick={handleIdFindClick}
                            className="px-4 py-2 mt-2 font-bold text-teal-400 bg-transparent border-none cursor-pointer"
                        >
                            아이디 찾기
                        </button>
                    </div>
                </form>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="로그인 실패"
                content1="비밀번호를 확인하세요."
                content={modalMessage}
            />
        </div>
    );
}
