import { useLocation } from 'react-router-dom';
import RecipeList from '../../components/RecipeList';
import './Search.css';
import { useTheme } from '../../hooks/useTheme';
import { useEffect, useState } from 'react';
import { projectFirestore } from '../../firebase/config';

const Search = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q');
  const { mode } = useTheme();

  useEffect(() => {
    setIsPending(true);
    setData(null);
    const collectionRef = projectFirestore.collection('recipes');
    collectionRef.get().then(docs => {
      let docArray = [];
      docs.forEach(doc => {
        if (doc.data().title.toLowerCase().includes(query.toLowerCase())) {
          docArray.push({ id: doc.id, ...doc.data() });
        };
      });
      setIsPending(false);
      setData(docArray);
    }).catch(err => setError(err.message));
  }, [query])

  return (
    <div className={mode === 'dark' ? 'dark' : ''}>
      <h2 className='page-title'>Recipes including "{query}"</h2>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}

export default Search
