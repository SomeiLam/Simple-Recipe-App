import { Link } from 'react-router-dom';
import './RecipeList.css';
import { useTheme } from '../hooks/useTheme';

const RecipeList = ({ recipes }) => {
  const { mode } = useTheme();

  if (recipes.length === 0) {
    return <div className='error'>No recipes to load...</div>
  };

  return (
    <div className='recipe-list'>
      {recipes.map(recipe => (
        <div className={`card ${mode === 'dark' ? 'dark' : ''}`} key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
