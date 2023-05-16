import { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import './Create.css';

const Create = () => {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const ingredientsInput = useRef(null);
  const history = useHistory();

  const { postData, data, error } = useFetch('http://localhost:3000/recipes', 'POST');

  const handleSubmit = e => {
    e.preventDefault();
    postData({ title, ingredients, method, cookingTime: cookingTime + ' minutes' });
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
    if (data) history.push('/');
  }, [data, history]);

  return (
    <div className='create'>
      <h2 className='page-title'>Add a New Recipe</h2>
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
