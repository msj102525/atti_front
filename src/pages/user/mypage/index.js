import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/pages/common/header';
import styles from '@/styles/user/mypage.module.css'

export default function Mypage() {
  const [name, setName] = useState('userId');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('가입시 입력한 이메일');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('male');
  const [birthDate, setBirthDate] = useState('');

  useEffect(() => {
    // 서버로부터 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await fetch('/user');
        const data = await response.json();
        
        // 서버로부터 받은 데이터를 상태에 저장
        setuserId(data.setuserId)
        setName(data.name);
        setNickname(data.nickname);
        setPassword(data.password);
        setEmail(data.email);
        setPhone(data.phone);
        setGender(data.gender);
        setBirthDate(data.birthDate);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = () => {
    alert('수정 완료!');
  };

  const handleCancel = () => {
    if (confirm('탈퇴 하시겠습니까?')) {
      alert('탈퇴 완료!');
    }
  };

  return (
    <div className={styles.container}>
      <Header/>
      <Head>
        <title>회원 정보 페이지</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>내 정보 수정 (일반 회원)</h1>

        <div className={styles.profilePicture}>
          {/* <img src="/user.png" alt="Profile Picture" className={styles.profileImg} /> */}
          <div className={styles.profileButtons}>
            <button>등록</button>
            <button>수정</button>
            <button>삭제</button>
          </div>
        </div>

        <form className={styles.form}>
          <label>성명</label>
          <input type="text" value={name} readOnly />
          
          <label>닉네임</label>
          <input type="text" value={nickname} readOnly />
          
          <label>비밀번호</label>
          <input type="password" value={password} readOnly />
          
          <label>이메일</label>
          <input type="email" value={email} readOnly />
          
          <label>전화번호</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          
          <label>성별</label>
          <div>
            <input type="radio" id="male" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />
            <label htmlFor="male">남</label>
            <input type="radio" id="female" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
            <label htmlFor="female">여</label>
          </div>
          
          <label>생년월일</label>
          <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />

          <div className={styles.buttons}>
            <button type="button" onClick={handleUpdate}>수정</button>
            <button type="button" onClick={handleCancel}>탈퇴</button>
          </div>
        </form>
      </main>
    </div>
  );
}
