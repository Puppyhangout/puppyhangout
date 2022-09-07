import { observer } from 'mobx-react-lite'
import { Tab } from '@mui/material'
import { action } from 'mobx'
import { commonTabProps } from '../../helpers/helpers'
import { store } from '../../store'
import './ChatTab.css'

export const ChatTab = observer(() => {
    return (
        <>
            <div className='chatTab'>
                <Tab />
                <div className='notification_circle'>{store.chat.unread_message_count}</div>
            </div>
        </>
    )
})
