import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import qs from 'qs'

import { Categories, Sort, PizzaBlock, LoadingBlock, Pagination } from '../components';
// import Categories from '../components/Categories'
// import PizzaBlock from '../components/PizzaBlock'
// import LoadingBlock from '../components/PizzaBlock/LoadingBlock'
// import Pagination from '../components/Pagination'
// import Sort, { list } from '../components/Sort'

import { list } from '../components/Sort'
import { useAppDispatch } from '../redux/store'
import { setFilters } from '../redux/filter/slice'
import { selectFilter } from '../redux/filter/selectors'
import { selectPizza } from '../redux/pizza/selectors'
import type { SearchPizzaParams } from '../redux/pizza/types'
import { fetchPizzas } from '../redux/pizza/asyncActions'
// import { SearchContext } from '../App'

const Home = () => {
  const { categoryId, sortType, currentPage, searchValue } = useSelector(selectFilter)
  const { items, status } = useSelector(selectPizza)
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const isMounted = useRef(false)
  // const { searchValue } = useContext(SearchContext)

  const getPizzas = async () => {
    const sortBy = sortType.sortProperty.replace('-', '')
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&Search=${searchValue}` : ''
    dispatch(fetchPizzas({ sortBy, order, category, search, currentPage: String(currentPage), }),)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortType: sortType.sortProperty,
        currentPage
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sortType.sortProperty, currentPage])

  useEffect(() => {
    getPizzas()
  }, [categoryId, sortType.sortProperty, searchValue, currentPage])

  // Парсим параметры при первом рендере
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = list.find((obj) => obj.sortProperty === params.sortBy);
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category) || 0,
          currentPage: Number(params.currentPage) || 1,
          sortType: sort || list[0],
        }),
      );
    }
    isMounted.current = true;
  }, []);

  const loadingBlock = [...new Array(8)].map((_, index) => <LoadingBlock key={index} />)
  const pizzas = items.map((item: any) => <PizzaBlock key={item.id} {...item} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? loadingBlock
            : pizzas
          }
        </div>
      )}
      <Pagination />
    </div>
  )
}

export default Home

  // try {
  //  const { data } = await axios.get(`https://6885cd35f52d34140f6a963d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
  // } catch (error) {
  //   console.error('Ошибка при загрузке пицц:', error);
  // }
  // finally {
    // setIsLoading(false)
  // }


  // await axios.get(`https://6885cd35f52d34140f6a963d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
  //   .then((res) => {
  //     setItems(res.data)
  //     setIsLoading(false)
  //   })
  //   .catch(error => {
  //     console.error('Ошибка при загрузке пицц:', error);
  //     setIsLoading(false);
  //   });


  // fetch(`https://6885cd35f52d34140f6a963d.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
  //   .then((res: Response) => res.json())
  //   .then((arr: PizzaItem[]) => {
  //     setItems(arr)
  //     setIsLoading(false)
  //   })