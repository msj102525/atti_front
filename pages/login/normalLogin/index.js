import { useState } from "react";
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { login } from "@/pages/api/user";
// import styles from "@/styles/login/normalLogin.module.css";
// import styles from "@/styles/login/normalLogin.module.css";

export default function NormalLogin() {
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
    });

    const router = useRouter();

    const loginMutation = useMutation(loginData => login(loginData), {
        onSuccess: (data) => {
            // 로그인 성공 후의 동작을 정의합니다.
            router.push('/');
        },
        onError: (error) => {
            handleAxiosError(error);
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

    return (
        <div className="login-box">
            <form className="from" onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="userId">아이디:</label>
                    <input
                        type="text"
                        id="userId"
                        name="userId"
                        value={formData.userId}
                        onChange={handleNormalLogin}
                        required
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="password">비밀번호:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleNormalLogin}
                        required
                    />
                </div>
                <button type="submit">로그인</button>
                <div className="social-login">
                    <button className="kakao-login">카카오 로그인</button>
                    <button className="naver-login">네이버 로그인</button>
                </div>
                <div className="find-info">
                    <a href="#">비밀번호 찾기</a>
                    <a href="#">아이디 찾기</a>
                </div>
            </form>
        </div>
    );
}
