import { observer } from 'mobx-react-lite'
import './about_page.css'

export const About = observer(() => {
    return (
        <div className='setting-root'>
            <div className='setting-container'>
                <p>
                    <br /> There is an increased demand for pet-related services post-COVID. Many
                    dogs have to stay at home a whole day when their owners go out to work. Whereas
                    surprisingly, a lot of students want to host dogs for free. Puppyhangout
                    provides a platform for dog owners and dog sitters to connect.
                </p>
            </div>
        </div>
    )
})
