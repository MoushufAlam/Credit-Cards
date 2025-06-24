import { useEffect, useState } from 'react'
import Buttons from './components/Buttons'
import Cards from './components/Cards'

type Feature = {
  icon: string
  text: string
}


type CardType = {
  id: number
  title: string
  features: Feature[]
  category: string[]
  images?: string
}

function App() {
  const [Active, setActive] = useState<string>('All Cards')
  const [allCards, setAllCards] = useState<CardType[]>([])

  useEffect(() => {
    fetch('/cardsData.json')
      .then(res => res.json())
      .then((data: CardType[]) => setAllCards(data))
  }, [])

  const filtered = Active === 'All Cards'
    ? allCards
    : allCards.filter(card => card.category.includes(Active))

  return (
    <div className='container-lg'>
      <div className='d-flex flex-row flex-nowrap overflow-auto fixed-top p-2 bg-white justify-content-start justify-content-md-center gap-2 w-100'
      style={{
        marginTop:'75px'
      }}>
        <Buttons buttonName='All Cards' Active={Active} setActive={setActive} />
        <Buttons buttonName='Online Benefits' Active={Active} setActive={setActive} />
        <Buttons buttonName='Travel Benefits' Active={Active} setActive={setActive} />
        <Buttons buttonName='Premium' Active={Active} setActive={setActive} />
        <Buttons buttonName='Movie Benefits' Active={Active} setActive={setActive} />
        <Buttons buttonName='Fuel' Active={Active} setActive={setActive} />
        <Buttons buttonName='Accelerated Rewards' Active={Active} setActive={setActive} />
      </div>
      <div className='pt-5'style={{
        marginTop:'75px'
      }}>
        <Cards data={filtered} />
      </div>
    </div>
  )
}

export default App
