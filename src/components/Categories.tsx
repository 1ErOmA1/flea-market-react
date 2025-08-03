import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../redux/filter/slice'
import { selectFilterCategoryId } from '../redux/filter/selectors'

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые',]

export const Categories = () => {
  const categoryId = useSelector(selectFilterCategoryId)
  const dispatch = useDispatch()

  return (
    <div className="categories">
      <ul>
        {categories.map((name, i) =>
          <li
            key={i}
            onClick={() => dispatch(setCategoryId(i))}
            className={categoryId === i ? "active" : ""}>
            {name}
          </li>
        )}
      </ul>
    </div >
  )
}

// export default Categories