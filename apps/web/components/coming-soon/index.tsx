import React from 'react'
import { Card } from '@finranks/design-system/components/card';

const ComingSoon = ({ dictionary }: { dictionary?: any }) => {
    const dic = dictionary?.common;
    
    return (
        <Card className='h-[60vh]! rounded-md flex items-center justify-center'>
            <div className='text-white text-2xl font-bold'>
                {dic?.comingSoon}
            </div>
        </Card>
    )
}

export default ComingSoon
