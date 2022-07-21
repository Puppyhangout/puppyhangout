import { observer } from 'mobx-react-lite'
import './contact_page.css'

export const Contact = observer(() => {
    return (
        <div className='setting-root'>
            <div className='setting-container'>
                <p>Contact email: </p>
                <p>
                    <br /> admin@puppyhangout.com
                </p>
            </div>
        </div>
    )
})
