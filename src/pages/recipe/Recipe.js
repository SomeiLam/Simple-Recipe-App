import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './Recipe.css';
import { useTheme } from '../../hooks/useTheme';
import { projectFirestore } from '../../firebase/config';

const Recipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();
  const { mode } = useTheme();
  const history = useHistory();

  useEffect(() => {
    setIsPending(true);
    projectFirestore.collection('recipes').doc(id).get().then(doc => {
      if (doc.exists) {
        setIsPending(false);
        setRecipe(doc.data());
      } else {
        setIsPending(false);
        setError(`Could not find that recipe`);
      };
    });
  }, [id]);

  return (
    <div className={`recipe ${mode === 'dark' ? 'dark' : ''}`}>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipe && (
        <>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
          </ul>
          <p className='method'>{recipe.method}</p>
          <button
            onClick={() => history.push({
              pathname: '/update',
              state: { recipe: recipe, id: id },
            })}>Update me</button>
        </>
      )}
    </div>
  )
}

export default Recipe
