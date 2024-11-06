
import '../styles/image.css'

export default function Image(props){
    return(
        <div className='image-container'>
            <img className="image" src={props.url} alt='o'/>
        </div>
    )
}