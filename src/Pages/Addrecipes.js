import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Addrecipes() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [authorImg, setAuthorImg] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAuthorImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAuthorImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newRecipe = { title, image, authorImg, description };

        // Retrieve current recipes from localStorage
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];

        // Add the new recipe to the stored recipes
        const updatedRecipes = [...storedRecipes, newRecipe];

        // Save the updated recipes back to localStorage
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

        // Redirect to the recipes page after adding
        navigate('/recipes');
    }

    return (
        <div className="add-recipe-form">
            <h2>Add a New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Image Upload:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                    {image && <img src={image} alt="Recipe" style={{ width: '100px', height: '100px' }} />}
                </label>
                <label>
                    Author Image Upload:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAuthorImageChange}
                        required
                    />
                    {authorImg && <img src={authorImg} alt="Author" style={{ width: '100px', height: '100px' }} />}
                </label>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </label>
                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
}
