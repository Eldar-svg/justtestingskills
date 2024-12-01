import React from "react";
function Pages({handleNextPage,totalPages,pages,currentPage}) {

  return (
    <div>
      {pages.map((pages) => (
        <button onClick={() => console.log(handleNextPage(pages))} key={pages}>
          {pages}
        </button>
      ))}
      {totalPages > 0 ? (
        <p>
          Page {currentPage} of {totalPages}
        </p>
      ) : null}
    </div>
  );
}

export default Pages;
