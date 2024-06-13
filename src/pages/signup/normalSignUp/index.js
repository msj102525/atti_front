import { useState } from 'react';
import styles from '../../../styles/signUp/doctorSignUp.module.css';
import { signup } from '@/api/user/user.js';
import KakaoSignup from "@/components/user/kakaoSignup";

export default function NormalSignUp() {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    userName: '',
    email: '',
    birthDate: '',
    gender: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [genderErrorMessage, setGenderErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userId, userName, email, password, confirmPassword, birthDate, gender } = formData;

    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!gender) {
      setGenderErrorMessage('성별을 선택해주세요.');
      return;
    } else {
      setGenderErrorMessage('');
    }

    const signUpData = {
      userId,
      password,
      userName,
      email,
      birthDate,
      gender,
    };

    try {
      await signup(signUpData);
      // await axios.post('/signup', signUpData);
      setSuccessMessage('회원가입이 성공적으로 완료되었습니다. 로그인 페이지로 이동해주세요.');
      setFormData({
        userId: '',
        password: '',
        confirmPassword: '',
        userName: '',
        email: '',
        birthDate: '',
        gender: '',
      });
      setErrorMessage('');
      setGenderErrorMessage('');
      window.location.href = '/login';
    } catch (error) {
      setErrorMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.titleWrap}>
        <h1>회원가입</h1>
      </div>
      <div className={styles.contentWrap}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userId" className={styles.inputTitle}>아이디:</label>
            <div className={styles.inputWrap}>
              <input
                type="text"
                id="userId"
                name="userId"
                className={styles.input}
                value={formData.userId}
                onChange={handleInputChange}
                placeholder="아이디를 입력하세요"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className={styles.inputTitle}>비밀번호:</label>
            <div className={styles.inputWrap}>
              <input
                type="password"
                id="password"
                name="password"
                className={styles.input}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="비밀번호를 입력하세요"
              />
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className={styles.inputTitle}>비밀번호 확인:</label>
            <div className={styles.inputWrap}>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={styles.input}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="비밀번호를 다시 입력하세요"
              />
            </div>
          </div>
          <div>
            <label htmlFor="userName" className={styles.inputTitle}>이름:</label>
            <div className={styles.inputWrap}>
              <input
                type="text"
                id="userName"
                name="userName"
                className={styles.input}
                value={formData.userName}
                onChange={handleInputChange}
                placeholder="이름을 입력하세요"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className={styles.inputTitle}>이메일:</label>
            <div className={styles.inputWrap}>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.input}
                value={formData.email}
                onChange={handleInputChange}
                placeholder="이메일을 입력하세요"
              />
            </div>
          </div>
          <div>
            <label className={styles.inputTitle}>성별:</label>
            <div className={styles.inputWrap}>
              <label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="M"
                  className={styles.radio}
                  checked={formData.gender === 'M'}
                  onChange={handleInputChange}
                />
                남성
              </label>
              <label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="F"
                  className={styles.radio}
                  checked={formData.gender === 'F'}
                  onChange={handleInputChange}
                />
                여성
              </label>
            </div>
            {genderErrorMessage && <p className={styles.errorMessageWrap}>{genderErrorMessage}</p>}
          </div>
          <div>
            <label htmlFor="birthDate" className={styles.inputTitle}>생년월일:</label>
            <div className={styles.inputWrap}>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                className={styles.input}
                value={formData.birthDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.buttonDiv}>
            <button type="submit" className={styles.bottomButton}>회원가입</button>
          </div>
          <KakaoSignup/>
        </form>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p className={styles.errorMessageWrap}>{errorMessage}</p>}
      </div>
    </div>
  );
}
