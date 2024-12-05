
import { NavLink } from "react-router-dom";
function EachCoffe({id, title, description, ingredients, image, check, logdata, deleteQuery, toggleCheck}) {
  return (
    <div><ul
    style={{
      listStyle: "none",
      marginTop: "100px",
    }}
  >
    <li
      style={{ gap: "50px", margin: "auto", width: "50%" }}
      key={id}
    >
      <input
        type="checkbox"
        checked={check}
        onChange={(e) => toggleCheck(id, e.target.checked)}
      />
      <NavLink to={`/products/${id}`}>{title}</NavLink>
      <p> {description}</p>
      <p>{ingredients}</p>
      <img
        style={{
          width: "300px",
          height: "300px",
        }}
        src={image}
        alt={title}
        width="300"
      />
      {logdata === "admin" && (
        <button
          style={{ display: "flex" }}
          onClick={() => deleteQuery(id)}
        >
          Delete
        </button>
      )}
    </li>
  </ul></div>
  )
}

export default EachCoffe