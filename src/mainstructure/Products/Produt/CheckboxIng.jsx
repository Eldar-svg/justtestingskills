// import React from "react";
// // import usePaginatedProducts from "../../../hooks/usePages";

// function CheckboxIng({ toggleCheck, selectedIngrid }) {
  
//   return (
//     <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//       {data.goods.map(({ id, ingredients, check }) => (
//         <label
//           key={id}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             padding: "5px",
//             border: "1px solid #ccc",
//             borderRadius: "5px",
//             cursor: "pointer",
//             minWidth: "120px",
//           }}
//         >
//           <input
//             type="checkbox"
//             checked={check}
//             onChange={(e) => toggleCheck(id, e.target.checked)}
//           />
//           {Array.isArray(ingredients) ? ingredients.join(", ") : ingredients}
//         </label>
//       ))}
//     </div>
//   );
// }

// export default CheckboxIng;
