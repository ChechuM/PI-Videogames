import Card from '../Card/Card';
import './Cards.css'

export default function Cards(props) {
    const { videogames } = props;
    const { currentPg } = props;
    const { ITEMS_PER_PAGE } = props;

    let min = currentPg * ITEMS_PER_PAGE
    let max = min + ITEMS_PER_PAGE

    return (
        <div className='divCards' key={videogames.id}>
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