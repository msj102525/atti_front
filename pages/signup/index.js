import styles from "../../styles/doctor/selectSignUp.module.css";
import { useRouter } from "next/router";

export default function SignUp() {

  const router = useRouter();

  const handleNormalSignUpClick = () => {
    router.push("/signup/normalSignUp");
  };

  const handleDoctorSignUpClick = () => {
    router.push("/signup/doctorSignUp");
  };

  return (
    <main>
      <div>
        <div className={styles.title}>
          <h3>회원가입 방식을 선택해 주세요!</h3>
        </div>
        <div className={styles.signForm}>
          <div
            className={styles.signUpNormal}
            onClick={handleNormalSignUpClick}
          >
            <p className={styles.text}>일반 회원</p>
          </div>
          <div
            className={styles.signUpDoctor}
            onClick={handleDoctorSignUpClick}
          >
            <p className={styles.text}>의사 회원</p>
          </div>
        </div>
      </div>
    </main>
  );
}
