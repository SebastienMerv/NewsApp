import { useState, useEffect } from 'react';

function App() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchArticles() {
        try {
            const response = await fetch('https://newsapi.org/v2/top-headlines?country=be&apiKey=fb2e5adf413a45ccb1594a0de0bd1fb1');
            if (!response.ok) {
                throw new Error('Failed to fetch articles');
            }
            const data = await response.json();
            setArticles(data.articles);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchArticles();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <header className="bg-blue-600 text-white py-4">
                <div className="container mx-auto flex justify-center">
                    <img src="/img.png" alt="Logo" className="w-1/2 h-auto"/>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {isLoading ? (
                    <div className="text-center">
                        <p className="text-lg">Loading...</p>
                    </div>
                ) : error ? (
                    <div className="text-center">
                        <p className="text-red-500 text-lg">{error}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {articles.length > 0 ? (
                            articles.map(article => (
                                <a href={article.url} key={article.title} target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg shadow-md p-6 block hover:bg-gray-200">
                                    <h2 className="font-bold text-xl mb-2">{article.title}</h2>
                                    <p className="text-gray-700 text-base">{article.description}</p>
                                </a>
                            ))
                        ) : (
                            <p className="text-center w-full">No articles found.</p>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
