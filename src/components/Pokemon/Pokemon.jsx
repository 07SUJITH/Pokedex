import { Link } from "react-router-dom";

const Pokemon = ({name,url,types,id}) => {
    return (
      <Link to={`/pokemon/${id}`}>
        <div className="card  bg-base-100 shadow-xl w-[300px] h-[300px] ease-in-out hover:scale-[1.01] hover:bg-[#6a70bd4a] ">
      
        <figure><img className=" max-h-[70%]" src={url}  alt="pokemon" /></figure>
        <div className="card-body">
          <h2 className="card-title">
            {name}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p></p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{types[0]}</div> 
            {types[1]?<div className="badge badge-outline">{types[1]}</div>:null}
          </div>
        </div>
      
      </div>
      </Link>
    );
}

export default Pokemon;
