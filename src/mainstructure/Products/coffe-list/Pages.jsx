import React from "react";

function Pages({ handleNextPage, totalPages, pages, currentPage }) {
  return (
    <>
      {" "}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          maxWidth: "100%",
          backgroundColor: "pink",
        }}
      >
        {pages.map((page) => (
          <div
            style={{
              padding: "10px",
            }}
            key={page}
          >
            <button
              onClick={() => console.log(handleNextPage(page))}
              style={{
                display: "flex",
                flexDirection: "column-reverse",
                width: "50px",
                padding: "5px", // Adds some padding inside the button
                backgroundColor: "lightblue",
                border: "none",
                borderRadius: "5px",
              }}
            >
              <p>{page}</p> {/* Remove default margin */}
            </button>
          </div>
        ))}
      </div>
      <div>
        {totalPages > 0 ? (
          <p>
            Page {currentPage} of {totalPages}
          </p>
        ) : null}
      </div>
    </>
  );
}

export default Pages;
