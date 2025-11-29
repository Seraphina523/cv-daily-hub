from fastapi import FastAPI # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
import arxiv # type: ignore

app = FastAPI()

# 允许跨域，否则前端无法访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Backend is running!"}

@app.get("/api/papers")
def get_papers():
    # 实时抓取5篇最新CV论文
    search = arxiv.Search(
        query = "cat:cs.CV",
        max_results = 5,
        sort_by = arxiv.SortCriterion.SubmittedDate
    )
    results = []
    for result in search.results():
        results.append({
            "title": result.title,
            "summary": result.summary[:200] + "...",
            "pdf_url": result.pdf_url,
            "date": str(result.published).split(" ")[0]
        })
    return results