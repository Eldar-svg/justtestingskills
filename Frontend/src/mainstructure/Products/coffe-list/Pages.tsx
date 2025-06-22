import usePaginatedProducts from "../../../../hooks/usePaginatedProducts";

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
      <div className="flex flex-col bg-white items-center justify-center max-w-[500px] mx-auto p-5 rounded-2xl">
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
