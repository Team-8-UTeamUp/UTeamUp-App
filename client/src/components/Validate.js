import React from 'react'

function Validate() {
    return (
    <>
        <div class="control">
            <label class="radio">
                <input type="radio" name="answer"/>
                    Open
            </label>
            <label class="radio">
                <input type="radio" name="answer"/>
                    Closed
            </label>
        </div>
    </>
    )
}

export default Validate;