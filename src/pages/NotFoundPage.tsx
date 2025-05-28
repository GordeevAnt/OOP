import { Link } from "react-router-dom";
import PageTitle from "../shared/page-title";

export default function NotFoundPage () {
    return (
        <>
            <PageTitle title="Not Found" />
            <h1>Страница не найдена</h1>
            <Link to='/'>Вернуться на главную</Link>
        </>
    )
}