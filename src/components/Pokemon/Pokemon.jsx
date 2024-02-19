
const Pokemon = ({name,url}) => {
    return (
        <div className="w-[300px] h-[300px] flex flex-col  bg-slate-400 gap-5 border-3 rounded p-2 m-2 " >
            <div className="text-center p-2 " ><h3 className="  text-blue-900 bg-slate-200 inline rounded">{name}</h3></div>       
            <img className=" max-h-[70%] " src={url} alt="" />
        </div>
    );
}

export default Pokemon;
