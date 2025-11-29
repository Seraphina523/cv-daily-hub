'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 这里用 localhost:8000 是因为这是浏览器端发起的请求
    fetch('http://localhost:8000/api/papers')
      .then((res) => res.json())
      .then((data) => {
        setPapers(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-10 font-sans max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">CV Daily Pulse</h1>
      {loading ? (
        <p>Loading Arxiv Papers...</p>
      ) : (
        <div className="space-y-4">
          {papers.map((paper: any, index) => (
            <div key={index} className="border p-4 rounded shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold">{paper.title}</h2>
              <p className="text-gray-500 text-sm my-2">{paper.date}</p>
              <p className="text-gray-700">{paper.summary}</p>
              <a href={paper.pdf_url} target="_blank" className="text-blue-500 underline mt-2 block">Download PDF</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}