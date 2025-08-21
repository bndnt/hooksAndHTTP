import { useEffect, useState } from "react";
import axios from "axios";
import css from "./App.module.css";
const ArticlesList = ({ items }) => (
  <ul>
    {items.map(({ objectID, url, title }) => (
      <li key={objectID}>
        <a href={url} target="_blank" rel="noreferrer noopener">
          {title}
        </a>
      </li>
    ))}
  </ul>
);

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // 1. Оголошуємо стан
    async function fetchArticles() {
      const reponse = await axios.get(
        "https://hn.algolia.com/api/v1/search?query=react"
      );
      // console.log(reponse);
      // 2. Записуємо дані в стан
      setArticles(reponse.data.hits);
    }
    fetchArticles();
  }, []);
  return (
    <div>
      <h1>Latest articles</h1>
      {articles.length > 0 && <ArticlesList items={articles} />}
    </div>
  );
}

export default App;
