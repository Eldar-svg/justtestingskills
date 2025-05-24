import usePaginatedProducts from "../../../hooks/usePaginatedProducts";

import { Pagination } from "@mui/material";
export interface PagesUnit {
  page: number;
  handlerScrollUp: (pageNum: number) => void;
}

function Pages({ page, handlerScrollUp }: PagesUnit): JSX.Element {
  const { data } = usePaginatedProducts("goods", page);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    handlerScrollUp(value);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="bg-black text-white p-3 m-3 rounded">
          Hello from Tailwind!
        </div>
        <Pagination
          count={data?.totalPages}
          page={page}
          color="primary"
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
          size="large"
        />
        Page {page} of {data?.totalPages}
      </div>
    </>
  );
}

export default Pages;
