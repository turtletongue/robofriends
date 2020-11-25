import Card from './Card';

function CardList({ robots }) {
    return (
        <div>
            {
                robots.map(robot => {
                    return (<Card
                            key={robot.id}
                            name={robot.name}
                            email={robot.email}
                            id={robot.id}
                            />);
                })
            }
        </div>
    );
}

export default CardList;