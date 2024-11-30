import React from 'react'

function CheckboxIng({toggleCheck,selectedIngrid}) {
  return (
    <div>{selectedIngrid.map(({ id, ingredients, check }) => (
        <p style={{ display: "flex", width: "30%", margin: "auto" }} key={id}>
          <input
            checked={check}
            onChange={(e) => toggleCheck(id, e.target.checked)}
            type="checkbox"
          />
          {`${ingredients}`}
        </p>
      ))}
     </div>
  )
}

export default CheckboxIng