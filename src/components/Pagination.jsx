function Pagination({ data, setUrl }) {
  const nextPage = (url) => {
    setUrl(url);  
  };

  const prevPage = (url) => {
    if(!data.next){
    setUrl("https://pokeapi.co/api/v2/pokemon?offset=1240&limit=20")
    }
    else(
    setUrl(url)
    )
  };

  return (
    <div className="col-span-full">
      {data ? (
        <div>
          <div>
            <p>
              Page {data.actualPage} of {Math.ceil(data.count / 20)}
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
