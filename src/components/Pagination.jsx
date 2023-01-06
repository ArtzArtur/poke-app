function Pagination({ data, setUrl, page, setPage }) {
  const nextPage = (url) => {
    setPage((curr) => curr + 1);
    setUrl(url);
  };

  const prevPage = (url) => {
    setPage((curr) => curr - 1);
    setUrl(url);
  };

  return (
    <div className="col-span-full">
      {data ? (
        <div>
          <div>
            <p>
              Page {page} of {Math.ceil(data.count / 20)}
            </p>
          </div>
          {data.previous ? (
            <button
              className="border-2 border-slate-500 py-1 px-2 rounded-md mx-1 hover:bg-black hover:text-white"
              onClick={() => prevPage(data.previous)}
            >
              Prev
            </button>
          ) : null}
          {data.next ? (
            <button
              className="border-2 border-slate-500 py-1 px-2 rounded-md hover:bg-black hover:text-white"
              onClick={() => nextPage(data.next)}
            >
              Next
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default Pagination;
