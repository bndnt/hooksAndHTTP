import { useEffect, useState } from "react";
import axios from "axios";
import css from "./App.module.css";
import { ThreeDots } from "react-loader-spinner";
import { fetchArticlesWithTopic } from "../../articles-api.js";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const data = await fetchArticlesWithTopic("react");
        setArticles(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);
  // Індикатор завантаження може бути будь-чим: від простого тексту до векторної іконки або прев'ю цілого компонента. Ось кілька бібліотек, які надають готові компоненти для індикатора завантаження:

  //   React Spinners
  //   React Loader
  //   React Content Loader
  return (
    <div>
      <h1>Latest articles</h1>
      {loading && (
        <div className={css.loading}>
          <span className={css.loadingText}>Loading</span>
          <span>
            <ThreeDots
              visible={true}
              height="70"
              width="70"
              color="#646cffaa"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </span>
        </div>
      )}
      {error && (
        <p>Ooops, something went wrong! Psese try reloading this page.</p>
      )}
      {articles.length > 0 && <ArticlesList items={articles} />}
    </div>
  );
}

export default App;
