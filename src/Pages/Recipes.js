import { Link } from "react-router-dom";
import PreviousSearches from "../components/PreviousSearches";
import RecipeCard from "../components/RecipeCard";
import { useState, useEffect } from "react";

export default function Recipes() {
    const defaultRecipes = [
        {
            title: "Chicken Pan Pizza",
            image: "/img/gallery/img_1.jpg",
            authorImg: "/img/top-chiefs/img_1.jpg",
            description: "Delicious pizza with chicken and toppings."
        },
        {
            title: "Spaghetti and Meatballs",
            image: "/img/gallery/img_4.jpg",
            authorImg: "/img/top-chiefs/img_2.jpg",
            description: "Classic spaghetti with homemade meatballs."
        },
        {
            title: "American Cheese Burger",
            image: "/img/gallery/img_5.jpg",
            authorImg: "/img/top-chiefs/img_3.jpg",
            description: "Juicy burger with cheese and toppings."
        },
        // ... other default recipes
    ];

    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for the search term
    const [isEditing, setIsEditing] = useState(null); // Track which recipe is being edited
    const [editFormData, setEditFormData] = useState({ title: "", image: "", authorImg: "", description: "" });

    useEffect(() => {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || defaultRecipes;
        setRecipes(storedRecipes.sort(() => Math.random() - 0.5));
    }, []);

    const handleDelete = (index) => {
        const updatedRecipes = recipes.filter((_, i) => i !== index);
        setRecipes(updatedRecipes);
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    };

    const handleEdit = (index) => {
        setIsEditing(index);
        setEditFormData(recipes[index]);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedRecipes = [...recipes];
        updatedRecipes[isEditing] = editFormData;
        setRecipes(updatedRecipes);
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
        setIsEditing(null); // Exit edit mode
    };

    const handleEditImageChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === "image") {
                    setEditFormData({ ...editFormData, image: reader.result });
                } else if (type === "authorImg") {
                    setEditFormData({ ...editFormData, authorImg: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Filtered recipes based on the search term
    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <PreviousSearches />
            <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ margin: "20px", padding: "10px", width: "300px" }}
            />
            <div className="recipes-container">
                {filteredRecipes.map((recipe, index) => (
                    <div key={index} className="recipe-card-wrapper">
                        <RecipeCard recipe={recipe} />
                        <button onClick={() => handleEdit(index)}>Edit</button>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                ))}
            </div>

            {isEditing !== null && (
                <div className="edit-form">
                    <h3>Edit Recipe</h3>
                    <form onSubmit={handleEditSubmit}>
                        <label>
                            Title:
                            <input
                                type="text"
                                value={editFormData.title}
                                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                            />
                        </label>
                        <label>
                            Image Upload:
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleEditImageChange(e, "image")}
                            />
                            {editFormData.image && <img src={editFormData.image} alt="Recipe" style={{ width: '100px', height: '100px' }} />}
                        </label>
                        <label>
                            Author Image Upload:
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleEditImageChange(e, "authorImg")}
                            />
                            {editFormData.authorImg && <img src={editFormData.authorImg} alt="Author" style={{ width: '100px', height: '100px' }} />}
                        </label>
                        <label>
                            Description:
                            <textarea
                                value={editFormData.description}
                                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                            ></textarea>
                        </label>
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setIsEditing(null)}>Cancel</button>
                    </form>
                </div>
            )}

            <Link to={"/addrecipes"}>
                <button className="add-btn">Add your own</button>
            </Link>
        </div>
    );
}
