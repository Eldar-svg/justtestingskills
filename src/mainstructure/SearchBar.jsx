import React from 'react'

function SearchBar({inputToggle,handlerinput,search,inputState}) {
    const {openSearch}=inputState
  return (
    <div><button onClick={() => inputToggle("openSearch")}>
    {openSearch ? "close" : "Search bar"}
  </button>
  {openSearch ? (
    <input
      value={search}
      onChange={(e) => handlerinput("search", e.target.value)}
      type="text"
      placeholder="enter the searchable text"
    />
  ) : null}</div>
  )
}

export default SearchBar