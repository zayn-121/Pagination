import { useEffect } from "react";
import { useState } from "react";

const Pagination = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(1);
  // console.log('maxPageNumberLimit', maxPageNumberLimit);
  // console.log('minPageNumberLimit', minPageNumberLimit);

  const pageLimit = 5

  // function for previous button
  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageLimit);
    }
  };
  // function for next button
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    if(currentPage + 1 > maxPageNumberLimit){
      setMaxPageNumberLimit(maxPageNumberLimit + pageLimit)
      setMinPageNumberLimit(minPageNumberLimit + pageLimit)
    }
  };

  // setting up items to display per page
  const itemsPerPage = 5;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const itemsToDisplay = userData.slice(firstIndex, lastIndex);
  // function for changing current page
  const handleCurrentPage = (id) => {
    setCurrentPage(id);
  };
  let pages = [];
  for (let i = 1; i <= Math.ceil(userData.length / 5); i++) {
    pages.push(i);
    //  console.log(a)
  }
  // fetching the data from api
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUserData(data);
      });
  }, []);
  return (
    <>
      <h1>Pagination</h1>
      {itemsToDisplay && itemsToDisplay.length > 0
        ? itemsToDisplay.map((item, index) => {
            return (
              <h3 key={index}>
                {item.id} {item.title}
              </h3>
            );
          })
        : null}
      <button
        style={{ margin: "5px", width: "35px", height: "25px" }}
        onClick={() => handlePrev()}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pages.map((page) => {
        if (page <= maxPageNumberLimit && page >= minPageNumberLimit) {
          return (
            <button
              className={currentPage===page ? 'active-btn' : 'btn'}
              key={page}
              style={{ margin: "5px", width: "25px", height: "25px" }}
              onClick={() => handleCurrentPage(page)}
            >
              {page}
            </button>
          );
        }
      })}
      <button
        style={{ margin: "5px", width: "35px", height: "25px" }}
        onClick={() => handleNext()}
        disabled={currentPage === pages.length}
      >
        Next
      </button>
    </>
  );
};

export default Pagination;
