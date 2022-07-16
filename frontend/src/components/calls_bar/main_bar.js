import { observer } from 'mobx-react-lite';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React from 'react';
import { active_calls_store } from '../../stores/active_calls_store';

const truncate = (str='', max_length) => {
    if (str.length > max_length) {
        return str.slice(0, 40) + '...'
    }
    return str
}


const CallTab = observer(({i}) => {
    const call = active_calls_store.active_calls[i] || {}
    return <div>
        <Button
            onClick={() => active_calls_store.update_selected_index(i)}
            style={{
                backgroundColor: '#616161',
                borderColor: active_calls_store.selected_call_index === i ? 'white' : 'darkgrey',
                borderRadius: '20px',
                height: '75px',
                width: '200px'
                // margin: '5px',
            }}
            label={truncate(call.address, 40) || `New call`}
        />

        <div style={{
            // member grid
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(40px, 1fr))',
            gridAutoRows: '35px',
            gridGap: '5px',
        }}>

            {call.units?.map(el => el.unit_number).map((unit_number, i) =>
                <button key={i} style={{ background: '#eee', borderRadius: '10px', borderColor: '#eee' }}>{unit_number}</button>
            )}
        </div>
    </div>
})


export const MainBarComponent = observer(() => {
    return <Card style={{
        backgroundColor: 'gray',
        borderRadius: '20px',

    }}>

        <div style={{
            // call grid
            display: 'grid',
            gridGap: '5px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gridAutoRows: 'minmax(50px, auto)'

        }}>
            {active_calls_store.active_calls?.map((call, el_index) => <CallTab key={el_index} i={el_index} />)}
        </div>
        <Button
            onClick={() => active_calls_store.create_blank_call()}
            style={{ borderRadius: '20px', height: '60px', margin: '5px', width: '100px', }}
            label={'Add Call'} />


    </Card>

})