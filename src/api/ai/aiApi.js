import axios from "@/api/axiosApiForFlask";

export const transcribe = (formData) => {
  console.log("aiApi!!!!!!!!!!!!!!!!!!!!!!!" + formData);

  return axios.post("/transcribe", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const cosultToPhilosopher = (philosopher, concern) => {
  if (concern.trim().length === 0) {
    concern = "텅 빈 내마음....";
  }
  const encodedConcern = encodeURIComponent(concern);
  const encodedPhilosopher = encodeURIComponent(philosopher);
  return axios.get(`/philosophy/${encodedPhilosopher}/${encodedConcern}`);
};

export const sentimentAnalysis = async(content) => {
  console.log(content);
  return await axios.post(`/sentiment`, {content});

}