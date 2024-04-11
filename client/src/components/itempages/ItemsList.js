import ItemDescription from "./ItemDescription";

const ItemsList = ({items, selectedCategory = "all", handleContent}) => {
    let list = [];
    if (selectedCategory !== "all")
        list = items.filter((item) => item.categoryId === selectedCategory);
    else
        list = items;

    return (
        <main className="itemsContainer">
            {list.length ? (
                <ItemDescription items={list} handleContent={handleContent}/>
            ) : (
                <h3>
                    No items to display.
                </h3>
            )}
        </main>
    );
}

export default ItemsList;