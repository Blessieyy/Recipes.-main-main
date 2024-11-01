import CustomImage from "./CustomImage"


export default function RecipeCard({ recipe }) {
    const getLimitedDescription = (description) => {
        const words = description.split(" ");
        return words.length > 10 ? words.slice(0, 10).join(" ") + "..." : description;
    };
    return (
        <div className="recipe-card">
            <CustomImage imgSrc={recipe.image} pt="65%" />
            <div className="recipe-card-info">
                <img className="author-img" src={recipe.authorImg} alt="" />
                <p className="recipe-title">{recipe.title}</p>
                <p className="recipe-desc">{getLimitedDescription(recipe.description)}</p>
            </div>
        </div>

    )
}