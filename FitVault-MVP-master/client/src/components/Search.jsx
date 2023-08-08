import react, {useState} from 'react';

const Search = ({handleSearchButtonClick}) => {

  const [searched, setSearched] = useState('')

  return (
    <>
    Search: <input
          value={searched}
          onChange={e => setSearched(e.target.value)}
          placeholder = 'Enter search....'
        />
        <button onClick={() => handleSearchButtonClick(searched)}>
          SEARCH VAULT
        </button>
    </>
  )
}

export default Search;