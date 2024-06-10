import styles from "../../styles/doctor/doctorList.module.css";
import Link from "next/link";
import Navigation from "@/components/common/Navigation";
let doctorList = [
  {
    id: 1,
    name: "허준",
    comment: "이 시대가 낳은 진정한 명의 허준입니다.",
    profileUrl: "/doctor.png",
    address: "평양 직영점",
  },
  {
    id: 2,
    name: "이국종",
    comment: "삶은 평범함과 거리가 멀었다.",
    profileUrl: "/doctor.png",
    address: "아주대병원 정신상담과",
  },
  {
    id: 3,
    name: "김사부",
    comment:
      "난 믿고있어. 아직은 의사 사장님보다 의사 선생님이 되고싶은 애들이 많다고",
    profileUrl: "/doctor.png",
    address: "잠실 직영점",
  },
];
export default function DoctorList() {
  return (
    <div className={styles.mainContainer}>
      <Navigation />
      <div className={styles.container}>
        <div className={styles.searchbar}></div>
        <div className={styles.docorCardView}>
          {doctorList.map((doctor) => (
            <DoctorCard
              id={doctor.id}
              name={doctor.name}
              comment={doctor.comment}
              profileUrl={doctor.profileUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DoctorCard(props) {
  return (
    <div className={styles.doctorCard}>
      <div className={styles.doctorInfo}>
        <div className={styles.doctorName}>{props.name}</div>
        <div className={styles.doctorComment}>{props.comment}</div>
        <div className={styles.doctorAddress}>{props.address}</div>
        <Link href={`/doctor/${props.id}`} className={styles.moveDetail}>
          <h3>전문가 프로필 보기 &gt; </h3>
        </Link>
      </div>
      <div className={styles.imageBox}>
        <img className={styles.profileImage} src={props.profileUrl} />
      </div>
    </div>
  );
}
