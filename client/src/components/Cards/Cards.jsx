import Card from '../Card/Card';
import './Cards.css';
import { useSelector } from 'react-redux';

export default function Cards(props) {
    const videogames = useSelector(store => store.videogames)
    const { currentPg } = props;
    const { ITEMS_PER_PAGE } = props;

    let min = currentPg * ITEMS_PER_PAGE
    let max = min + ITEMS_PER_PAGE

    let i = 0
    return (
        <div className='divCards' >
            {
                videogames.map((g, i) => {
                    if (i >= min && i <= max) {
                        return <Card
                            id={g.id}
                            name={g.name}
                            image={g.image}
                            genres={g.genres}
                        />
                    }
                })
            }
        </div>
    )
}