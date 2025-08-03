import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { PizzaItem } from '../@types/types'

const FullPizza = () => {
  const [pizza, setPizza] = useState<PizzaItem>()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://6885cd35f52d34140f6a963d.mockapi.io/items/' + id)
        setPizza(data)
      } catch (error) {
        console.error('Ошибка при загрузке пицц:', error);
        navigate('/')
      }
    }
    fetchPizza()
  }, [])

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  )
}

export default FullPizza