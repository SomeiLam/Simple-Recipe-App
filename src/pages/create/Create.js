import { useState, useRef, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './Create.css';
import { projectFirestore } from '../../firebase/config';

const Create = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);
  const ingredientsInput = useRef(null);
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = async e => {
    e.preventDefault();
    const doc = { title, ingredients, method, cookingTime: cookingTime + ' minutes' };
    try {
      if (isUpdate) {
        await projectFirestore.collection('recipes').doc(location.state.id)
          .update({ ...doc })
      } else {
        await projectFirestore.collection('recipes').add(doc)
      };
      history.push('/')
    } catch (err) {
      setError(err);
    };
  };

  const handleAdd = e => {
    e.preventDefault();
    const ing = newIngredient.trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, ing]);
    };
    setNewIngredient('');
    ingredientsInput.current.focus();
  };

  useEffect(() => {
    if (location.pathname === '/update') {
      const { title, method, ingredients, cookingTime } = location.state.recipe;
      setIsUpdate(true);
      setTitle(title);
      setMethod(method);
      setIngredients(ingredients);
      const cookingTimeInt = cookingTime.split(' ')[0];
      setCookingTime(parseInt(cookingTimeInt));
    };
  }, [location.pathname, location.state.recipe]);

  return (
    <div className='create'>
      <h2 className='page-title'>{isUpdate ? 'Update the Recipe' : 'Add a New Recipe'}</h2>
      {error && <p className='error'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type='text'
            onChange={e => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          <span>Recipe ingredients:</span>
          <div className='ingredients'>
            <input
              type='text'
              onChange={e => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientsInput}
            />
            <button
              className='btn'
              onClick={handleAdd}
            >add</button>
          </div>
        </label>
        <p>Current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>
        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={e => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking time (minutes):</span>
          <input
            type='number'
            onChange={e => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className='btn'>submit</button>
      </form>
    </div>
  )
}

export default Create
