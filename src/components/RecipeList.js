import { Link } from 'react-router-dom';
import './RecipeList.css';
import TrashCan from '../assets/trashcan.svg';
import { useTheme } from '../hooks/useTheme';
import { projectFirestore } from '../firebase/config';

const RecipeList = ({ recipes }) => {
  const { mode } = useTheme();

  if (recipes.length === 0) {
    return <div className='error'>No recipes to load...</div>
  };

  const handleClick = async id => {
    try {
      await projectFirestore.collection('recipes').doc(id).delete();
    } catch (err) {
      console.log(err);
    };
  };

  return (
    <div className='recipe-list'>
      {recipes.map(recipe => (
        <div className={`card ${mode === 'dark' ? 'dark' : ''}`} key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img
            className='delete'
            src={TrashCan}
            onClick={() => handleClick(recipe.id)}
            alt='delete recipe'
          />
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
