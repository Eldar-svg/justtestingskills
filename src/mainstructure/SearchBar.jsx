import React from 'react'

function SearchBar({openSearch,inputToggle,handlerinput,search}) {
    
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