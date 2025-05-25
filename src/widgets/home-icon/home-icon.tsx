import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import './HomeIcon.css';

export function HomeIcon() {
  return (
    <div className="home-icon-button">
      <Link to="/" aria-label="Главная страница" className="home-icon">
        <FaHome  />
      </Link>
    </div>
  );
}