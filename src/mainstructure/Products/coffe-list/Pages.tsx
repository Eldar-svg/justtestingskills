import usePaginatedProducts from "../../../hooks/usePaginatedProducts";
interface PagesUnit {
  page:number,
  handlerScrollUp: (pageNum:number )=>void
}

function Pages({ page,handlerScrollUp}:PagesUnit):JSX.Element {
  const { data } = usePaginatedProducts(page);
 

  if (!data) return <p>Loading...</p>;

  return (
    <>
      {/* Привязываем ref к элементу, к которому будем прокручивать */}
      <div
        // Добавляем ref к контейнеру
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          maxWidth: "100%",
          backgroundColor: "pink",
          padding: "10px",
        }}
      >
        {/* Генерация кнопок для страниц */}
        {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(
          (pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlerScrollUp(pageNum)} // Используем handlerScrollUp
              style={{
                width: "50px",
                padding: "5px",
                backgroundColor: pageNum === page ? "blue" : "lightblue",
                color: pageNum === page ? "white" : "black",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {pageNum}
            </button>
          )
        )}
        Page {page} of {data.totalPages}
      </div>

      {/* Кнопки "Назад" и "Вперёд" (если раскомментируете) */}
      {/* <button disabled={page === 1} onClick={() => handlerScrollUp(page - 1)}>
        Prev
      </button>
      <span> </span>
      <button
        disabled={page === data.totalPages}
        onClick={() => handlerScrollUp(page + 1)}
      >
        Next
      </button> */}
    </>
  );
}

export default Pages;