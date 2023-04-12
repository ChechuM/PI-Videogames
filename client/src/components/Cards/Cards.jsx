import Card from '../Card/Card';
import './Cards.css'

export default function Cards(props) {
    const { videogames } = props;
    console.log('así llega props a Cards:', props)

    return (
        <div className='divCards' key={props.id}>
            {
                videogames.map(g => {
                    return <Card
                        id={g.id}
                        name={g.name}
                        image={g.image}
                        genres={g.genres}
                    />
                })
            }
        </div>
    )
}