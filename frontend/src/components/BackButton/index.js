import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1);
  }
  return (
    <>
      <button className="btn btn-primary mb-5" onClick={goBack}>Back</button>
    </>
  );
};
export default BackButton;