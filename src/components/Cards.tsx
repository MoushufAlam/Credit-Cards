import gradients from './gradients.json'
import { useNavigate } from 'react-router-dom'

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

type Props = {
  data: CardType[]
}

function Cards({ data } :Props) {
  const navigate = useNavigate();
  return (
    <>
      {data.map((card :CardType, index:number) => (
        <div key={card.id} className="card border-0 rounded mt-5 p-5" style={{
          background: gradients[index % gradients.length],
          zIndex: 0
        }}>
          <div className="row justify-content align-items-center">
            <div className="col-12 col-md-8 order-2 order-md-1">
              <h2 className="fs-1 fw-semibold lh-base">{card.title}</h2>
              <div className="d-flex flex-nowrap overflow-auto gap-3 mt-3">
                {card.features.map((feat:Feature, i:number) => (
                  <div key={i} className="d-flex flex-column align-items-center text-center gap-2">
                    <img src={feat.icon} alt={feat.text} className="img-fluid" style={{ maxWidth: '24px' }} />
                    <p className="mb-0 text-muted small">{feat.text}</p>
                  </div>
                ))}
              </div>

              <div className="d-flex gap-3 mt-4">
                <button className="btn btn-danger" onClick={()=> {
                  navigate('/signup ', { state: { activeName: card.images } })
                  }}>Apply Now</button>
                <button className="btn btn-outline-secondary">Add To Compare</button>
              </div>
            </div>
            <div className="col-12 col-md-4 order-1 order-md-2 text-center mb-3 mb-md-0">
              <img
                src={card.images}
                alt={card.title}
                className="img-fluid"
                style={{ maxHeight: '132px' }}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Cards
