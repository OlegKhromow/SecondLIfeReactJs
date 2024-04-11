const ItemDescription = ({items, handleContent}) => {
    const formatDate=(str)=>{
        const date = new Date(str);
        return date.toLocaleDateString("uk-UA");
    };

    return (
        <>
            {items.map(item => (
                <article key={item._id} className="item" onClick={()=>handleContent(item)}>
                    <h2>{item.name}</h2>
                    <p className="addition_date">{formatDate(item.addition_date)}</p>
                    <p>{(item.description).length <= 25
                        ? item.description
                        : `${(item.description).slice(0, 25)}...`}</p>
                </article>
            ))}
        </>
    )
};

export default ItemDescription;