
import '../CSS/Personalinfo.css'
export default function Personalinfo () {


    return (
        <div className='main'>
            <div className='leftside'>
                <div className='headline'>პირადი ინფო</div>
                <div className='pagenumber'>1/3</div>
                <hr className='firsthr'/>
                <form>
                    <div className='namediv'>
                    <label className='labelfornameandlastname'>სახელი</label>
                    <input className='inputfornameandlastname'></input>
                    <small className='smallname'>მინიმუმ 2 ასო, ქართული ასოები</small>
                    </div>
                    <div className='lastnamediv'>
                    <label className='labelfornameandlastname'>გვარი</label>
                    <input className='inputfornameandlastname'></input>
                    <small className='smallname'>მინიმუმ 2 ასო, ქართული ასოები</small>
                    </div>
                </form>
            </div>
            <div className='rightside'>
                right
            </div>
        </div>

    )
}