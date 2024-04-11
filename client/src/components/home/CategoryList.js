const CategoryList = ({categories, selectedCategory, setSelectedCategory}) => {

    const handleChange = changeEvent => {
        setSelectedCategory(changeEvent.target.value);
    };

    return (
        <div className="left-menu-container">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-check">
                    <label>
                        <input
                            type="radio"
                            name="all"
                            value="all"
                            checked={selectedCategory === "all"}
                            onChange={handleChange}
                            className="form-check-input"
                        />
                        All categories
                    </label>
                </div>
                {categories.map((category) => (
                    <div className="form-check" key={category._id}>
                        <label>
                            <input
                                type="radio"
                                name="react-tips"
                                value={category._id}
                                checked={selectedCategory === category._id}
                                onChange={handleChange}
                                className="form-check-input"
                            />
                            {category.name}
                        </label>
                    </div>
                ))}
            </form>
        </div>
    );
}

export default CategoryList;