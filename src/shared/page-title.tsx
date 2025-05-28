import { useEffect } from "react";

export default function PageTitle({ title } : { title : string }) {
  useEffect(() => {
    document.title = title;
  }, [title]); // Зависимость от title, чтобы заголовок обновлялся при изменении props

  return null; // Этот компонент ничего не рендерит визуально
}