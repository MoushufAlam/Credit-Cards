import { useLocation, useNavigate } from 'react-router-dom'
import data from '../../public/cardsData.json'
import { MdKeyboardArrowLeft } from 'react-icons/md'

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

function Comparison() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { selectedIds } = state as { selectedIds: number[] }

    const selectedCards: CardType[] = data.filter(card => selectedIds.includes(card.id))

    return (
        <div className="container py-5 mt-3">
            <button className="btn text-muted mt-5" onClick={() => navigate('/')}>
                <MdKeyboardArrowLeft /> Back
            </button>

            <div
                className="d-flex overflow-auto gap-4 mt-4 pb-3"
            >
                {selectedCards.map((card) => (
                    <div
                        key={card.id}
                        className="flex-shrink-0"
                        style={{ width: '300px'}}
                    >
                        <div className="card h-100 border shadow-sm">
                            <div className="card-header text-center bg-white border-bottom">
                                <img
                                    src={card.images}
                                    alt={card.title}
                                    className="img-fluid"
                                    style={{ maxHeight: '150px', objectFit: 'contain' }}
                                />
                                <button
                                    className="btn btn-danger mt-2"
                                    onClick={() =>
                                        navigate('/signup', { state: { activeName: card.images } })
                                    }
                                >
                                    Apply Now
                                </button>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title fw-semibold">{card.title}</h5>
                                <ul className="list-group list-group-flush mt-3">
                                    {card.features.map((feature, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item d-flex align-items-center gap-2"
                                        >
                                            <img
                                                src={feature.icon}
                                                alt={feature.text}
                                                style={{ width: '20px', height: '20px' }}
                                            />
                                            <span>{feature.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Comparison
