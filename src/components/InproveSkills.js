import { Link } from "react-router-dom";



export default function ImproveSkills(){
    const list = [
        "Learn new recepies",
        "Experiment with food",
        "Write your own recepies",
        "Get cooking tips",
        "Get ranked"
        
    ]


    return(
        <div className="section improve-skills">
            <div className="col img">
                <img src="/img/gallery/img_10.jpg" alt="" />
          
          </div>
        <div className="col typography">
          <h1 className="title">Improve your culinary skills</h1>
          {list.map((item, index) => (
          <p className="skill-item" key={index}>{item}</p>
        ))}
        <Link to={"/register"}>
          <button className="btn">signup now</button>
          </Link>
        </div>
        
      </div>
    )
}