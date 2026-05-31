import { useNavigate } from "react-router-dom";
import { BackButtonIcon } from "../../assets/index";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      className="fixed top-4 left-4 z-50 p-2"
      onClick={() => navigate(-1)}
    >
      <BackButtonIcon />
    </button>
  );
}
