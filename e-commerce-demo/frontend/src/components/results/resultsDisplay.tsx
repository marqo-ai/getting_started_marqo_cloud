import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import ProductCard from "../product/productCard";
import { API_BASE_URL } from "../../constants";
import "./resultsDisplay.css";

interface searchResult {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

const usePromiseTracker = (
  promiseCreator: () => Promise<any>,
  deps: React.DependencyList,
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    promiseCreator()
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, deps);

  return { promiseInProgress: isLoading, error };
};

const ResultsDisplay = ({
  query,
  moreOf,
  lessOf,
}: {
  query: string;
  moreOf: string;
  lessOf: string;
}) => {
  const [searchResults, setSearchResults] = useState<searchResult[]>([]);

  const { promiseInProgress, error } = usePromiseTracker(() => {
    if (!query.trim()) {
      return Promise.resolve(); // If the query is empty, immediately resolve the promise
    }

    return fetch(API_BASE_URL + "/search_marqo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        query: query,
        moreOf: moreOf,
        lessOf: lessOf,
        limit: 50,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        setSearchResults(res["results"]);
      });
  }, [query, moreOf, lessOf]);

  return (
    <div className={`result-display ${promiseInProgress ? "loading" : ""}`}>
      {promiseInProgress ? (
        <ThreeDots color="#00ffaa" height="100" width="100" />
      ) : error ? (
        <div className="error">Error: {error.message}</div>
      ) : (
        searchResults.map((result: searchResult) => (
          <ProductCard key={result.id} product={result} />
        ))
      )}
    </div>
  );
};

export default ResultsDisplay;
